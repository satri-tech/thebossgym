'use client';

import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { TRAINERS } from '../constants/trainers.constants';

export function MinimalTrainers() {
  return (
    <section className="relative py-20 md:py-13 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-6 max-w-4xl mx-auto mb-20"
        >
          <h1 className="anton-font text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none">
            <span className="text-white">MEET OUR </span>
            <span className="gold-text">TRAINERS</span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Expert guidance makes all the difference. Our certified trainers bring years of experience,
            personalized attention, and proven strategies to accelerate your fitness journey.
          </p>
        </motion.div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {TRAINERS.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {/* Image */}
              <motion.div
                className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Content */}
              <div className="space-y-2">
                {/* Experience */}
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
                  {trainer.experience}
                </p>

                {/* Name */}
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {trainer.name}
                </h2>

                {/* Position */}
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {trainer.title}
                </p>

                {/* Social Links */}
                {trainer.social && (
                  <div className="flex gap-3 pt-1">
                    {trainer.social.instagram && (
                      <motion.a
                        href={trainer.social.instagram}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="text-zinc-500 hover:text-white transition-colors"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </motion.a>
                    )}
                    {trainer.social.twitter && (
                      <motion.a
                        href={trainer.social.twitter}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="text-zinc-500 hover:text-white transition-colors"
                      >
                        <Twitter className="w-3.5 h-3.5" />
                      </motion.a>
                    )}
                    {trainer.social.linkedin && (
                      <motion.a
                        href={trainer.social.linkedin}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="text-zinc-500 hover:text-white transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </motion.a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
