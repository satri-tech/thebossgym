'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ContactMap = dynamic(() => import('@/core/components/contact-map'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
            <p className="text-zinc-600">Loading map...</p>
        </div>
    ),
});

interface MapSectionProps {
    latitude: number;
    longitude: number;
    zoom: number;
}

export const MapSection = ({ latitude, longitude, zoom }: MapSectionProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            id="map"
            className="mb-24"
        >
            <div className="relative w-full h-[400px] md:h-[500px] bg-zinc-950 overflow-hidden rounded-lg">
                <ContactMap
                    latitude={latitude}
                    longitude={longitude}
                    zoom={zoom}
                />
            </div>
        </motion.div>
    );
};
