import { motion } from "framer-motion";
import { Users } from "lucide-react";

// Founder Message
const FounderMessage = () => {
    return (
        <section className="relative py-32 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                >
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-3/4 bg-zinc-900 overflow-hidden">
                            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Users className="w-32 h-32 text-zinc-800" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="anton-font text-6xl md:text-7xl mb-8">
                            FROM THE <span className="gold-text">FOUNDER</span>
                        </h2>

                        <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                            <p className="text-justify">
                                "When I started The Boss Gym, I had one goal: to create a place where people don't just work out, they transform. A place where every person who walks through our doors feels empowered, supported, and ready to conquer their goals."
                            </p>

                            <p className="text-justify">
                                "Fitness isn't just about physical strength. It's about mental resilience, discipline, and the courage to push beyond your limits. That's what we cultivate here every single day."
                            </p>

                            <p className="text-justify">
                                "Thank you for being part of our journey. Together, we're not just building bodies, we're building champions."
                            </p>
                        </div>

                        <div className="mt-12">
                            <div className="anton-font text-4xl gold-text mb-2" >
                                Dhan Bahadur Gurung
                            </div>
                            <div className="text-gray-500 text-sm tracking-wider">
                                FOUNDER & CEO
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};


export default FounderMessage