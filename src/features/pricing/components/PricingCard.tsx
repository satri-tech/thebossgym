"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import FeatureItem from "./FeatureItem";

interface PricingCardProps {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  isYearly: boolean;
  features: { text: string; included: boolean }[];
  isPopular?: boolean;
  index: number;
}

export default function PricingCard({
  name,
  monthlyPrice,
  yearlyPrice,
  isYearly,
  features,
  isPopular = false,
  index,
}: PricingCardProps) {
  const price = isYearly ? yearlyPrice : monthlyPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      className={`relative group ${isPopular ? 'z-10' : ''}`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="gold-bg px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <Sparkles className="w-4 h-4 text-black" />
            <span className="text-black font-bold text-sm">MOST POPULAR</span>
          </div>
        </motion.div>
      )}

      {/* Card */}
      <div
        className={`relative h-full bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-8 border-2 transition-all duration-300 overflow-hidden
          ${isPopular 
            ? 'border-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.3)]' 
            : 'border-zinc-800 group-hover:border-[#d4af37] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]'
          }`}
      >
        {/* Background Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37] rounded-full blur-[120px] opacity-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ffd700] rounded-full blur-[120px] opacity-10" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Plan Name */}
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          
          {/* Price */}
          <div className="mb-6">
            <motion.div
              key={isYearly ? 'yearly' : 'monthly'}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-baseline gap-2"
            >
              <span className="text-5xl font-bold gold-text">
                Rs {price.toLocaleString()}
              </span>
              <span className="text-gray-400 text-lg">
                /{isYearly ? 'year' : 'month'}
              </span>
            </motion.div>
            {isYearly && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-[#d4af37] mt-2"
              >
                Save Rs {((monthlyPrice * 12 - yearlyPrice)).toLocaleString()} per year
              </motion.p>
            )}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 rounded-xl font-bold text-lg mb-8 flex items-center justify-center gap-2 transition-all duration-300
              ${isPopular
                ? 'gold-bg text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]'
                : 'bg-zinc-800 text-white border-2 border-zinc-700 hover:border-[#d4af37] hover:bg-zinc-700'
              }`}
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Features */}
          <ul className="space-y-4">
            {features.map((feature, idx) => (
              <FeatureItem key={idx} text={feature.text} included={feature.included} />
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
