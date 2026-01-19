'use client';

import { motion } from 'framer-motion';

const ProgramsPage = () => {
    return (
        <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-8">
            {/* Content */}
            <div className="text-center max-w-6xl">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-7xl md:text-8xl font-anton tracking-wide lg:text-8xl font-bold  leading-none mb-4">
                        <span className="text-white">COMING </span>
                        <span className="gold-text">SOON</span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-lg md:text-base text-secondary-foreground leading-relaxed"
                >
                    Our training programs are currently under development.
                </motion.p>
            </div>
        </div>
    );
};

export default ProgramsPage;