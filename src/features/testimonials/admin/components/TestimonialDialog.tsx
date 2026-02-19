"use client";

import { useState, useEffect } from "react";
import { Testimonial, CreateTestimonialInput } from "../../types/types";
import { Button } from "@/core/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Textarea } from "@/core/components/ui/textarea";
import { ImageUploadDialog } from "@/core/components/image-upload";
import { uploadTestimonialImage, deleteTestimonialImage } from "../actions/uploadTestimonialImage";
import { Loader2 } from "lucide-react";

interface TestimonialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testimonial?: Testimonial | null;
  onSubmit: (data: CreateTestimonialInput) => Promise<{ success: boolean; error?: string }>;
}

export function TestimonialDialog({
  open,
  onOpenChange,
  testimonial,
  onSubmit,
}: TestimonialDialogProps) {
  const [formData, setFormData] = useState<CreateTestimonialInput>({
    name: "",
    position: "",
    image: null,
    comment: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        position: testimonial.position,
        image: testimonial.image || null,
        comment: testimonial.comment,
      });
      setPreviewUrl(testimonial.image || "/testimonials/fallback.jpg");
    } else {
      setFormData({
        name: "",
        position: "",
        image: null,
        comment: "",
      });
      setPreviewUrl("");
    }
    setErrors({});
  }, [testimonial, open]);

  const handleImageChange = async (file: File) => {
    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const uploadResult = await uploadTestimonialImage(formDataUpload);

      if (!uploadResult.success) {
        setErrors({ image: uploadResult.error || "Failed to upload image" });
        setUploading(false);
        return;
      }

      setFormData({ ...formData, image: uploadResult.url });
      setPreviewUrl(uploadResult.url || "");
      setErrors({ ...errors, image: "" });
    } catch (error) {
      setErrors({ image: "Failed to upload image" });
    } finally {
      setUploading(false);
    }
  };

  const handleImageRemove = async () => {
    if (formData.image && formData.image !== "/testimonials/fallback.jpg") {
      const filename = formData.image.split("/").pop();
      if (filename) {
        await deleteTestimonialImage(filename);
      }
    }
    setFormData({ ...formData, image: null });
    setPreviewUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const result = await onSubmit(formData);

    if (result.success) {
      onOpenChange(false);
    } else {
      setErrors({ submit: result.error || "Failed to save testimonial" });
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {testimonial ? "Edit Testimonial" : "Add Testimonial"}
          </DialogTitle>
          <DialogDescription>
            {testimonial
              ? "Update the testimonial details"
              : "Create a new testimonial"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {errors.submit && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
              {errors.submit}
            </div>
          )}

          {/* Image Upload */}
          <ImageUploadDialog
            imageUrl={previewUrl}
            fallbackImage="/testimonials/fallback.jpg"
            onImageSelect={handleImageChange}
            onImageRemove={handleImageRemove}
            uploading={uploading}
            error={errors.image}
            label="Click to upload testimonial image"
            size="md"
          />

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={loading}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Position */}
            <div className="space-y-2">
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                placeholder="e.g., Fitness Enthusiast"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                disabled={loading}
              />
              {errors.position && (
                <p className="text-xs text-destructive">{errors.position}</p>
              )}
            </div>

            {/* Comment */}
            <div className="space-y-2">
              <Label htmlFor="comment">Comment *</Label>
              <Textarea
                id="comment"
                placeholder="Enter testimonial comment"
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                disabled={loading}
                rows={4}
              />
              {errors.comment && (
                <p className="text-xs text-destructive">{errors.comment}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading || uploading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || uploading} className="flex-1 gold-bg text-black">
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {testimonial ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
