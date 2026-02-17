"use client";

import { useState, useRef } from "react";
import { Button } from "@/core/components/ui/button";
import { Camera, User, Trash2 } from "lucide-react";
import { cn } from "@/core/lib/utils";
import Image from "next/image";

interface ImageUploadDialogProps {
  imageUrl?: string;
  fallbackImage?: string;
  onImageSelect: (file: File) => void;
  onImageRemove?: () => void;
  uploading?: boolean;
  error?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: {
    container: "w-24 h-24",
    icon: "w-12 h-12",
    camera: "w-8 h-8",
    cameraIcon: "w-4 h-4",
  },
  md: {
    container: "w-32 h-32",
    icon: "w-16 h-16",
    camera: "w-10 h-10",
    cameraIcon: "w-5 h-5",
  },
  lg: {
    container: "w-40 h-40",
    icon: "w-20 h-20",
    camera: "w-12 h-12",
    cameraIcon: "w-6 h-6",
  },
};

export function ImageUploadDialog({
  imageUrl,
  fallbackImage = "/uploads/default.jpg",
  onImageSelect,
  onImageRemove,
  uploading = false,
  error,
  label = "Click the image to update",
  size = "md",
}: ImageUploadDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const config = sizeConfig[size];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const displayUrl = imageUrl || fallbackImage;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative cursor-pointer group"
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <div
          className={cn(
            "relative rounded-full overflow-hidden bg-muted/50 border-4 border-muted shadow-lg",
            "transition-all",
            config.container,
            uploading && "opacity-50 cursor-not-allowed"
          )}
        >
          {imageUrl ? (
            <Image
              src={`/api/images${displayUrl}`}
              alt="Upload preview"
              fill
              className="object-cover"
              sizes={size === "sm" ? "96px" : size === "md" ? "128px" : "160px"}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className={cn("text-muted-foreground/40", config.icon)} />
            </div>
          )}
        </div>

        {/* Camera Button */}
        <div
          className={cn(
            "absolute bottom-0 right-0 rounded-full bg-primary text-primary-foreground",
            "flex items-center justify-center shadow-lg transition-transform",
            "group-hover:scale-110",
            config.camera,
            uploading && "opacity-50"
          )}
        >
          <Camera className={config.cameraIcon} />
        </div>

        {/* Remove Button */}
        {imageUrl && !uploading && onImageRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onImageRemove();
            }}
            className={cn(
              "absolute top-0 cursor-pointer right-2 w-7 h-7 rounded-full bg-destructive text-destructive-foreground",
              "flex items-center justify-center shadow-lg hover:bg-destructive/90 transition-colors z-10"
            )}
            title="Remove image"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        )}
      </div>

      <p className="text-sm text-muted-foreground text-center">
        {uploading ? "Uploading..." : label}
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
