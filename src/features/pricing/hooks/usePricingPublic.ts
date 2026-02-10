"use client";

import { useState, useEffect, useCallback } from "react";
import type { MembershipPlan } from "../admin/types/types";

interface UsePricingPublicReturn {
  plans: MembershipPlan[];
  loading: boolean;
  error: string | null;
}

export function usePricingPublic(): UsePricingPublicReturn {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/membership-plans", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch plans: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        setPlans(data.data);
      } else {
        setPlans([]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch pricing plans";
      setError(errorMessage);
      console.error("Error fetching pricing data:", err);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return { plans, loading, error };
}
