import { useState, useEffect } from "react";
import type { MembershipPlan } from "../admin/types/types";

export function usePricingPublic() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const plansRes = await fetch("/api/membership-plans");

        if (plansRes.ok) {
          const plansData = await plansRes.json();
          setPlans(plansData.data || []);
        }
      } catch (error) {
        console.error("Error fetching pricing data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { plans, loading };
}
