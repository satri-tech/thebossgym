import { useState } from 'react';
import { Testimonial } from '../types/types';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, y: -8 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 h-full flex flex-col"
        >
            {/* Hover Glow Effect */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent rounded-2xl pointer-events-none"
            />

            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-primary/50">
                <Quote className="w-12 h-12" fill="currentColor" />
            </div>

            {/* Profile Section */}
            <div className="relative flex items-center gap-4 mb-6">
                <div className="relative">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/50"
                    >
                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                </div>

                <div className="flex-1">
                    <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-zinc-500 text-sm">{testimonial.role}</p>
                </div>
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-primary fill-primary' : 'text-zinc-700'
                            }`}
                    />
                ))}
            </div>

            {/* Quote */}
            <p className="text-zinc-300 text-base leading-relaxed flex-1 relative z-10">
                "{testimonial.quote}"
            </p>
        </motion.div>
    )
}

export default TestimonialCard