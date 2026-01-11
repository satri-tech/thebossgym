"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Dumbbell, Zap, Trophy, Users, ArrowRight, Play, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/features/navbar/components/NavBar";

const BossGymLanding = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heroY = useTransform(smoothProgress, [0, 0.3], [0, 200]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black text-white overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        
        .anton-font {
          font-family: 'Anton', sans-serif;
        }

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

      <Navbar />
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
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="anton-font text-6xl md:text-8xl text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            WHY CHOOSE US
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "INTENSE TRAINING",
                description: "Push your limits with our high-intensity workout programs designed by experts.",
              },
              {
                icon: Trophy,
                title: "PROVEN RESULTS",
                description: "Join thousands who have transformed their bodies and achieved their goals.",
              },
              {
                icon: Users,
                title: "COMMUNITY",
                description: "Train with like-minded individuals in a motivating and supportive environment.",
              },
            ].map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

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
      <footer className="relative bg-black border-t border-zinc-900 pt-20 pb-10 px-6 overflow-hidden">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="anton-font text-[12rem] md:text-[18rem] text-zinc-900/30 select-none whitespace-nowrap tracking-tight">
            THEBOSS GYM
          </span>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
            {/* Brand & Tagline */}
            <div>
              <h3 className="anton-font text-2xl text-primary mb-3">THE BOSS GYM</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Transform. Dominate. Conquer.</p>
            </div>

            {/* Quick Links */}
            <div>
              <ul className="space-y-4">
                {["Home", "About Us", "Programs", "Trainers", "Membership", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-zinc-500 text-sm hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <ul className="space-y-4">
                {["Instagram", "Facebook", "LinkedIn", "Twitter", "YouTube"].map((social) => (
                  <li key={social}>
                    <a href="#" className="text-zinc-500 text-sm hover:text-primary transition-colors">
                      {social}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-zinc-500 text-sm">
                  <Mail className="w-4 h-4 text-zinc-600" />
                  <span>info@thebossgym.com</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-500 text-sm">
                  <Phone className="w-4 h-4 text-zinc-600" />
                  <span>+1 234 567 890</span>
                </div>
              </div>

              <div>
                <p className="text-zinc-300 text-sm mb-4">Join our newsletter</p>
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="bg-zinc-950 border border-zinc-800 rounded-md px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
                  />
                  <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-900 hover:text-white">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-zinc-900 pt-10 text-right">
            <p className="text-zinc-600 text-xs">
              © 2026 The Boss Gym. All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  feature,
  index,
}: {
  feature: { icon: any; title: string; description: string };
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <Card className="bg-zinc-900 border-zinc-800 p-8 hover:border-primary transition-all duration-300 group">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <feature.icon className="w-16 h-16 text-primary" />
        </motion.div>
        <h3 className="anton-font text-3xl mb-4 group-hover:text-primary transition-colors">
          {feature.title}
        </h3>
        <p className="text-gray-400 text-lg">{feature.description}</p>
      </Card>
    </motion.div>
  );
};

export default BossGymLanding;