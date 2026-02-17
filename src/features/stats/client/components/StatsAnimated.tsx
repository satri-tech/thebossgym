"use client";

import { motion } from "framer-motion";

interface StatsAnimatedProps {
    children: React.ReactNode;
    className?: string; // optional string
}

export default function StatsAnimated({ children, className }: StatsAnimatedProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={className} // use the prop correctly
        >
            {children}
        </motion.div>
    );
}


StatsAnimated.Title = function ({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-center"
        >
            {children}
        </motion.div>
    );
};