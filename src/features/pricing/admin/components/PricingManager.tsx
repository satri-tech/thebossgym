"use client";

import { Spinner } from "@/core/components/ui/spinner";
import { usePricing } from "../hooks/usePricing";
import { PlanManager } from "./PlanManager";

export function PricingManager() {
  const { plans, loading, refetch } = usePricing();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  return (
    <PlanManager plans={plans} onRefetch={refetch} />
  );
}
