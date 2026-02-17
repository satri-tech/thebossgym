'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Activity,
  Dumbbell,
  Heart,
  Users,
  LucideIcon,
  Droplets,
  Lock,
  Music,
  Flame,
  Link as LinkIcon,
} from 'lucide-react';
import type { Service as ServiceType } from '../types/types';

interface ServiceWithIcon extends ServiceType {
  iconComponent: LucideIcon;
}

function ServiceCard({ service, index }: { service: ServiceWithIcon; index: number }) {
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const imageY = useTransform(smoothProgress, [0, 1], [80, -80]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.6, 0.3, 0.6]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1.15, 1, 1.15]);

  const isReversed = index % 2 === 1;

  return (
    <motion.div
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
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black gold-border-glow"
        >
          <service.iconComponent className="w-8 h-8 gold-icon" />
        </motion.div>

        <div className="space-y-6">
          <h3 className="anton-font text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[0.95]">
            {service.title}
          </h3>

          <div className="h-1 w-20 gold-bg rounded-full" />

          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl">
            {service.description}
          </p>

          {/* Features List */}
          <ul className="space-y-3 pt-4">
            {service.features.map((feature, idx) => (
              <motion.li
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                className="flex items-center gap-3 text-zinc-300"
              >
                <span className="w-1.5 h-1.5 rounded-full gold-bg shrink-0" />
                <span>{feature.feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
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
      >
        <div className="relative aspect-4/3 overflow-hidden">
          {/* Parallax Image Container */}
          <motion.div
            style={{ y: imageY, scale }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={`/api/images${service.image}`}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>

          {/* Animated Overlay */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-linear-to-br from-black/60 via-black/30 to-transparent"
          />
        </div>

      </motion.div>
    </motion.div>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [services, setServices] = useState<ServiceWithIcon[]>([]);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const getIconComponent = (iconName: string): LucideIcon => {
    const iconMap: Record<string, LucideIcon> = {
      activity: Activity,
      dumbbell: Dumbbell,
      heart: Heart,
      users: Users,
      droplets: Droplets,
      lock: Lock,
      music: Music,
      flame: Flame,
    };
    return iconMap[iconName?.toLowerCase()] || LinkIcon;
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();
        if (data.success) {
          const servicesWithIcons = data.data.map((service: ServiceType) => ({
            ...service,
            iconComponent: getIconComponent(service.icon),
          }));
          setServices(servicesWithIcons);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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


          <h2 className="anton-font text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none">
            <span className="text-white">OUR </span>
            <span className="gold-text">SERVICES</span>
          </h2>

          <p className="text-zinc-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Comprehensive fitness solutions designed to help you achieve your goals
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="space-y-0">
          {loading ? (
            <div className="text-center py-20 text-zinc-400">Loading services...</div>
          ) : (
            services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}