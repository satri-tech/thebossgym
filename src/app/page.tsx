"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/core/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { WhyChooseUs } from "@/features/why-choose-us/components/WhyChooseUs";
import { TrainersGallery } from "@/features/trainers/components/TrainersGallery";
import { useEffect, useState } from "react";
import Testimonials from "@/features/testimonials/components/testimonials";

const BossGymLanding = () => {
  const { heroY, heroOpacity, heroScale, containerRef, heroRef } = useScrollAnimation();
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
    <div ref={containerRef} className="relative bg-black text-white overflow-hidden">
      <style jsx global>{`
        .boss-text {
          background: linear-gradient(
            135deg, 
            #3a3a3a 0%, 
            #5a5a5a 15%, 
            #ffffff 40%, 
            #ffffff 60%, 
            #5a5a5a 80%, 
            #3a3a3a 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(4px 8px 0px rgba(0, 0, 0, 0.9));
        }
      `}</style>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="anton-font text-8xl md:text-[12rem] lg:text-[16rem] font-bold mb-6 leading-none boss-text"
            >
              THE BOSS
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="anton-font text-4xl md:text-6xl gold-text mb-4">
              GYM
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
              Transform Your Body. Dominate Your Goals. Become The Boss.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="anton-font text-xl px-8 py-6 gold-bg text-black group transition-all tracking-wide"
            >
              START YOUR JOURNEY
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform text-black" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="anton-font text-xl px-8 py-6 bg-transparent border-2 border-white/30 hover:border-primary hover:bg-transparent group transition-all"
            >
              <Play className="mr-2 text-white group-hover:text-primary transition-colors" fill="currentColor" />
              <span className="text-white group-hover:gold-text transition-all">WATCH INTRO</span>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
          >
            {[
              { number: "500+", label: "MEMBERS" },
              { number: "50+", label: "TRAINERS" },
              { number: "10K+", label: "WORKOUTS" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <div className="anton-font text-4xl md:text-5xl gold-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </motion.section>

      {/* Features Section with Parallax */}
      <WhyChooseUs />

      {/* Trainers Gallery Section */}
      <TrainersGallery />

      {/* Testimonials Section - Premium Luxury Design */}
      <Testimonials />


      {/* CTA Section */}
      <section className="relative py-32 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="anton-font text-6xl md:text-8xl mb-8">
            READY TO BE
            <br />
            <span className="gold-text">THE BOSS?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Start your transformation today with a free trial
          </p>
          <Button
            size="lg"
            className="anton-font text-2xl px-12 py-8 bg-black border-2 border-primary hover:bg-primary/10"
          >
            <span className="gold-text">GET STARTED NOW</span>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default BossGymLanding;