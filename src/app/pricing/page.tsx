"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PricingToggle from "@/features/pricing/components/PricingToggle";
import PricingCard from "@/features/pricing/components/PricingCard";
import FAQItem from "@/features/pricing/components/FAQItem";
import BackgroundEffects from "@/features/pricing/components/BackgroundEffects";

const pricingPlans = [
  {
    name: "Basic",
    monthlyPrice: 2000,
    yearlyPrice: 19200,
    features: [
      { text: "Access to gym equipment", included: true },
      { text: "Locker facility", included: true },
      { text: "Basic workout guidance", included: true },
      { text: "Personal trainer sessions", included: false },
      { text: "Nutrition consultation", included: false },
      { text: "Group fitness classes", included: false },
      { text: "Sauna & steam room", included: false },
      { text: "Guest passes", included: false },
    ],
  },
  {
    name: "Standard",
    monthlyPrice: 4000,
    yearlyPrice: 38400,
    isPopular: true,
    features: [
      { text: "Access to gym equipment", included: true },
      { text: "Locker facility", included: true },
      { text: "Basic workout guidance", included: true },
      { text: "Personal trainer sessions (2/month)", included: true },
      { text: "Nutrition consultation", included: true },
      { text: "Group fitness classes", included: true },
      { text: "Sauna & steam room", included: false },
      { text: "Guest passes (2/month)", included: true },
    ],
  },
  {
    name: "Premium",
    monthlyPrice: 7000,
    yearlyPrice: 67200,
    features: [
      { text: "Access to gym equipment", included: true },
      { text: "Locker facility", included: true },
      { text: "Basic workout guidance", included: true },
      { text: "Personal trainer sessions (Unlimited)", included: true },
      { text: "Nutrition consultation (Weekly)", included: true },
      { text: "Group fitness classes", included: true },
      { text: "Sauna & steam room", included: true },
      { text: "Guest passes (5/month)", included: true },
    ],
  },
];

const faqs = [
  {
    question: "Can I switch plans anytime?",
    answer: "Yes! You can upgrade or downgrade your membership plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a joining fee?",
    answer: "We have a one-time joining fee of Rs 1,000 for all new members. This covers your membership card, initial fitness assessment, and orientation session.",
  },
  {
    question: "What if I need to freeze my membership?",
    answer: "You can freeze your membership for up to 2 months per year for medical or travel reasons. A small administrative fee of Rs 500 per month applies.",
  },
  {
    question: "Do you offer student or senior citizen discounts?",
    answer: "Yes! We offer 15% discount for students (with valid ID) and 20% discount for senior citizens (60+ years). These discounts apply to all membership plans.",
  },
  {
    question: "What are the gym operating hours?",
    answer: "We're open 7 days a week from 5:00 AM to 10:00 PM. Premium members get 24/7 access with their membership card.",
  },
  {
    question: "Can I get a refund if I cancel?",
    answer: "Monthly memberships can be cancelled with 30 days notice. Yearly memberships are non-refundable but can be transferred to another person with approval.",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

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
            <PricingToggle isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} />
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <PricingCard
                  key={plan.name}
                  name={plan.name}
                  monthlyPrice={plan.monthlyPrice}
                  yearlyPrice={plan.yearlyPrice}
                  isYearly={isYearly}
                  features={plan.features}
                  isPopular={plan.isPopular}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 anton-font">
                Frequently Asked{" "}
                <span className="gold-text">Questions</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Got questions? We've got answers.
              </p>
            </motion.div>

            <div className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-8 border border-zinc-800">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
      </div>
    </div>
  );
}
