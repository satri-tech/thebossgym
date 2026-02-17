"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PricingToggle from "@/features/pricing/components/PricingToggle";
import PricingCard from "@/features/pricing/components/PricingCard";
import BackgroundEffects from "@/features/pricing/components/BackgroundEffects";
import { Spinner } from "@/core/components/ui/spinner";
import { usePricingPublic } from "@/features/pricing/hooks/usePricingPublic";
import type { MembershipPlan } from "@/features/pricing/admin/types/types";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const { plans, loading } = usePricingPublic();

  // Memoize plan grouping to avoid recalculation
  const displayPlans = useMemo(() => {
    if (!plans.length) return [];

    // Group plans by tier and billing cycle
    const monthlyPlans = plans.filter((p) => p.billingCycle === "MONTHLY");
    const yearlyPlans = plans.filter((p) => p.billingCycle === "YEARLY");

    // Create a map of plans by tier
    const plansByTier = monthlyPlans.reduce((acc, monthlyPlan) => {
      const yearlyPlan = yearlyPlans.find((p) => p.tier === monthlyPlan.tier);
      acc[monthlyPlan.tier] = {
        monthly: monthlyPlan,
        yearly: yearlyPlan,
      };
      return acc;
    }, {} as Record<string, { monthly: MembershipPlan | undefined; yearly: MembershipPlan | undefined }>);

    return Object.values(plansByTier)
      .filter((p) => p.monthly || p.yearly)
      .sort((a, b) => {
        const orderA = a.monthly?.displayOrder ?? a.yearly?.displayOrder ?? 0;
        const orderB = b.monthly?.displayOrder ?? b.yearly?.displayOrder ?? 0;
        return orderA - orderB;
      });
  }, [plans]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 anton-font">
                Choose Your{" "}
                <span className="gold-text">Perfect Plan</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                Transform your body and mind with our premium gym facilities.
                Select the membership that fits your fitness journey.
              </p>
            </motion.div>

            {/* Pricing Toggle */}
            {displayPlans.length > 0 && (
              <PricingToggle isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} />
            )}
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            {displayPlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayPlans.map((planGroup, index) => {
                  const plan = isYearly ? planGroup.yearly : planGroup.monthly;
                  if (!plan) return null;

                  const features = plan.features.map((feature) => ({
                    text: feature.text,
                    included: feature.isIncluded,
                  }));

                  return (
                    <PricingCard
                      key={plan.id}
                      name={plan.name}
                      monthlyPrice={planGroup.monthly?.price || 0}
                      yearlyPrice={planGroup.yearly?.price || 0}
                      isYearly={isYearly}
                      features={features}
                      isPopular={plan.isPopular}
                      index={index}
                    />
                  );
                })}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-20"
              >
                <div className="mb-4 text-5xl">💪</div>
                <h3 className="text-2xl font-bold mb-2 gold-text">Plans Coming Soon</h3>
                <p className="text-gray-400 text-lg">
                  We're crafting the perfect membership plans for you. Check back soon!
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        {displayPlans.length > 0 && (
          <section className="py-20 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="bg-gradient-to-br from-zinc-900 to-black rounded-3xl p-12 border-2 border-[#d4af37] relative overflow-hidden">
                <div className="absolute inset-0 bg-[#d4af37] opacity-5" />
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 anton-font">
                    Ready to Start Your{" "}
                    <span className="gold-text">Fitness Journey?</span>
                  </h2>
                  <p className="text-xl text-gray-400 mb-8">
                    Join hundreds of members who have transformed their lives at our gym.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="gold-bg text-black font-bold text-lg px-12 py-4 rounded-xl inline-block"
                  >
                    Visit Us Today
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
}
