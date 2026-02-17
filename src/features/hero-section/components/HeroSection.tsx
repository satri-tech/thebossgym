'use client';

import { Button } from "@/core/components/ui/button";
import StatsClient from "@/features/stats/client/components/StatsClient";
import { Stat } from "@/features/stats/types/types";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import HeroAnimated from "./HeroAnimated";

interface HeroSectionProps {
    stats: Stat[];
}

export default function HeroSection({ stats }: HeroSectionProps) {
    return (
        <HeroAnimated>
            <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
                <HeroAnimated.Title>
                    <h1 className="anton-font text-8xl md:text-[12rem] lg:text-[16rem] font-bold mb-6 leading-none boss-text">
                        THE BOSS
                    </h1>
                </HeroAnimated.Title>

                <HeroAnimated.Subtitle>
                    <h2 className="anton-font text-4xl md:text-6xl gold-text mb-4">GYM</h2>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
                        Transform Your Body. Dominate Your Goals. Become The Boss.
                    </p>
                </HeroAnimated.Subtitle>

                <HeroAnimated.Actions>
                    <Link href="/contact">
                        <Button
                            size="lg"
                            className="anton-font text-xl px-8 py-6 gold-bg text-black group transition-all tracking-wide"
                        >
                            START YOUR JOURNEY
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform text-black" />
                        </Button>
                    </Link>

                    <Button
                        size="lg"
                        variant="outline"
                        className="anton-font text-xl px-8 py-6 bg-transparent border-2 border-white/30 hover:border-primary hover:bg-transparent group transition-all"
                    >
                        <Play className="mr-2 text-white group-hover:text-primary transition-colors" fill="currentColor" />
                        <span className="text-white group-hover:gold-text transition-all">
                            WATCH INTRO
                        </span>
                    </Button>
                </HeroAnimated.Actions>

                <StatsClient stats={stats} />
            </div>
        </HeroAnimated>
    );
}
