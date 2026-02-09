"use client";

import { useState, useEffect } from "react";
import { useAbout } from "../hooks/useAbout";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Skeleton } from "@/core/components/ui/skeleton";
import { Info, Save } from "lucide-react";
import { Alert, AlertDescription } from "@/core/components/ui/alert";
import { toast } from "sonner";
import { ImageUploadField } from "@/core/components/image-upload";

export function AboutManager() {
  const { about, loading, error, updateAbout } = useAbout();
  const [formData, setFormData] = useState({
    tag: "",
    heading: "",
    highlight: "",
    description: "",
    buttonText: "",
    buttonLink: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form data when about data is loaded
  useEffect(() => {
    if (about) {
      setFormData({
        tag: about.tag,
        heading: about.heading,
        highlight: about.highlight,
        description: about.description,
        buttonText: about.buttonText,
        buttonLink: about.buttonLink,
      });
      if (about.image) {
        setImagePreview(about.image);
      }
    }
  }, [about]);

  // Show error toast when loading fails
  useEffect(() => {
    if (error) {
      toast.error("Failed to load about section", {
        description: error,
      });
    }
  }, [error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if any field has been modified
    const hasChanges = about && (
      formData.tag !== about.tag ||
      formData.heading !== about.heading ||
      formData.highlight !== about.highlight ||
      formData.description !== about.description ||
      formData.buttonText !== about.buttonText ||
      formData.buttonLink !== about.buttonLink ||
      imageFile !== null
    );

    if (!hasChanges && !imageFile) {
      toast.warning("No changes detected", {
        description: "Please modify at least one field before saving.",
      });
      return;
    }

    setIsSaving(true);
    const toastId = toast.loading("Saving changes...", {
      description: imageFile ? "Uploading image and updating content..." : "Updating content...",
    });

    const result = await updateAbout(formData, imageFile || undefined);

    setIsSaving(false);

    if (result.success) {
      toast.success("Success!", {
        id: toastId,
        description: "About section updated successfully",
      });
      setImageFile(null);
    } else {
      toast.error("Failed to update", {
        id: toastId,
        description: result.error || "An unexpected error occurred. Please try again.",
      });
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            <p className="font-semibold">Error loading about section</p>
            <p className="text-sm mt-1">{error}</p>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="space-y-1">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Info className="h-8 w-8" />
          About Section Management
        </h1>
        <p className="text-muted-foreground">
          Manage the about section content displayed on your website
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>About Section Content</CardTitle>
            <CardDescription>
              Update the content and image for the about section
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tag */}
            <div className="space-y-2">
              <Label htmlFor="tag">Tag</Label>
              <Input
                id="tag"
                name="tag"
                value={formData.tag}
                onChange={handleInputChange}
                placeholder="e.g., ABOUT THE BOSS GYM"
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">
                Small text displayed above the heading
              </p>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <Label htmlFor="heading">Heading</Label>
              <Input
                id="heading"
                name="heading"
                value={formData.heading}
                onChange={handleInputChange}
                placeholder="e.g., WHERE CHAMPIONS ARE FORGED"
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground">
                Main heading text
              </p>
            </div>

            {/* Highlight */}
            <div className="space-y-2">
              <Label htmlFor="highlight">Highlight Word</Label>
              <Input
                id="highlight"
                name="highlight"
                value={formData.highlight}
                onChange={handleInputChange}
                placeholder="e.g., FORGED"
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">
                Word to highlight in the heading (usually styled differently)
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter the about section description..."
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                Detailed description of your gym
              </p>
            </div>

            {/* Button Text */}
            <div className="space-y-2">
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleInputChange}
                placeholder="e.g., START YOUR JOURNEY"
                maxLength={50}
              />
              <p className="text-xs text-muted-foreground">
                Text displayed on the call-to-action button
              </p>
            </div>

            {/* Button Link */}
            <div className="space-y-2">
              <Label htmlFor="buttonLink">Button Link</Label>
              <Input
                id="buttonLink"
                name="buttonLink"
                value={formData.buttonLink}
                onChange={handleInputChange}
                placeholder="e.g., /contact"
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground">
                URL where the button should navigate
              </p>
            </div>

            {/* Image Upload */}
            <ImageUploadField
              label="About Section Image"
              value={about?.image}
              preview={imagePreview}
              onChange={setImageFile}
              onPreviewChange={setImagePreview}
              helpText="Max size: 5MB"
              acceptedFormats={["image/jpeg", "image/png", "image/webp", "image/gif"]}
            />

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
