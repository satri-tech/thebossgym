"use client";

import { motion } from "framer-motion";

export default function BackgroundShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Gold Shapes */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -80, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-20 left-10 w-64 h-64 bg-[#d4af37] rounded-full blur-[120px] opacity-10"
      />
      
      <motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, 100, 0],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-40 right-20 w-80 h-80 bg-[#ffd700] rounded-full blur-[140px] opacity-10"
      />

      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#c9a227] rounded-full blur-[160px] opacity-5"
      />
    </div>
  );
}
