"use client";

import { useState, useEffect, useCallback } from "react";
import { Service, CreateServiceInput, UpdateServiceInput } from "../types/types";
import { uploadServiceImage } from "../actions/uploadServiceImage";

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/admin/services");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch services");
      }

      setServices(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const createService = async (input: CreateServiceInput, imageFile?: File) => {
    try {
      let imageUrl: string = input.image;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadResult = await uploadServiceImage(formData);

        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Failed to upload image");
        }

        imageUrl = uploadResult.url || input.image;
      }

      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, image: imageUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && typeof data.errors === "object") {
          const errorMessages = Object.entries(data.errors)
            .map(([field, message]) => `${field}: ${message}`)
            .join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(data.message || "Failed to create service");
      }

      await fetchServices();
      return { success: true, data: data.data };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      return { success: false, error: message };
    }
  };

  const updateService = async (id: string, input: UpdateServiceInput, imageFile?: File) => {
    try {
      let imageUrl: string | undefined = input.image;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadResult = await uploadServiceImage(formData);

        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Failed to upload image");
        }

        imageUrl = uploadResult.url || input.image;
      }

      const response = await fetch(`/api/admin/services/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, image: imageUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && typeof data.errors === "object") {
          const errorMessages = Object.entries(data.errors)
            .map(([field, message]) => `${field}: ${message}`)
            .join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(data.message || "Failed to update service");
      }

      await fetchServices();
      return { success: true, data: data.data };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      return { success: false, error: message };
    }
  };

  const deleteService = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete service");
      }

      await fetchServices();
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      return { success: false, error: message };
    }
  };

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    services,
    loading,
    error,
    createService,
    updateService,
    deleteService,
    refetch: fetchServices,
  };
}
