"use client";

import { motion } from "framer-motion";

export default function HeroAnimated({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28"
    >
      {children}
    </motion.section>
  );
}

// Sub-wrappers for staggered animations
HeroAnimated.Title = function ({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

HeroAnimated.Subtitle = function ({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mb-8"
    >
      {children}
    </motion.div>
  );
};

HeroAnimated.Actions = function ({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
    >
      {children}
    </motion.div>
  );
};
