
import { MISSION_VISION_VALUES } from "../constants/constants";
import { motion } from "framer-motion";

const MissionVisionValues = () => {
    return (
        <section className="relative py-32 px-4 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="anton-font text-5xl md:text-6xl mb-20 text-center"
                >
                    MISSION, VISION & <span className="gold-text">VALUES</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {MISSION_VISION_VALUES.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="group relative p-8 bg-black border border-zinc-800 hover:border-[#d4af37] transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10">
                                <div className="mb-6 inline-block p-4 bg-zinc-900 group-hover:bg-[#d4af37]/10 transition-colors duration-300">
                                    <value.icon className="w-10 h-10 text-[#d4af37]" />
                                </div>

                                <h3 className="anton-font text-3xl mb-4 group-hover:gold-text transition-all duration-300">
                                    {value.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default MissionVisionValues

