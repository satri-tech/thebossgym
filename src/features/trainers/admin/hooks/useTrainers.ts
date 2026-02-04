"use client";

import { useState, useEffect, useCallback } from "react";
import { Trainer, CreateTrainerInput, UpdateTrainerInput } from "../../types/trainers.types";

export function useTrainers() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrainers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/admin/trainers");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch trainers");
      }

      setTrainers(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const createTrainer = async (input: CreateTrainerInput) => {
    try {
      const response = await fetch("/api/admin/trainers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create trainer");
      }

      await fetchTrainers();
      return { success: true, data: data.data };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      return { success: false, error: message };
    }
  };

  const updateTrainer = async (id: string, input: UpdateTrainerInput) => {
    try {
      const response = await fetch(`/api/admin/trainers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update trainer");
      }

      await fetchTrainers();
      return { success: true, data: data.data };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      return { success: false, error: message };
    }
  };

  const deleteTrainer = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/trainers/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete trainer");
      }

      await fetchTrainers();
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      return { success: false, error: message };
    }
  };

  const reorderTrainers = async (reorderedTrainers: Trainer[]) => {
    // Optimistic update - update UI immediately
    const previousTrainers = [...trainers];
    setTrainers(reorderedTrainers);

    try {
      const orderedIds = reorderedTrainers.map((trainer) => trainer.id);
      const response = await fetch("/api/admin/trainers/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reorder trainers");
      }

      // Update with server response to ensure consistency
      setTrainers(data.data || reorderedTrainers);
      return { success: true };
    } catch (err) {
      // Revert to previous state on error
      setTrainers(previousTrainers);
      const message = err instanceof Error ? err.message : "An error occurred";
      return { success: false, error: message };
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, [fetchTrainers]);

  return {
    trainers,
    loading,
    error,
    createTrainer,
    updateTrainer,
    deleteTrainer,
    reorderTrainers,
    refetch: fetchTrainers,
  };
}
