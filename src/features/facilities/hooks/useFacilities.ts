"use client";

import { useState, useEffect, useCallback } from "react";
import { Facility, CreateFacilityInput, UpdateFacilityInput } from "../types/types";

export function useFacilities() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFacilities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/admin/facilities");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch facilities");
      }

      setFacilities(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const createFacility = async (input: CreateFacilityInput, imageFile?: File) => {
    try {
      let imageUrl = input.image;

      // Upload image if provided
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadResponse = await fetch("/api/admin/facilities/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadData.message || "Failed to upload image");
        }

        imageUrl = uploadData.data.url;
      }

      const response = await fetch("/api/admin/facilities", {
        method: "POST",
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
        throw new Error(data.message || "Failed to create facility");
      }

      await fetchFacilities();
      return { success: true, data: data.data };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      return { success: false, error: message };
    }
  };

  const updateFacility = async (id: string, input: UpdateFacilityInput, imageFile?: File) => {
    try {
      let imageUrl = input.image;

      // Upload image if provided
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadResponse = await fetch("/api/admin/facilities/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadData.message || "Failed to upload image");
        }

        imageUrl = uploadData.data.url;
      }

      const response = await fetch(`/api/admin/facilities/${id}`, {
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
        throw new Error(data.message || "Failed to update facility");
      }

      await fetchFacilities();
      return { success: true, data: data.data };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      return { success: false, error: message };
    }
  };

  const deleteFacility = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/facilities/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete facility");
      }

      await fetchFacilities();
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      return { success: false, error: message };
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, [fetchFacilities]);

  return {
    facilities,
    loading,
    error,
    createFacility,
    updateFacility,
    deleteFacility,
    refetch: fetchFacilities,
  };
}




