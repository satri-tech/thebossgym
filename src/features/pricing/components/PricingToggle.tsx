"use client";

import { motion } from "framer-motion";

interface PricingToggleProps {
  isYearly: boolean;
  onToggle: () => void;
}

export default function PricingToggle({ isYearly, onToggle }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <span className={`text-lg font-semibold transition-colors ${!isYearly ? 'text-white' : 'text-gray-500'}`}>
        Monthly
      </span>
      <button
        onClick={onToggle}
        className="relative w-20 h-10 bg-zinc-800 rounded-full p-1 cursor-pointer hover:bg-zinc-700 transition-colors"
        aria-label="Toggle pricing period"
      >
        <motion.div
          className="w-8 h-8 rounded-full gold-bg"
          animate={{
            x: isYearly ? 40 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </button>
      <span className={`text-lg font-semibold transition-colors ${isYearly ? 'text-white' : 'text-gray-500'}`}>
        Yearly
        <span className="ml-2 text-sm gold-text font-bold">Save 20%</span>
      </span>
    </div>
  );
}
