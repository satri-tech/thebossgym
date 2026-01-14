"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Gold Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-96 h-96 bg-[#d4af37] rounded-full blur-[150px] opacity-10"
      />
      
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#ffd700] rounded-full blur-[150px] opacity-10"
      />

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a227] rounded-full blur-[180px] opacity-5"
      />

      {/* Animated Lines */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1, scaleX: 0 }}
            animate={{ opacity: [0.1, 0.2, 0.1], scaleX: [0, 1, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut",
            }}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
            style={{
              top: `${30 + i * 20}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
