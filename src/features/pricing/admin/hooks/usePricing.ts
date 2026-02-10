import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { MembershipPlan } from "../types/types";

export function usePricing() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const plansRes = await fetch("/api/admin/membership-plans");

      if (plansRes.ok) {
        const plansData = await plansRes.json();
        setPlans(plansData.data || []);
      }
    } catch (error) {
      console.error("Error fetching pricing data:", error);
      toast.error("Failed to load pricing data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    plans,
    loading,
    refetch: fetchData,
  };
}
