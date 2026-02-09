"use client";

import { useState, useEffect, useRef } from "react";
import { Facility, CreateFacilityInput, UpdateFacilityInput } from "../types/types";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { ImageUploadField } from "@/core/components/image-upload/ImageUploadField";
import { toast } from "sonner";
import { FACILITIES_FALLBACK_IMAGE_URL } from "../constants/facilities.constants";

interface FacilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facility?: Facility | null;
  onSubmit: (data: CreateFacilityInput | UpdateFacilityInput, imageFile?: File) => Promise<{ success: boolean; error?: string }>;
}

export function FacilityDialog({ open, onOpenChange, facility, onSubmit }: FacilityDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (facility) {
      const isFallbackImage = facility.image === FACILITIES_FALLBACK_IMAGE_URL;
      setFormData({
        title: facility.title,
        description: facility.description,
        image: facility.image,
      });
      setImagePreview(isFallbackImage ? null : facility.image);
    } else {
      setFormData({
        title: "",
        description: "",
        image: "",
      });
      setImagePreview(null);
    }
    setImageFile(null);
    setErrors({});
  }, [facility, open]);

  const handleImageSelect = (file: File | null) => {
    setImageFile(file);
    if (!file) {
      // When removing image, clear preview to show upload UI
      setImagePreview(null);
      if (facility) {
        setFormData((prev) => ({ ...prev, image: FACILITIES_FALLBACK_IMAGE_URL }));
      } else {
        setFormData((prev) => ({ ...prev, image: "" }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    const result = await onSubmit(formData, imageFile || undefined);

    setSubmitting(false);

    if (result.success) {
      onOpenChange(false);
    } else if (result.error) {
      setErrors({ general: result.error });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{facility ? "Edit Facility" : "Create New Facility"}</DialogTitle>
          <DialogDescription>
            {facility ? "Update the facility information below." : "Add a new facility to display on your website."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {errors.general && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
              {errors.general}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., State-of-the-Art Equipment"
              required
              maxLength={100}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter facility description..."
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
              rows={5}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          {/* Image Upload */}
          <ImageUploadField
            label="Image"
            value={formData.image}
            onChange={handleImageSelect}
            onPreviewChange={setImagePreview}
            preview={imagePreview}
            required={!facility}
            maxSize={5 * 1024 * 1024}
            acceptedFormats={["image/jpeg", "image/png", "image/webp", "image/gif"]}
            helpText="Max size: 5MB. Formats: JPG, PNG, WebP, GIF"
            error={errors.image}
            showRequiredError={!!errors.image}
          />

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={submitting}>
              {submitting ? "Saving..." : facility ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

