'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { useCountUp } from '@/core/lib/useCountUp';
import { Dumbbell, Users, Trophy, Zap } from 'lucide-react';
import Image from 'next/image';

interface StorySection {
  title: string;
  description: string;
  stat?: {
    value: number;
    suffix: string;
    label: string;
  };
  image: string;
  imageAlt: string;
  icon: React.ReactNode;
}

const STORY_SECTIONS: StorySection[] = [
  {
    title: 'Elite Training Programs',
    description:
      'Experience world-class training designed by certified professionals. Our science-backed programs are tailored to push your limits while ensuring sustainable progress and injury prevention.',
    stat: {
      value: 500,
      suffix: '+',
      label: 'Active Members',
    },
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    imageAlt: 'Athlete training',
    icon: <Dumbbell className="w-8 h-8" />,
  },
  {
    title: 'State-of-the-Art Facilities',
    description:
      'Train with the latest equipment and technology in our premium facilities. From cutting-edge cardio machines to specialized strength training zones, we provide everything you need to succeed.',
    stat: {
      value: 10,
      suffix: '+',
      label: 'Years Experience',
    },
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=600&fit=crop',
    imageAlt: 'Modern gym equipment',
    icon: <Zap className="w-8 h-8" />,
  },
  {
    title: 'Expert Coaching & Support',
    description:
      'Work with certified trainers who are passionate about your success. Get personalized guidance, nutrition advice, and continuous support to help you achieve your fitness goals faster.',
    stat: {
      value: 50,
      suffix: '+',
      label: 'Expert Trainers',
    },
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
    imageAlt: 'Personal training session',
    icon: <Users className="w-8 h-8" />,
  },
  {
    title: 'Proven Results & Community',
    description:
      'Join a community of motivated individuals who inspire and support each other. Our members consistently achieve their goals, from weight loss to muscle gain, and you can too.',
    stat: {
      value: 95,
      suffix: '%',
      label: 'Success Rate',
    },
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
    imageAlt: 'Group fitness class',
    icon: <Trophy className="w-8 h-8" />,
  },
];

function StatCounter({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) {
  const count = useCountUp(inView ? value : 0, 2000);

  return (
    <div className="relative inline-block">
      <div className="flex items-baseline gap-3">
        <span className="text-6xl md:text-7xl lg:text-8xl font-bold gold-text anton-font leading-none">
          {count}
          {suffix}
        </span>
      </div>
      <span className="block text-zinc-500 text-sm md:text-base uppercase tracking-wider mt-2 font-medium">
        {label}
      </span>
    </div>
  );
}

function StorySection({ section, index }: { section: StorySection; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Enhanced parallax with different speeds for depth
  const imageY = useTransform(smoothProgress, [0, 1], [100, -100]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.6, 0.3, 0.6]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1.2, 1, 1.2]);

  const isReversed = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-150px' }}
      className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center py-20 md:py-32"
    >
      {/* Decorative Background Element */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className={`absolute ${isReversed ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-primary/5 blur-[120px] rounded-full`} />
      </motion.div>

      {/* Text Content */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: isReversed ? 80 : -80 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        className={`relative z-10 space-y-8 ${isReversed ? 'lg:order-2 lg:pl-8' : 'lg:pr-8'}`}
      >
        {/* Icon Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black border-2 border-primary text-primary"
        >
          {section.icon}
        </motion.div>

        <div className="space-y-6">
          <h3 className="anton-font text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95]">
            {section.title}
          </h3>

          <div className="h-1 w-20 gold-bg rounded-full" />

          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl">
            {section.description}
          </p>
        </div>

        {section.stat && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.6 } },
            }}
            className="pt-4"
          >
            <StatCounter
              value={section.stat.value}
              suffix={section.stat.suffix}
              label={section.stat.label}
              inView={true}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Image with Enhanced Parallax */}
      <motion.div
        ref={imageContainerRef}
        variants={{
          hidden: { opacity: 0, x: isReversed ? -80 : 80 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
          },
        }}
        className={`relative ${isReversed ? 'lg:order-1' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-4/3 overflow-hidden">
          {/* Parallax Image Container */}
          <motion.div
            style={{ y: imageY, scale }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={section.image}
              alt={section.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          {/* Animated Overlay */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-linear-to-br from-black/60 via-black/30 to-transparent"
          />

        </div>

        {/* Floating Number Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          className={`absolute ${isReversed ? 'bottom-0 left-0 -translate-x-6 translate-y-6' : 'top-0 right-0 translate-x-6 -translate-y-6'} w-20 h-20 rounded-2xl bg-black border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/20`}
        >
          <span className="anton-font text-3xl gold-text">0{index + 1}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-6 bg-black overflow-hidden">
      {/* Animated Background Grid */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-[0.03]"
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#84fd3e 1px, transparent 1px), linear-gradient(90deg, #84fd3e 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }} />
      </motion.div>

      {/* Large Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.03 }}
          viewport={{ once: true }}
          className="anton-font text-[20vw] text-white select-none whitespace-nowrap"
        >
          THE BOSS
        </motion.span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-6 max-w-4xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-32 gold-bg mx-auto rounded-full"
          />

          <h2 className="anton-font text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none">
            <span className="gold-text">WHY CHOOSE US</span>
          </h2>

          <p className="text-zinc-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Discover what makes us the premier choice for fitness excellence
          </p>
        </motion.div>

        {/* Story Sections */}
        <div className="space-y-0">
          {STORY_SECTIONS.map((section, index) => (
            <StorySection key={index} section={section} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
