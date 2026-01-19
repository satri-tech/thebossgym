import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/core/ui/button";
import Image from "next/image";
import AboutUsImage from '../../../../public/gym/about-us.jpg';
import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeroSectionProps {
    theme?: 'dark' | 'transparent';
    cta_text?: string
    cta_classname?: string;
}

const HeroSection = ({ theme = 'dark', cta_text = "START YOUR JOURNEY", cta_classname = "px-12 py-6" }: HeroSectionProps) => {
    const isDark = theme === 'dark';

    return (
        <section className={`relative min-h-screen overflow-hidden flex items-center ${isDark ? 'bg-black' : 'bg-transparent'}`}>
            {/* Background with Parallax - Only show for dark theme */}
            {isDark && (
                <div className="absolute inset-0">
                    {/* Dark gradient background */}
                    <div className="absolute inset-0 bg-black" />

                    {/* Subtle gold glow effects */}
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#d4af37] opacity-15 rounded-full blur-[150px]" />
                        <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-[#d4af37] opacity-15 rounded-full blur-[150px]" />
                    </div>

                    {/* Gradient overlay for smooth transition */}
                    <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/80 to-zinc-950" />
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-36">
                <div className="max-w-7xl mx-auto flex gap-10">
                    <div className="flex w-7/12 flex-col">

                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-8"
                        >
                            <div className="inline-flex items-center gap-4 px-6 py-3 border border-[#d4af37]/30 bg-black/40 backdrop-blur-sm">
                                <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
                                <span className="text-[#d4af37] text-xs md:text-sm tracking-[0.3em] font-medium uppercase">
                                    About The Boss Gym
                                </span>
                            </div>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="anton-font text-5xl md:text-6xl lg:text-7xl leading-[1.3] mb-6 max-w-5xl"
                        >
                            WHERE CHAMPIONS
                            <br />
                            ARE <span className="gold-text">FORGED</span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className={`text-xl md:text-lg leading-relaxed mb-12 max-w-3xl text-secondary-foreground text-justify `}
                        >
                            Located near Prithivi Chowk, Pokhara, our gym is more than just a place to work out,
                            it's a community where fitness meets lifestyle. We offer state-of-the-art equipment,
                            expert trainers, and personalized programs designed for every level{isDark ? ', from beginners to athletes. Our goal is to help you build strength, stay healthy, and transform your life.' : '.'}
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <Link href={cta_text === "START YOUR JOURNEY" ? "/contact" : '/about-us'}>
                                    <Button
                                        size="lg"
                                        className={cn(`anton-font text-lg  gold-bg text-black hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300 tracking-wide group`, cta_classname)}
                                    >
                                        {cta_text}
                                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform text-black " size={18} />
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                    <div className="w-5/12 h-130">
                        <Image height={1000} width={10000} alt="about us image" src={AboutUsImage} className="h-full w-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection;
