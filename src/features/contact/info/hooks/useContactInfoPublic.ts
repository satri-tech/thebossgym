"use client";

import { useState, useEffect, useCallback } from "react";
import { ContactInfo } from "../admin/types/types";

export function useContactInfoPublic() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContactInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/contact-info");
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

  useEffect(() => {
    fetchContactInfo();
  }, [fetchContactInfo]);

  return {
    contactInfo,
    loading,
    error,
    refetch: fetchContactInfo,
  };
}
