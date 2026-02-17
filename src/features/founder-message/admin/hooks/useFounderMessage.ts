"use client";

import { useCallback, useEffect, useState } from "react";
import { UpdateFounderMessageInput } from "@/core/validators/founder-message.validator";

export interface FounderMessage {
  id: number;
  title: string;
  highlight: string;
  description: string;
  founderName: string;
  founderPosition: string;
  founderImage?: string | null;
  updatedAt: string;
}

interface UseFounderMessageResult {
  founderMessage: FounderMessage | null;
  loading: boolean;
  error: string | null;
  updateFounderMessage: (
    input: UpdateFounderMessageInput,
  ) => Promise<{ success: boolean; data?: FounderMessage; error?: string }>;
  refetch: () => Promise<void>;
}

export function useFounderMessage(): UseFounderMessageResult {
  const [founderMessage, setFounderMessage] = useState<FounderMessage | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFounderMessage = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/founder-message");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch founder message");
      }

      setFounderMessage(data.data || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFounderMessage = async (input: UpdateFounderMessageInput) => {
    try {
      const response = await fetch("/api/admin/founder-message", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && typeof data.errors === "object") {
          const errorMessages = Object.entries(
            data.errors as Record<string, string>,
          )
            .map(([field, message]) => `${field}: ${message}`)
            .join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(data.message || "Failed to update founder message");
      }

      await fetchFounderMessage();
      return { success: true, data: data.data as FounderMessage };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      return { success: false, error: message };
    }
  };

  useEffect(() => {
    fetchFounderMessage();
  }, [fetchFounderMessage]);

  return {
    founderMessage,
    loading,
    error,
    updateFounderMessage,
    refetch: fetchFounderMessage,
  };
}
