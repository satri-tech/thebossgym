'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { ContactInfo as ContactInfoType } from '../types';
import {
    getPhoneDisplay,
    getPhoneLabelDisplay,
    getAddressDisplay,
    getAddressLabelDisplay,
    getEmailDisplay,
    getEmailLabelDisplay,
} from '../utils';

interface ContactInfoProps {
    contactInfo: ContactInfoType | null;
}

export const ContactInfo = ({ contactInfo }: ContactInfoProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-10"
        >
            {/* Call Us */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h3 className="text-xl font-bold text-white mb-3">Call Us</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">{getPhoneLabelDisplay(contactInfo)}</p>
                <a href={`tel:${getPhoneDisplay(contactInfo)}`} className="flex items-center gap-3 text-[#d4af37] hover:text-[#ffd700] transition-colors group">
                    <Phone className="w-5 h-5" />
                    <span className="font-semibold">{getPhoneDisplay(contactInfo)}</span>
                </a>
            </motion.div>

            {/* Visit Us */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <h3 className="text-xl font-bold text-white mb-3">Visit Us</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">{getAddressLabelDisplay(contactInfo)}</p>
                <a href="#map" className="flex items-center gap-3 text-[#d4af37] hover:text-[#ffd700] transition-colors group">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">{getAddressDisplay(contactInfo)}</span>
                </a>
            </motion.div>

            {/* Email Us */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <h3 className="text-xl font-bold text-white mb-3">Email Us</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">{getEmailLabelDisplay(contactInfo)}</p>
                <a href={`mailto:${getEmailDisplay(contactInfo)}`} className="flex items-center gap-3 text-[#d4af37] hover:text-[#ffd700] transition-colors group">
                    <Mail className="w-5 h-5" />
                    <span className="font-semibold">{getEmailDisplay(contactInfo)}</span>
                </a>
            </motion.div>
        </motion.div>
    );
};
