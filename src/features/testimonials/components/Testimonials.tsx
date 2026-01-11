'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/core/ui/button';
import { GOAL_FILTERS, TESTIMONIALS } from '../constants/constants';
import TestimonialCard from './testimonial-card';

export function Testimonials() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    const filteredTestimonials = activeFilter === 'all'
        ? TESTIMONIALS
        : TESTIMONIALS.filter(t => t.goal === activeFilter);

    // Auto-play carousel
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % Math.ceil(filteredTestimonials.length / 3));
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, filteredTestimonials.length]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + Math.ceil(filteredTestimonials.length / 3)) % Math.ceil(filteredTestimonials.length / 3));
        setIsAutoPlaying(false);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(filteredTestimonials.length / 3));
        setIsAutoPlaying(false);
    };

    return (
        <section ref={sectionRef} className="relative py-32 md:py-40 px-6 bg-black overflow-hidden">
            {/* Animated Background */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 opacity-[0.03]"
            >
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #84fd3e 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </motion.div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

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
                        className="h-1 w-32 bg-primary mx-auto rounded-full"
                    />

                    <h2 className="anton-font text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-none">
                        SUCCESS STORIES
                    </h2>

                    <p className="text-zinc-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        Real transformations from real people. Join our community of champions.
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {GOAL_FILTERS.map((filter) => (
                        <Button
                            key={filter.value}
                            onClick={() => {
                                setActiveFilter(filter.value);
                                setCurrentIndex(0);
                            }}
                            variant={activeFilter === filter.value ? 'default' : 'outline'}
                            className={`
                px-6 py-2 rounded-full transition-all duration-300
                ${activeFilter === filter.value
                                    ? 'bg-primary text-black hover:bg-primary/90 hover:text-black'
                                    : 'bg-transparent border-zinc-700 text-zinc-400 hover:border-primary hover:text-white hover:bg-primary/10'
                                }
              `}
                        >
                            {filter.label}
                        </Button>
                    ))}
                </motion.div>

                {/* Desktop: Grid View */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filteredTestimonials.map((testimonial, index) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
                    ))}
                </div>

                {/* Mobile: Carousel View */}
                <div className="md:hidden relative mb-12">
                    <div className="overflow-hidden">
                        <motion.div
                            animate={{ x: `-${currentIndex * 100}%` }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="flex"
                        >
                            {filteredTestimonials.map((testimonial, index) => (
                                <div key={testimonial.id} className="w-full shrink-0 px-2">
                                    <TestimonialCard testimonial={testimonial} index={index} />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Carousel Controls */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <Button
                            onClick={handlePrev}
                            variant="outline"
                            size="icon"
                            className="rounded-full border-zinc-700 text-zinc-400 hover:border-primary hover:text-primary"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>

                        <div className="flex gap-2">
                            {filteredTestimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentIndex(index);
                                        setIsAutoPlaying(false);
                                    }}
                                    className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-zinc-700'
                                        }`}
                                />
                            ))}
                        </div>

                        <Button
                            onClick={handleNext}
                            variant="outline"
                            size="icon"
                            className="rounded-full border-zinc-700 text-zinc-400 hover:border-primary hover:text-primary"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

            </div>
        </section>
    );
}
