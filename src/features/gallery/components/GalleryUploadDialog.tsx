"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Spinner } from "@/core/components/ui/spinner";
import { MultiImageUpload, ImageFile } from "@/core/components/image-upload";
import { GALLERY_TAGS } from "@/core/constants/gallery";
import { toast } from "sonner";

interface GalleryUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (file: File, alt: string, tags: string[]) => Promise<boolean>;
}

export function GalleryUploadDialog({
  open,
  onOpenChange,
  onUpload,
}: GalleryUploadDialogProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const availableTags = GALLERY_TAGS.filter((tag) => tag !== "All");

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    if (selectedTags.length === 0) {
      toast.error("Please select at least one tag");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const alt = image.file.name.replace(/\.[^/.]+$/, ""); // Remove file extension

      const success = await onUpload(image.file, alt, selectedTags);

      if (success) {
        successCount++;
      } else {
        failCount++;
      }

      setUploadProgress(((i + 1) / images.length) * 100);
    }

    setIsUploading(false);

    if (successCount > 0) {
      toast.success(`Successfully uploaded ${successCount} image(s)`);
    }

    if (failCount > 0) {
      toast.error(`Failed to upload ${failCount} image(s)`);
    }

    // Only close if all uploads succeeded
    if (failCount === 0 && successCount > 0) {
      // Reset form
      setImages([]);
      setSelectedTags([]);
      setUploadProgress(0);
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    if (!isUploading) {
      setImages([]);
      setSelectedTags([]);
      setUploadProgress(0);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Gallery Images</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Multi Image Upload */}
          <div className="space-y-2">
            <Label>Images</Label>
            <MultiImageUpload
              images={images}
              onImagesChange={setImages}
              maxFiles={50}
              maxFileSize={10}
              acceptedTypes={["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags (Select at least one - will apply to all images)</Label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  disabled={isUploading}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2 bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between text-sm text-foreground">
                <span className="font-medium">Uploading images...</span>
                <span className="text-primary font-semibold">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading || images.length === 0}>
              {isUploading ? (
                <>
                  <Spinner className="mr-2" />
                  Uploading...
                </>
              ) : (
                `Upload ${images.length} Image${images.length !== 1 ? "s" : ""}`
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
