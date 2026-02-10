'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/core/components/ui/select";
import { FormData, MessageCategory } from '../types';

interface ContactFormProps {
    formData: FormData;
    categories: MessageCategory[];
    isSubmitting: boolean;
    onSubmit: (e: React.FormEvent) => Promise<void>;
    onChange: (field: keyof FormData, value: string) => void;
}

export const ContactForm = ({
    formData,
    categories,
    isSubmitting,
    onSubmit,
    onChange,
}: ContactFormProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
        >
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-3">Send a Message</h2>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <label className="block text-[#9CA3AF] text-xs uppercase tracking-wider mb-2">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => onChange('name', e.target.value)}
                            className="w-full bg-transparent border-b border-zinc-800 py-3 text-white placeholder-zinc-700 focus:border-[#d4af37] focus:outline-none transition-colors text-sm"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label className="block text-[#9CA3AF] text-xs uppercase tracking-wider mb-2">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => onChange('email', e.target.value)}
                            className="w-full bg-transparent border-b border-zinc-800 py-3 text-white placeholder-zinc-700 focus:border-[#d4af37] focus:outline-none transition-colors text-sm"
                        />
                    </motion.div>
                </div>

                {/* Interested In and Phone Row */}
                <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <label className="block text-[#9CA3AF] text-xs uppercase tracking-wider mb-2">Interested In</label>
                        <Select value={formData.interestedIn} onValueChange={(value) => onChange('interestedIn', value)}>
                            <SelectTrigger className="w-full bg-transparent border-b border-zinc-800 rounded-none py-3 text-white focus:border-[#d4af37] focus:outline-none transition-colors text-sm">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(cat => (
                                    <SelectItem key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <label className="block text-[#9CA3AF] text-xs uppercase tracking-wider mb-2">Phone Number</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => onChange('phone', e.target.value)}
                            className="w-full bg-transparent border-b border-zinc-800 py-3 text-white placeholder-zinc-700 focus:border-[#d4af37] focus:outline-none transition-colors text-sm"
                        />
                    </motion.div>
                </div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <label className="block text-[#9CA3AF] text-xs uppercase tracking-wider mb-2">Message</label>
                    <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => onChange('message', e.target.value)}
                        className="w-full bg-transparent border-b border-zinc-800 py-3 text-white placeholder-zinc-700 focus:border-[#d4af37] focus:outline-none transition-colors resize-none text-sm leading-relaxed"
                    />
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="gold-bg font-anton flex items-center gap-2 ml-auto cursor-pointer text-black px-8 py-2 rounded-sm font-medium text-base uppercase tracking-wider hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'SENDING...' : 'SUBMIT'} <ArrowRight size={19} />
                </motion.button>
            </form>
        </motion.div>
    );
};
