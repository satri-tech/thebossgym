"use client";

import { useState, useCallback, useRef } from "react";
import { X, Upload, Trash2, ImageIcon } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { cn } from "@/core/lib/utils";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  width: number;
  height: number;
}

interface MultiImageUploadProps {
  images: ImageFile[];
  onImagesChange: (images: ImageFile[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
}

export function MultiImageUpload({
  images,
  onImagesChange,
  maxFiles = 20,
  maxFileSize = 5,
  acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"],
  className,
}: MultiImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedForDelete, setSelectedForDelete] = useState<Set<string>>(new Set());
  const [previewImage, setPreviewImage] = useState<ImageFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Failed to load image"));
      };

      img.src = url;
    });
  };

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      return `Invalid file type. Accepted: ${acceptedTypes.join(", ")}`;
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxFileSize) {
      return `File size exceeds ${maxFileSize}MB`;
    }

    return null;
  };

  const processFiles = async (files: FileList | File[]) => {
    setError(null);
    const fileArray = Array.from(files);

    // Check max files limit
    if (images.length + fileArray.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`);
      return;
    }

    const newImages: ImageFile[] = [];

    for (const file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        continue;
      }

      try {
        const dimensions = await getImageDimensions(file);
        const preview = URL.createObjectURL(file);

        newImages.push({
          id: `${Date.now()}-${Math.random()}`,
          file,
          preview,
          width: dimensions.width,
          height: dimensions.height,
        });
      } catch (error) {
        console.error("Error processing image:", error);
        setError("Failed to process some images");
      }
    }

    if (newImages.length > 0) {
      onImagesChange([...images, ...newImages]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await processFiles(files);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        await processFiles(files);
      }
    },
    [images, maxFiles]
  );

  const removeImage = (id: string) => {
    const image = images.find((img) => img.id === id);
    if (image) {
      URL.revokeObjectURL(image.preview);
    }
    onImagesChange(images.filter((img) => img.id !== id));
    setSelectedForDelete((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const toggleSelectForDelete = (id: string) => {
    setSelectedForDelete((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const deleteSelected = () => {
    selectedForDelete.forEach((id) => {
      const image = images.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
    });
    onImagesChange(images.filter((img) => !selectedForDelete.has(img.id)));
    setSelectedForDelete(new Set());
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    onImagesChange([]);
    setSelectedForDelete(new Set());
    setError(null);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all",
          isDragging
            ? "border-primary bg-primary/10 scale-[1.02]"
            : "border-border hover:border-primary/50 bg-card"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-lg font-medium text-foreground">
              Drop images here or click to browse
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports: JPG, PNG, WEBP, GIF (Max {maxFileSize}MB per image)
            </p>
            {images.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                {images.length} / {maxFiles} images uploaded
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-lg flex items-center justify-between">
          <span className="text-sm">{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-destructive hover:text-destructive/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <>
          {/* Actions */}
          <div className="flex items-center justify-between bg-card border border-border rounded-lg p-3">
            <div className="text-sm text-muted-foreground">
              {selectedForDelete.size > 0 && (
                <span className="font-medium text-foreground">
                  {selectedForDelete.size} selected
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {selectedForDelete.size > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={deleteSelected}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected ({selectedForDelete.size})
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={clearAll}>
                Clear All
              </Button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className={cn(
                  "relative group rounded-lg overflow-hidden border-2 transition-all cursor-pointer",
                  selectedForDelete.has(image.id)
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border hover:border-primary/50"
                )}
                onClick={() => setPreviewImage(image)}
              >
                {/* Image */}
                <div className="aspect-square relative bg-muted">
                  <Image
                    src={`/api/images${image.preview}`}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />

                  {/* Delete Button - Top Right */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(image.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-destructive text-white rounded-full hover:bg-destructive/90 transition-colors opacity-0 group-hover:opacity-100 z-10"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Checkbox - Top Left */}
                  <div className="absolute top-2 left-2 z-10">
                    <input
                      type="checkbox"
                      checked={selectedForDelete.has(image.id)}
                      onChange={() => toggleSelectForDelete(image.id)}
                      className="w-5 h-5 rounded cursor-pointer accent-primary"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Preview Dialog */}
      {previewImage && (
        <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
          <DialogContent className="max-w-2xl bg-card flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle className="text-foreground truncate">{previewImage.file.name}</DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-center w-full h-96 bg-muted rounded-lg overflow-hidden">
              <Image
                src={`/api/images${previewImage.preview}`}
                alt="Full preview"
                width={500}
                height={500}
                className="object-contain w-full h-full"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
