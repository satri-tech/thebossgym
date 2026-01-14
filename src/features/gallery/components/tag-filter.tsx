'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TagFilterProps {
  tags: readonly string[];
  activeTag: string;
  onTagChange: (tag: string) => void;
}

export function TagFilter({ tags, activeTag, onTagChange }: TagFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {tags.map((tag) => {
        const isActive = activeTag === tag;

        return (
          <motion.button
            key={tag}
            onClick={() => onTagChange(tag)}
            className={cn(
              'relative px-6 py-2 rounded-full text-sm cursor-pointer font-semibold transition-all duration-300  tracking-wide',
              isActive
                ? 'gold-bg text-black'
                : 'border-2 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{tag}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
