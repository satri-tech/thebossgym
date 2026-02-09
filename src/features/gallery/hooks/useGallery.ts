"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface GalleryImage {
  id: string;
  imageUrl: string;
  alt: string;
  width: number;
  height: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export function useGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/gallery");
      const data = await response.json();

      if (data.success) {
        setImages(data.data);
      } else {
        toast.error("Failed to fetch images");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadImage = async (
    file: File,
    alt: string,
    tags: string[]
  ): Promise<boolean> => {
    try {
      // Get image dimensions
      const dimensions = await getImageDimensions(file);

      // Upload file
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("/api/admin/gallery/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadData.success) {
        console.error("Upload failed:", uploadData.error);
        return false;
      }

      // Create gallery image record
      const createResponse = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: uploadData.url,
          alt,
          width: dimensions.width,
          height: dimensions.height,
          tags,
        }),
      });

      const createData = await createResponse.json();

      if (createData.success) {
        await fetchImages();
        return true;
      } else {
        console.error("Create record failed:", createData.error);
        return false;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return false;
    }
  };

  const deleteImage = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Image deleted successfully");
        await fetchImages();
        return true;
      } else {
        toast.error(data.error || "Failed to delete image");
        return false;
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
      return false;
    }
  };

  return {
    images,
    loading,
    uploading,
    uploadImage,
    deleteImage,
    refetch: fetchImages,
  };
}

// Helper function to get image dimensions
function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}
