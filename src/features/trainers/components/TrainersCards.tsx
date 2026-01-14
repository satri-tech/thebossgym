'use client';

import { motion } from 'framer-motion';
import { TRAINERS } from '../constants/trainers.constants';
import { Award, Dumbbell, Heart } from 'lucide-react';

export function TrainersCards() {
  return (
    <section className="relative py-32 md:py-20 px-6 bg-black overflow-hidden">
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

          <h2 className="anton-font text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none">
            <span className="text-white">OUR EXPERT </span>
            <span className="gold-text">TRAINERS</span>
          </h2>

          <p className="text-zinc-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Meet the certified professionals who will guide you on your fitness journey
          </p>
        </motion.div>

        {/* Trainer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {TRAINERS.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-primary/50 transition-all duration-300">
                {/* Image */}
                <div className="relative aspect-3/4 overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

                  {/* Experience Badge */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-primary/50 rounded-lg px-3 py-1.5">
                    <span className="text-primary text-xs font-bold">{trainer.experience}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="anton-font text-2xl text-white mb-1">{trainer.name}</h3>
                    <p className="text-primary text-sm font-medium">{trainer.title}</p>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed">{trainer.bio}</p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2">
                    {trainer.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: Award, label: 'Certified Professionals', value: '100%' },
            { icon: Dumbbell, label: 'Years Combined Experience', value: '60+' },
            { icon: Heart, label: 'Client Satisfaction', value: '98%' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
              <div className="anton-font text-4xl gold-text mb-2">{stat.value}</div>
              <div className="text-zinc-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
