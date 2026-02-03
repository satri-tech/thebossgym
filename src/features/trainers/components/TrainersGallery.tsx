'use client';

import { motion } from 'framer-motion';
import { Button } from '@/core/components/ui/button';
import Link from 'next/link';
import { TrainerImages } from '../../../../public/trainers';
import ExpandableGallery from '@/core/components/expandable-gallery';

export function TrainersGallery() {
  return (
    <section className="relative py-20 md:py-32 px-6 bg-black">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(#84fd3e 1px, transparent 1px), linear-gradient(90deg, #84fd3e 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
        />
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
            <span className="text-white">MEET OUR </span>
            <span className="gold-text">TRAINERS</span>
          </h2>

          <p className="text-zinc-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Expert coaches dedicated to helping you achieve your fitness goals
          </p>
        </motion.div>

        {/* Gallery */}
        <div className="mb-12 w-full flex justify-center">
          <ExpandableGallery images={TrainerImages} className="w-11/12 max-w-7xl" />
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Link href="/trainers">
            <Button className="anton-font text-lg tracking-wide px-8 py-6 bg-black border-2 border-primary hover:bg-primary/10 transition-all">
              <span className="gold-text">VIEW ALL TRAINERS</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
