"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/core/components/ui/button";
import { Label } from "@/core/components/ui/label";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadFieldProps {
  label?: string;
  value?: string;
  onChange: (file: File | null) => void;
  onPreviewChange?: (preview: string | null) => void;
  preview?: string | null;
  fallbackImage?: string;
  isEditing?: boolean;
  required?: boolean;
  maxSize?: number; // in bytes
  acceptedFormats?: string[];
  helpText?: string;
  hideFallbackPreview?: boolean; // Hide fallback image in preview
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
  isEditing = false,
  required = false,
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedFormats = ["image/jpeg", "image/png", "image/webp", "image/gif"],
  helpText,
  hideFallbackPreview = false,
  error,
  showRequiredError = false,
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(preview || null);

  useEffect(() => {
    setLocalPreview(preview || null);
  }, [preview]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!acceptedFormats.includes(file.type)) {
        toast.error("Invalid file type", {
          description: `Please select a valid image file. Accepted: ${acceptedFormats.map((f) => f.split("/")[1]).join(", ")}`,
        });
        return;
      }

      // Validate file size
      if (file.size > maxSize) {
        toast.error("File too large", {
          description: `Image size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`,
        });
        return;
      }

      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLocalPreview(result);
        onPreviewChange?.(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onChange(null);
    setLocalPreview(null);
    onPreviewChange?.(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Determine if we should show a preview
  // If hideFallbackPreview is true and the preview is the fallback image, don't show it
  const isFallbackPreview = localPreview === fallbackImage || value === fallbackImage;
  const shouldShowPreview = localPreview && (!hideFallbackPreview || !isFallbackPreview);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-4">
        {shouldShowPreview && (
          <div className="relative w-full max-w-md">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
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
              className="absolute top-2 right-2"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            {shouldShowPreview ? "Change Image" : "Upload Image"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFormats.join(",")}
            onChange={handleImageSelect}
            className="hidden"
          />
          <p className="text-xs text-muted-foreground">
            {helpText || `Max size: ${Math.round(maxSize / (1024 * 1024))}MB`}
          </p>
        </div>

        {(error || (showRequiredError && required && !shouldShowPreview)) && (
          <p className="text-xs text-destructive">
            {error || "Image is required"}
          </p>
        )}
      </div>
    </div>
  );
}
