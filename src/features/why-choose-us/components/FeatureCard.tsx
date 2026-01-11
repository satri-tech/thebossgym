'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function FeatureCard({ feature, index }: { feature: FeatureCardProps; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
}
