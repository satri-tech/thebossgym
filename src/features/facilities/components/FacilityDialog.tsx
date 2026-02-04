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
import { Upload, X } from "lucide-react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (facility) {
      const isFallbackImage = facility.image === FACILITIES_FALLBACK_IMAGE_URL;
      setFormData({
        title: facility.title,
        description: facility.description,
        image: facility.image,
      });
      // Don't show fallback image as a preview in edit mode
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [facility, open]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Invalid file type", {
          description: "Please select a valid image file (JPG, PNG, WebP, or GIF)",
        });
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Image size must be less than 5MB",
        });
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);

    // For edit: persist removal by storing a fallback image URL in the DB
    // For create: keep it empty so "image is required" still applies
    if (facility) {
      setFormData((prev) => ({ ...prev, image: FACILITIES_FALLBACK_IMAGE_URL }));
      // Hide fallback image in UI (fallback is not removable; only updatable)
      setImagePreview(null);
    } else {
      setFormData((prev) => ({ ...prev, image: "" }));
      setImagePreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
          <div className="space-y-2">
            <Label>Image</Label>
            <div className="space-y-4">
              {imagePreview && (
                <div className="relative w-full max-w-md">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Facility preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Only allow removal when there's a real preview (not fallback) */}
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
                  {imagePreview ? "Change Image" : "Upload Image"}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <p className="text-xs text-muted-foreground">
                  Max size: 5MB. Formats: JPG, PNG, WebP, GIF
                </p>
              </div>
              {!facility && !imageFile && (
                <p className="text-xs text-destructive">Image is required</p>
              )}
            </div>
          </div>

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

