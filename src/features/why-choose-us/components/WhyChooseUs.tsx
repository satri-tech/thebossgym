'use client';

import { motion } from 'framer-motion';
import { Zap, Trophy, Users } from 'lucide-react';
import { FeatureCard, FeatureCardProps } from './FeatureCard';

const FEATURES: FeatureCardProps[] = [
  {
    icon: Zap,
    title: 'INTENSE TRAINING',
    description: 'Push your limits with our high-intensity workout programs designed by experts.',
    index: 0,
  },
  {
    icon: Trophy,
    title: 'PROVEN RESULTS',
    description: 'Join thousands who have transformed their bodies and achieved their goals.',
    index: 1,
  },
  {
    icon: Users,
    title: 'COMMUNITY',
    description: 'Train with like-minded individuals in a motivating and supportive environment.',
    index: 2,
  },
];

export function WhyChooseUs() {
  return (
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
          {FEATURES.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
