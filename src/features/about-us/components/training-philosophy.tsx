import { motion } from "framer-motion";
import { Heart, Dumbbell, TrendingUp } from "lucide-react";

// Training Philosophy
const TrainingPhilosophy = () => {
    return (
        <section className="relative py-32 px-4 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Quote */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <blockquote className="relative z-10 text-3xl md:text-5xl anton-font leading-tight mb-8">
                            <span className="gold-text">STRENGTH</span> ISN'T JUST PHYSICAL. IT'S MENTAL, EMOTIONAL, AND SPIRITUAL.
                        </blockquote>
                        <div className="h-1 w-24 bg-[#d4af37]" />
                    </motion.div>

                    {/* Right: Philosophy Points */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {[
                            {
                                icon: Dumbbell,
                                title: "Science-Backed Training",
                                description: "Every program is built on proven methodologies and the latest sports science research."
                            },
                            {
                                icon: TrendingUp,
                                title: "Progressive Overload",
                                description: "We believe in consistent, measurable progress. Small wins compound into massive transformations."
                            },
                            {
                                icon: Heart,
                                title: "Holistic Wellness",
                                description: "True fitness encompasses nutrition, recovery, mindset, and community support."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex gap-6"
                            >
                                <div className="shrink-0 w-16 h-16 bg-black border border-[#d4af37] flex items-center justify-center">
                                    <item.icon className="w-8 h-8 text-[#d4af37]" />
                                </div>
                                <div>
                                    <h3 className="anton-font text-2xl mb-2">{item.title}</h3>
                                    <p className="text-gray-400">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TrainingPhilosophy