"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TESTIMONIALS } from "../../constants/constants";

const Testimonials = () => {
      const [currentSlide, setCurrentSlide] = useState(0);
      const [direction, setDirection] = useState(1); // 1 for right to left, -1 for left to right
      const totalSlides = 4; // Number of testimonials
    
      // Auto-slider effect
      useEffect(() => {
        const interval = setInterval(() => {
          setDirection(1); // Auto-slide goes right to left
          setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 8000); // Change slide every 8 seconds
    
        return () => clearInterval(interval);
      }, [currentSlide]);
    
  return (
    <section className="relative py-32 px-4 bg-black overflow-hidden">
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left Column - Title & Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {/* Heading */}
              <div className="space-y-2">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className=" anton-font text-7xl md:text-7xl text-white tracking-wider uppercase font-light"
                >
                  
                  From our 
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="anton-font text-7xl md:text-8xl gold-text leading-none"
                >
                  community.
                </motion.h2>
              </div>

              {/* Supporting Text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-gray-400 text-lg leading-relaxed max-w-md font-light"
              >
                Real transformations from our elite community of champions.
              </motion.p>

              {/* Navigation Arrows */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex gap-3"
              >
                <motion.button
                  onClick={() => {
                    setDirection(-1); // Left to right
                    setCurrentSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(132, 253, 62, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="group w-12 h-12 rounded-full border cursor-pointer border-white/10 hover:border-primary/50 flex items-center justify-center transition-all duration-300 backdrop-blur-sm bg-white/[0.02]"
                  aria-label="Previous testimonial"
                >
                  <motion.svg
                    className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: -2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </motion.svg>
                </motion.button>

                <motion.button
                  onClick={() => {
                    setDirection(1); // Right to left
                    setCurrentSlide((currentSlide + 1) % totalSlides);
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(132, 253, 62, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="group w-12 h-12 rounded-full border cursor-pointer border-white/10 hover:border-primary/50 flex items-center justify-center transition-all duration-300 backdrop-blur-sm bg-white/[0.02]"
                  aria-label="Next testimonial"
                >
                  <motion.svg
                    className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Column - Testimonial Display */}
            <div className="relative min-h-[400px] lg:min-h-[500px] overflow-hidden">
              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent rounded-3xl blur-3xl" />

              {/* Testimonials Container */}
              <div className="relative h-full">
                <AnimatePresence mode="sync" custom={direction}>
                  {TESTIMONIALS.map((testimonial, index) => {
                    if (currentSlide !== index) return null;

                    return (
                      <motion.div
                        key={currentSlide}
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 400 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -400 }}
                        transition={{
                          duration: 0.7,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        className="absolute inset-0"
                      >

                        {/* Quote Text with Staggered Animation */}
                        <div className="relative z-10 space-y-8">
                          {/* Quote Icon */}
                          <svg className="w-12 h-12" viewBox="0 0 24 24">
                            <defs>
                              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#f7e7a1', stopOpacity: 1 }} />
                                <stop offset="25%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: '#ffd700', stopOpacity: 1 }} />
                                <stop offset="75%" style={{ stopColor: '#c9a227', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
                              </linearGradient>
                            </defs>
                            <path fill="url(#goldGradient)" d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>

                          <blockquote className="text-xl md:text-2xl lg:text-3xl text-white font-normal leading-relaxed max-w-2xl">
                            {testimonial.quote}
                          </blockquote>

                          {/* Author Info with Profile Image */}
                          <div className="flex items-center gap-4 pt-4">
                            {/* Profile Image */}
                            <div className="relative">
                              {/* Gold Glow Effect */}
                              <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#ffd700]/20 via-[#d4af37]/10 to-transparent blur-lg" />

                              {/* Image Container with Gold Border */}
                              <div className="relative gold-border-shine w-14 h-14">
                                <div className="w-full h-full rounded-full overflow-hidden bg-black">
                                  <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-0">
                              <p className="text-base font-semibold text-white">
                                {testimonial.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {testimonial.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

  )
}

export default Testimonials