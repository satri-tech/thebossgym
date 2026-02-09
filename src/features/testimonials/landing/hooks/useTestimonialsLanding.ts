"use client";

import { useState, useCallback } from "react";
import { Testimonial } from "../../types/types";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

interface UseTestimonialsLandingResult {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useTestimonialsLanding(): UseTestimonialsLandingResult {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/testimonials");
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

  return {
    testimonials,
    loading,
    error,
    refetch: fetchTestimonials,
  };
}
