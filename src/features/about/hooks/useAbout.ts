"use client";

import { useState, useEffect, useCallback } from "react";
import { About, UpdateAboutInput } from "../types/types";

export function useAbout() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAbout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/about");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch about section");
      }

      setAbout(data.data || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAbout = async (input: UpdateAboutInput, imageFile?: File) => {
    try {
      let imageUrl = input.image;

      // Upload image if provided
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadResponse = await fetch("/api/admin/about/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadData.message || "Failed to upload image");
        }

        imageUrl = uploadData.data.url;
      }

      // Update about section
      const response = await fetch("/api/admin/about", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, image: imageUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors
        if (data.errors && typeof data.errors === 'object') {
          const errorMessages = Object.entries(data.errors)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ');
          throw new Error(errorMessages);
        }
        throw new Error(data.message || "Failed to update about section");
      }

      await fetchAbout();
      return { success: true, data: data.data };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      return { success: false, error: message };
    }
  };

  useEffect(() => {
    fetchAbout();
  }, [fetchAbout]);

  return {
    about,
    loading,
    error,
    updateAbout,
    refetch: fetchAbout,
  };
}
