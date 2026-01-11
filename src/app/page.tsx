"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Mail, Phone, Instagram, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import { Button } from "@/core/ui/button";
import Navbar from "@/features/navbar/components/NavBar";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { WhyChooseUs } from "@/features/why-choose-us/components/WhyChooseUs";
import { Testimonials } from "@/features/testimonials/components/Testimonials";
import Footer from "@/features/footer/components/footer";

const BossGymLanding = () => {
  const { heroY, heroOpacity, heroScale, containerRef, heroRef } = useScrollAnimation();

  return (
    <div ref={containerRef} className="relative bg-black text-white overflow-hidden">
      <style jsx global>{`
        .boss-text {
          background: linear-gradient(
            135deg, 
            #3a3a3a 0%, 
            #5a5a5a 20%, 
            #ffffff 45%, 
            #ffffff 55%, 
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
            <h2 className="anton-font text-4xl md:text-6xl text-primary mb-4">
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
              className="anton-font text-xl px-8 py-6 bg-primary hover:bg-primary/90 text-black group"
            >
              START YOUR JOURNEY
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="anton-font text-xl px-8 py-6 border-2 border-white text-black hover:bg-white hover:text-black"
            >
              <Play className="mr-2" />
              WATCH INTRO
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
                <div className="anton-font text-4xl md:text-5xl text-primary mb-2">
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

      {/* Testimonials Section */}
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
            <span className="text-primary">THE BOSS?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Start your transformation today with a free trial
          </p>
          <Button
            size="lg"
            className="anton-font text-2xl px-12 py-8 bg-primary hover:bg-primary/90 text-black"
          >
            GET STARTED NOW
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BossGymLanding;