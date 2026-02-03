"use client";

import { useState, useEffect, useCallback } from "react";
import { Stat, CreateStatInput, UpdateStatInput } from "../types/types";

export function useStats() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/admin/stats");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch stats");
      }

      setStats(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const createStat = async (input: CreateStatInput) => {
    try {
      const response = await fetch("/api/admin/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create stat");
      }

      await fetchStats();
      return { success: true, data: data.data };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      return { success: false, error: message };
    }
  };

  const updateStat = async (id: string, input: UpdateStatInput) => {
    try {
      const response = await fetch(`/api/admin/stats/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update stat");
      }

      await fetchStats();
      return { success: true, data: data.data };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      return { success: false, error: message };
    }
  };

  const deleteStat = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/stats/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete stat");
      }

      await fetchStats();
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      return { success: false, error: message };
    }
  };

  const reorderStats = async (reorderedStats: Stat[]) => {
    // Optimistic update - update UI immediately
    const previousStats = [...stats];
    setStats(reorderedStats);

    try {
      const orderedIds = reorderedStats.map((stat) => stat.id);
      const response = await fetch("/api/admin/stats/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reorder stats");
      }

      // Update with server response to ensure consistency
      setStats(data.data || reorderedStats);
      return { success: true };
    } catch (err) {
      // Revert to previous state on error
      setStats(previousStats);
      const message = err instanceof Error ? err.message : "An error occurred";
      return { success: false, error: message };
    }
  };

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    createStat,
    updateStat,
    deleteStat,
    reorderStats,
    refetch: fetchStats,
  };
}
