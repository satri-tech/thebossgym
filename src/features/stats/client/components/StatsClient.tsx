"use client";

import StatsAnimated from "./StatsAnimated";
import { Stat } from "../../types/types";

interface StatsClientProps {
  stats: Stat[];
}

export default function StatsClient({ stats }: StatsClientProps) {
  if (!stats.length) {
    return null;
  }

  return (
    <StatsAnimated className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
      {stats.map((stat) => (
        <StatsAnimated.Title key={stat.id}>
          <div className="anton-font text-4xl md:text-5xl gold-text mb-2">
            {stat.value}
          </div>
          <div className="text-sm md:text-base text-gray-400">
            {stat.label}
          </div>
        </StatsAnimated.Title>
      ))}
    </StatsAnimated>
  );
}
