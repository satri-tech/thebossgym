"use client";

import { useState, useEffect, useRef } from "react";
import { Trainer, CreateTrainerInput, UpdateTrainerInput } from "../../types/trainers.types";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Textarea } from "@/core/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { IconPicker } from "./IconPicker";
import { Plus, Trash2, Camera, User } from "lucide-react";
import { cn } from "@/core/lib/utils";
import Image from "next/image";

interface TrainerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trainer?: Trainer | null;
  onSubmit: (data: CreateTrainerInput | UpdateTrainerInput) => Promise<{ success: boolean; error?: string }>;
}

interface SocialMediaInput {
  id?: string;
  title: string;
  link: string;
  icon?: string | null;
}

export function TrainerDialog({ open, onOpenChange, trainer, onSubmit }: TrainerDialogProps) {
  const [formData, setFormData] = useState({
    fullname: "",
    position: "",
    experience: "",
    description: "",
    image: "",
  });
  const [socialMedia, setSocialMedia] = useState<SocialMediaInput[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (trainer) {
      setFormData({
        fullname: trainer.fullname,
        position: trainer.position || "",
        experience: trainer.experience || "",
        description: trainer.description || "",
        image: trainer.image || "",
      });
      // Map trainer social media to ensure type compatibility
      setSocialMedia(
        (trainer.socialMedia || []).map((sm) => ({
          id: sm.id,
          title: sm.title,
          link: sm.link,
          icon: sm.icon,
        }))
      );
    } else {
      setFormData({
        fullname: "",
        position: "",
        experience: "",
        description: "",
        image: "",
      });
      setSocialMedia([]);
    }
    setErrors({});
  }, [trainer, open]);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const response = await fetch("/api/admin/trainers/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setFormData({ ...formData, image: data.data.url });
    } catch (error) {
      setErrors({ image: "Failed to upload image" });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleAddSocialMedia = () => {
    setSocialMedia([...socialMedia, { title: "", link: "", icon: "link" }]);
  };

  const handleRemoveSocialMedia = (index: number) => {
    setSocialMedia(socialMedia.filter((_, i) => i !== index));
  };

  const handleSocialMediaChange = (index: number, field: keyof SocialMediaInput, value: string) => {
    const updated = [...socialMedia];
    updated[index] = { ...updated[index], [field]: value };
    setSocialMedia(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    const submitData: any = {
      ...formData,
      position: formData.position || null,
      experience: formData.experience || null,
      description: formData.description || null,
      image: formData.image || null,
    };

    // Include socialMedia for both create and update operations
    // Remove id field from social media items as backend will generate new ones
    submitData.socialMedia = socialMedia
      .filter(sm => sm.title && sm.link)
      .map(({ id, ...rest }) => rest);

    const result = await onSubmit(submitData);

    setSubmitting(false);

    if (result.success) {
      onOpenChange(false);
    } else if (result.error) {
      setErrors({ general: result.error });
    }
  };

  const imageUrl = formData.image || "/trainers/fallback.jpg";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{trainer ? "Edit Trainer" : "Create New Trainer"}</DialogTitle>
          <DialogDescription>
            {trainer ? "Update the trainer information below." : "Add a new trainer to display on your website."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {errors.general && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
              {errors.general}
            </div>
          )}

          {/* Profile Image */}
          <div className="flex flex-col items-center gap-3">
            <div 
              className="relative cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className={cn(
                "relative w-32 h-32 rounded-full overflow-hidden bg-muted/50 border-4 border-muted shadow-lg",
                "transition-all",
                uploading && "opacity-50 cursor-not-allowed"
              )}>
                {formData.image ? (
                  <Image
                    src={imageUrl}
                    alt="Trainer"
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-16 h-16 text-muted-foreground/40" />
                  </div>
                )}
              </div>
              
              {/* Camera Button */}
              <div className={cn(
                "absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-primary-foreground",
                "flex items-center justify-center shadow-lg transition-transform",
                "group-hover:scale-110",
                uploading && "opacity-50"
              )}>
                <Camera className="w-5 h-5" />
              </div>
              
              {/* Remove Button */}
              {formData.image && !uploading && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData({ ...formData, image: "" });
                  }}
                  className={cn(
                    "absolute -top-1 -right-1 w-7 h-7 rounded-full bg-destructive text-destructive-foreground",
                    "flex items-center justify-center shadow-lg hover:bg-destructive/90 transition-colors"
                  )}
                  title="Remove image"
                >
                  <span className="text-lg leading-none">×</span>
                </button>
              )}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {uploading ? "Uploading..." : "Click the profile picture to update"}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
            {errors.image && (
              <p className="text-sm text-destructive">{errors.image}</p>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name *</Label>
              <Input
                id="fullname"
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                placeholder="e.g., John Doe"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="e.g., Head Trainer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g., 10+ Years"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description about the trainer..."
                rows={3}
              />
            </div>
          </div>

          {/* Social Media Links */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Social Media Links</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddSocialMedia}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Link
              </Button>
            </div>
            {socialMedia.length === 0 ? (
              <div className="text-center py-6 border-2 border-dashed rounded-lg">
                <p className="text-sm text-muted-foreground">No social media links added</p>
              </div>
            ) : (
              <div className="space-y-2">
                {socialMedia.map((sm, index) => (
                  <div key={index} className="flex gap-2 items-start p-3 border rounded-lg bg-muted/30">
                    <div className="flex-1 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Platform name"
                          value={sm.title}
                          onChange={(e) => handleSocialMediaChange(index, "title", e.target.value)}
                        />
                        <IconPicker
                          value={sm.icon}
                          onChange={(icon) => handleSocialMediaChange(index, "icon", icon)}
                        />
                      </div>
                      <Input
                        placeholder="https://..."
                        value={sm.link}
                        onChange={(e) => handleSocialMediaChange(index, "link", e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSocialMedia(index)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
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
            <Button type="submit" className="flex-1" disabled={submitting || uploading}>
              {submitting ? "Saving..." : trainer ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
