"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/core/components/ui/button";
import { Label } from "@/core/components/ui/label";
import { X, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/core/lib/utils";

interface ImageUploadFieldProps {
  label?: string;
  value?: string;
  onChange: (file: File | null) => void;
  onPreviewChange?: (preview: string | null) => void;
  preview?: string | null;
  fallbackImage?: string;
  required?: boolean;
  maxSize?: number; // in bytes
  acceptedFormats?: string[];
  helpText?: string;
  error?: string; // External error message to display
  showRequiredError?: boolean; // Control when to show "required" error
}

export function ImageUploadField({
  label = "Image",
  value,
  onChange,
  onPreviewChange,
  preview,
  fallbackImage,
  required = false,
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedFormats = ["image/jpeg", "image/png", "image/webp", "image/gif"],
  helpText,
  error,
  showRequiredError = false,
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(preview || null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setLocalPreview(preview || null);
  }, [preview]);

  const validateAndProcessFile = (file: File) => {
    // Validate file type
    if (!acceptedFormats.includes(file.type)) {
      toast.error("Invalid file type", {
        description: `Please select a valid image file. Accepted: ${acceptedFormats.map((f) => f.split("/")[1].toUpperCase()).join(", ")}`,
      });
      return false;
    }

    // Validate file size
    if (file.size > maxSize) {
      toast.error("File too large", {
        description: `Image size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`,
      });
      return false;
    }

    // First call onChange with the file
    onChange(file);
    
    // Then create and set the preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setLocalPreview(result);
      onPreviewChange?.(result);
    };
    reader.readAsDataURL(file);
    
    return true;
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleRemoveImage = () => {
    onChange(null);
    setLocalPreview(value || null);
    onPreviewChange?.(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Determine if we should show a preview
  const shouldShowPreview = localPreview && localPreview.length > 0;

  const formatAcceptedTypes = acceptedFormats
    .map((f) => f.split("/")[1].toUpperCase())
    .join(", ");

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      
      <div className="space-y-4">
        {shouldShowPreview ? (
          // Preview Mode
          <div className="relative w-full max-w-2xl">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-border bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={localPreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-lg"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          // Upload Mode with Drag & Drop
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "relative w-full rounded-lg border-2 border-dashed transition-all cursor-pointer",
              "hover:border-primary/50 hover:bg-accent/50",
              "flex flex-col items-center justify-center py-12 px-6",
              isDragging
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-muted-foreground/25"
            )}
          >
            {/* Icon */}
            <div className={cn(
              "mb-4 rounded-full p-4 transition-colors",
              isDragging ? "bg-primary/10" : "bg-primary/5"
            )}>
              <ImageIcon className={cn(
                "h-12 w-12 transition-colors",
                isDragging ? "text-primary" : "text-primary/60"
              )} />
            </div>

            {/* Text */}
            <div className="text-center space-y-2">
              <p className="text-base font-medium">
                Drop your image here, or{" "}
                <span className="text-primary hover:underline">browse</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Supports: {formatAcceptedTypes}
              </p>
              {helpText && (
                <p className="text-xs text-muted-foreground">
                  {helpText}
                </p>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedFormats.join(",")}
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
        )}

        {(error || (showRequiredError && required && !shouldShowPreview)) && (
          <p className="text-sm text-destructive">
            {error || "Image is required"}
          </p>
        )}
      </div>
    </div>
  );
}
