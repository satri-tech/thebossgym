"use client";

import { useEffect, useState } from "react";
import { useFounderMessage } from "../hooks/useFounderMessage";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Textarea } from "@/core/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/core/components/ui/card";
import { Skeleton } from "@/core/components/ui/skeleton";
import { Alert, AlertDescription } from "@/core/components/ui/alert";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { ImageUploadDialog } from "@/core/components/image-upload/ImageUploadDialog";
import { uploadFounderImage, deleteFounderImage } from "../actions/uploadFounderImage";

export default function FounderMessageAdmin() {
  const { founderMessage, loading, error, updateFounderMessage } =
    useFounderMessage();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    founderName: "",
    founderPosition: "",
    founderImage: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageError, setImageError] = useState<string>("");
  const [imageRemoved, setImageRemoved] = useState(false);

  useEffect(() => {
    if (founderMessage) {
      setFormData({
        title: founderMessage.title ?? "",
        description: founderMessage.description ?? "",
        founderName: founderMessage.founderName ?? "",
        founderPosition: founderMessage.founderPosition ?? "",
        founderImage: founderMessage.founderImage ?? "",
      });
      setImagePreview(founderMessage.founderImage ?? null);
      setImageRemoved(false);
    }
  }, [founderMessage]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load founder message", {
        description: error,
      });
    }
  }, [error]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (file: File) => {
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setImageError("Invalid file type. Please select JPG, PNG, or WEBP.");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageError("File too large. Maximum size is 5MB.");
      return;
    }

    setImageError("");
    setImageFile(file);
    setImageRemoved(false);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview("/founder/fallback.jpg");
    setImageError("");
    setImageRemoved(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasChanges =
      !founderMessage ||
      formData.title !== (founderMessage.title ?? "") ||
      formData.description !== (founderMessage.description ?? "") ||
      formData.founderName !== (founderMessage.founderName ?? "") ||
      formData.founderPosition !== (founderMessage.founderPosition ?? "") ||
      formData.founderImage !== (founderMessage.founderImage ?? "") ||
      imageFile !== null ||
      imageRemoved;

    if (!hasChanges) {
      toast.warning("No changes detected", {
        description: "Please modify at least one field before saving.",
      });
      return;
    }

    setIsSaving(true);
    const toastId = toast.loading("Saving changes...");

    try {
      let imageUrl = formData.founderImage;

      // Handle image removal
      if (imageRemoved && !imageFile) {
        // Delete old image if exists and not fallback
        if (
          founderMessage?.founderImage &&
          founderMessage.founderImage !== "/founder/fallback.jpg"
        ) {
          const oldFilename = founderMessage.founderImage.split("/").pop();
          if (oldFilename) {
            await deleteFounderImage(oldFilename);
          }
        }
        imageUrl = "/founder/fallback.jpg";
      }
      // Upload new image if selected
      else if (imageFile) {
        setIsUploadingImage(true);
        const uploadFormData = new FormData();
        uploadFormData.append("file", imageFile);

        const uploadResult = await uploadFounderImage(uploadFormData);

        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Failed to upload image");
        }

        // Delete old image if exists and not fallback
        if (
          founderMessage?.founderImage &&
          founderMessage.founderImage !== "/founder/fallback.jpg"
        ) {
          const oldFilename = founderMessage.founderImage.split("/").pop();
          if (oldFilename) {
            await deleteFounderImage(oldFilename);
          }
        }

        imageUrl = uploadResult.url || "";
        setIsUploadingImage(false);
      }

      const payload: Record<string, unknown> = {};
      if (formData.title.trim().length) payload.title = formData.title;
      if (formData.description.trim().length)
        payload.description = formData.description;
      if (formData.founderName.trim().length)
        payload.founderName = formData.founderName;
      if (formData.founderPosition.trim().length)
        payload.founderPosition = formData.founderPosition;
      if (imageUrl.trim().length) {
        payload.founderImage = imageUrl;
      }

      const result = await updateFounderMessage(payload as any);

      if (result.success) {
        setImageFile(null);
        setImageRemoved(false);
        toast.success("Founder message updated", {
          id: toastId,
          description: "Founder message updated successfully.",
        });
      } else {
        throw new Error(result.error || "Failed to update founder message");
      }
    } catch (error) {
      toast.error("Failed to update founder message", {
        id: toastId,
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSaving(false);
      setIsUploadingImage(false);
    }
  };

  if (loading && !founderMessage) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image skeleton - centered */}
            <div className="flex justify-center">
              <Skeleton className="w-40 h-40 rounded-full" />
            </div>
            {/* Name and Position skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            {/* Title and Message skeleton */}
            <div className="border-t pt-6 space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && !founderMessage) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          <p className="font-semibold">Error loading founder message</p>
          <p className="text-sm mt-1">{error}</p>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Founder Message</h1>
        <p className="text-muted-foreground">
          Manage the message and details shown on the About page&apos;s founder
          section.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Founder Information</CardTitle>
          <CardDescription>
            Update founder details and message displayed on the About page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Founder Image - Centered */}
            <div className="flex justify-center">
              <ImageUploadDialog
                imageUrl={imagePreview || undefined}
                fallbackImage="/founder/fallback.jpg"
                onImageSelect={handleImageSelect}
                onImageRemove={handleImageRemove}
                uploading={isUploadingImage}
                error={imageError}
                label="Click to upload founder image"
                size="lg"
              />
            </div>

            {/* Founder Name and Position - Below Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="founderName">Founder Name</Label>
                <Input
                  id="founderName"
                  name="founderName"
                  value={formData.founderName}
                  onChange={handleInputChange}
                  placeholder="Dhan Bahadur Gurung"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="founderPosition">Founder Position</Label>
                <Input
                  id="founderPosition"
                  name="founderPosition"
                  value={formData.founderPosition}
                  onChange={handleInputChange}
                  placeholder="FOUNDER & CEO"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Section Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="FROM THE FOUNDER"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Founder Message</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={12}
                  className="bg-background"
                  placeholder="Write the founder's message shown on the About page..."
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSaving || isUploadingImage}>
                <Save className="h-4 w-4 mr-2" />
                {isUploadingImage
                  ? "Uploading..."
                  : isSaving
                    ? "Saving..."
                    : "Save changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
