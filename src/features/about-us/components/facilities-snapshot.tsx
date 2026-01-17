import { Dumbbell } from "lucide-react";
import { motion } from "framer-motion";

// Facilities Snapshot
const FacilitiesSnapshot = () => {
    return (
        <section className="relative py-32 px-4 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="anton-font text-4xl md:text-7xl mb-20 text-center"
                >
                    OUR <span className="gold-text">FACILITIES</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "Strength Zone", desc: "Olympic platforms & premium equipment" },
                        { title: "Cardio Theater", desc: "State-of-the-art machines with entertainment" },
                        { title: "Functional Area", desc: "Battle ropes, sleds, and agility training" },
                        { title: "Recovery Lounge", desc: "Massage chairs, sauna, and cold plunge" },
                        { title: "Group Studio", desc: "High-energy classes and community workouts" },
                        { title: "Nutrition Bar", desc: "Fresh smoothies, supplements, and fuel" }
                    ].map((facility, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="relative aspect-4/3 bg-black border border-zinc-800 hover:border-[#d4af37] transition-all duration-300 overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Dumbbell className="w-20 h-20 text-zinc-900 group-hover:text-zinc-800 transition-colors" />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                <h3 className="anton-font text-2xl mb-2 group-hover:gold-text transition-all duration-300">
                                    {facility.title}
                                </h3>
                                <p className="text-sm text-gray-400">{facility.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FacilitiesSnapshot