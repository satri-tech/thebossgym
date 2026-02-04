"use client";

import { useState, useEffect } from "react";
import { Service } from "../types/types";
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
import { Card } from "@/core/components/ui/card";
import { Spinner } from "@/core/components/ui/spinner";
import { ImageUploadField } from "@/core/components/image-upload/ImageUploadField";
import { X, Plus } from "lucide-react";
import { SERVICES_CONFIG } from "../constants/services.constants";

interface ServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
  onSubmit: (data: any, imageFile?: File) => Promise<any>;
}

interface Feature {
  id: string;
  feature: string;
  order: number;
}

export function ServiceDialog({
  open,
  onOpenChange,
  service,
  onSubmit,
}: ServiceDialogProps) {
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formImage, setFormImage] = useState("");
  const [features, setFeatures] = useState<Feature[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      if (service) {
        const isFallbackImage = service.image === SERVICES_CONFIG.FALLBACK_IMAGE;
        setIcon(service.icon);
        setTitle(service.title);
        setDescription(service.description);
        setFormImage(service.image);
        setImagePreview(isFallbackImage ? null : service.image);
        setFeatures(
          service.features.map((f, idx) => ({
            id: f.id || `feature-${idx}`,
            feature: f.feature,
            order: f.order,
          }))
        );
      } else {
        resetForm();
      }
      setErrors({});
    }
  }, [service, open]);

  const resetForm = () => {
    setIcon("");
    setTitle("");
    setDescription("");
    setImageFile(null);
    setImagePreview(null);
    setFormImage("");
    setFeatures([]);
    setNewFeature("");
  };

  const handleImageSelect = (file: File | null) => {
    setImageFile(file);
    if (!file) {
      if (service) {
        setFormImage(SERVICES_CONFIG.FALLBACK_IMAGE);
      } else {
        setFormImage("");
      }
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures((prevFeatures) => [
        ...prevFeatures,
        { 
          id: `feature-${Date.now()}-${Math.random()}`,
          feature: newFeature.trim(), 
          order: prevFeatures.length 
        },
      ]);
      setNewFeature("");
    }
  };

  const removeFeature = (id: string) => {
    setFeatures((prevFeatures) => prevFeatures.filter((f) => f.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate required fields
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!icon.trim()) {
      newErrors.icon = "Icon is required";
    }
    if (!service && !imageFile && !formImage) {
      newErrors.image = "Image is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const data: any = {
        icon,
        title,
        description,
        image: formImage,
        features: features.map(({ feature, order }) => ({ feature, order })),
      };

      // Only include order when editing
      if (service) {
        data.order = service.order;
      }

      const result = await onSubmit(data, imageFile || undefined);

      if (result.success) {
        resetForm();
        onOpenChange(false);
      } else if (result.error) {
        setErrors({ general: result.error });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {service ? "Edit Service" : "Create New Service"}
          </DialogTitle>
          <DialogDescription>
            {service
              ? "Update the service details below."
              : "Add a new service to display on your website."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {errors.general && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
              {errors.general}
            </div>
          )}

          {/* Icon and Title */}
          <div className="grid grid-cols-4 gap-3">
            <div className="space-y-2">
              <Label htmlFor="icon">Icon *</Label>
              <Input
                id="icon"
                placeholder="e.g., 💪"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                maxLength={2}
                className="text-center text-2xl"
              />
              {errors.icon && (
                <p className="text-sm text-destructive">{errors.icon}</p>
              )}
            </div>
            <div className="col-span-3 space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Personal Training"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <textarea
              id="description"
              placeholder="Enter service description..."
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              rows={4}
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <ImageUploadField
              label="Service Image"
              value={formImage}
              onChange={handleImageSelect}
              onPreviewChange={(preview) => {
                if (preview) {
                  setImagePreview(preview);
                }
              }}
              preview={imagePreview}
              fallbackImage={SERVICES_CONFIG.FALLBACK_IMAGE}
              isEditing={!!service}
              required={!service}
              maxSize={SERVICES_CONFIG.MAX_FILE_SIZE}
              acceptedFormats={Object.keys(SERVICES_CONFIG.ALLOWED_TYPES)}
              helpText="Supported formats: JPG, PNG, WebP (Max 5MB)"
              hideFallbackPreview={true}
              error={errors.image}
              showRequiredError={!!errors.image}
            />
          </div>

          {/* Features */}
          <div className="space-y-2">
            <Label>Features</Label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a feature"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addFeature();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                  className="px-3"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {features.length > 0 && (
                <Card className="border-border/60 bg-card/60 p-0 overflow-visible">
                  <div className="bg-muted/30 px-3 py-2 border-b">
                    <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                      Features ({features.length})
                    </p>
                  </div>
                  <div className="divide-y divide-border/40">
                    {features.map((feature) => (
                      <div key={feature.id} className="flex items-center gap-2 p-3 hover:bg-muted/30 transition-colors">
                        <span className="flex-1 text-sm text-foreground">{feature.feature}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFeature(feature.id)}
                          className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading && <Spinner className="h-4 w-4 mr-2" />}
              {service ? "Update Service" : "Create Service"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
