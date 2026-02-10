"use client";

import { useState, useEffect, useCallback } from "react";
import { ContactInfo, UpdateContactInfoInput } from "../types/types";

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContactInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/admin/contact-info");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch contact info");
      }

      setContactInfo(data.data || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateContactInfo = async (input: UpdateContactInfoInput) => {
    try {
      const response = await fetch("/api/admin/contact-info", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && typeof data.errors === "object") {
          const errorMessages = Object.entries(data.errors)
            .map(([field, message]) => `${field}: ${message}`)
            .join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(data.message || "Failed to update contact info");
      }

      setContactInfo(data.data);
      return { success: true, data: data.data };
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      return { success: false, error: message };
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, [fetchContactInfo]);

  return {
    contactInfo,
    loading,
    error,
    updateContactInfo,
    refetch: fetchContactInfo,
  };
}
