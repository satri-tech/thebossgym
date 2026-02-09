"use client";

import { useState, useCallback } from "react";
import { Testimonial, CreateTestimonialInput, UpdateTestimonialInput } from "../../types/types";
import { uploadTestimonialImage, deleteTestimonialImage } from "../actions/uploadTestimonialImage";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string>;
}

interface UseTestimonialsResult {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
  createTestimonial: (data: CreateTestimonialInput) => Promise<{ success: boolean; error?: string }>;
  updateTestimonial: (id: string, data: UpdateTestimonialInput) => Promise<{ success: boolean; error?: string }>;
  deleteTestimonial: (id: string, imageUrl?: string) => Promise<{ success: boolean; error?: string }>;
  refetch: () => Promise<void>;
}

export function useTestimonials(): UseTestimonialsResult {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/admin/testimonials");
      const result: ApiResponse<Testimonial[]> = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch testimonials");
      }

      setTestimonials(result.data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch testimonials";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTestimonial = useCallback(
    async (data: CreateTestimonialInput) => {
      try {
        const response = await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result: ApiResponse<Testimonial> = await response.json();

        if (!response.ok) {
          return {
            success: false,
            error: result.message || "Failed to create testimonial",
          };
        }

        setTestimonials((prev) => [result.data!, ...prev]);
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to create testimonial";
        return { success: false, error: message };
      }
    },
    []
  );

  const updateTestimonial = useCallback(
    async (id: string, data: UpdateTestimonialInput) => {
      try {
        const response = await fetch(`/api/admin/testimonials/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result: ApiResponse<Testimonial> = await response.json();

        if (!response.ok) {
          return {
            success: false,
            error: result.message || "Failed to update testimonial",
          };
        }

        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? result.data! : t))
        );
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to update testimonial";
        return { success: false, error: message };
      }
    },
    []
  );

  const deleteTestimonial = useCallback(
    async (id: string, imageUrl?: string) => {
      try {
        // Delete image file if it exists
        if (imageUrl && imageUrl !== "/testimonials/fallback.jpg") {
          const filename = imageUrl.split("/").pop();
          if (filename) {
            await deleteTestimonialImage(filename);
          }
        }

        const response = await fetch(`/api/admin/testimonials/${id}`, {
          method: "DELETE",
        });

        const result: ApiResponse<{ id: string; deleted: boolean }> = await response.json();

        if (!response.ok) {
          return {
            success: false,
            error: result.message || "Failed to delete testimonial",
          };
        }

        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to delete testimonial";
        return { success: false, error: message };
      }
    },
    []
  );

  return {
    testimonials,
    loading,
    error,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    refetch: fetchTestimonials,
  };
}
