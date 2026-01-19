'use client';

import { motion } from 'framer-motion';
import { TRAINERS, TRAINER_IMAGES } from '../constants/trainers.constants';
import { Award, Dumbbell, Heart } from 'lucide-react';
import ExpandableGallery from '@/components/expandable-gallery';

export function Trainers() {
  return (
    <section className="relative py-20 md:py-32 px-6 bg-black overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <ExpandableGallery images={TRAINER_IMAGES} className="w-full" />
        </motion.div>

        {/* Trainer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
          {TRAINERS.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              {/* Card Container */}
              <div className="relative h-full bg-gradient-to-br from-zinc-900/80 to-black rounded-3xl overflow-hidden border border-zinc-800/50 group-hover:border-[#d4af37]/30 transition-all duration-500">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4af37] rounded-full blur-[100px] opacity-20" />
                </div>

                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  {/* Experience Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="absolute top-6 right-6"
                  >
                    <div className="bg-black/90 backdrop-blur-md border border-[#d4af37]/50 rounded-xl px-4 py-2">
                      <span className="gold-text text-xs font-bold tracking-wide">{trainer.experience}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative p-8 space-y-5">
                  {/* Name & Title */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {trainer.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-[2px] gold-bg" />
                      <p className="gold-text text-sm font-semibold tracking-wide uppercase">
                        {trainer.title}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                    {trainer.bio}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {trainer.specialties.map((specialty, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + idx * 0.05 }}
                        className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800/80 text-zinc-300 border border-zinc-700/50 hover:border-[#d4af37]/50 transition-colors"
                      >
                        {specialty}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: Award, label: 'Certified Professionals', value: '100%' },
            { icon: Dumbbell, label: 'Years Combined Experience', value: '60+' },
            { icon: Heart, label: 'Client Satisfaction', value: '98%' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -4 }}
              className="relative group/stat"
            >
              <div className="relative text-center p-10 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-black border border-zinc-800/50 group-hover/stat:border-[#d4af37]/30 transition-all duration-300 overflow-hidden">
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-[80px] opacity-10" />
                </div>

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <stat.icon className="w-12 h-12 mx-auto mb-5 gold-icon" />
                  </motion.div>
                  <div className="anton-font text-5xl gold-text mb-3">{stat.value}</div>
                  <div className="text-zinc-400 text-sm font-medium">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
