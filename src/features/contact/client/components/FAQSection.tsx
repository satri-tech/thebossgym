'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useFAQ } from '../hooks';
import { Loader2 } from 'lucide-react';

export const FAQSection = () => {
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
    const { faqs, isLoading } = useFAQ();

    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="grid lg:grid-cols-[0.6fr_1fr] gap-16 lg:gap-24"
            >
                <div>
                    <p className="text-[#9CA3AF] text-xs uppercase tracking-wider mb-4">FAQ</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">Frequently asked <span className="gold-text">questions</span></h2>
                </div>
                <div className="flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid lg:grid-cols-[0.6fr_1fr] gap-16 lg:gap-24"
        >
            {/* FAQ Title */}
            <div>
                <p className="text-[#9CA3AF] text-xs uppercase tracking-wider mb-4">FAQ</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">Frequently asked <span className="gold-text">questions</span></h2>
            </div>

            {/* FAQ Items */}
            <div className="space-y-6">
                {faqs.length === 0 ? (
                    <p className="text-[#9CA3AF] text-sm">No FAQs available at the moment.</p>
                ) : (
                    faqs.map((faq, index) => (
                        <motion.div
                            key={faq.id || `faq-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                            className="border-b border-zinc-800"
                        >
                            <button
                                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                                className="w-full flex items-center justify-between text-left group py-6"
                            >
                                <h3 className="text-white font-semibold text-base group-hover:text-[#d4af37] transition-colors">{faq.question}</h3>
                                <motion.div
                                    className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center shrink-0 ml-4"
                                    animate={{ rotate: expandedFAQ === index ? 45 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="text-[#d4af37] text-lg">+</span>
                                </motion.div>
                            </button>

                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                    height: expandedFAQ === index ? 'auto' : 0,
                                    opacity: expandedFAQ === index ? 1 : 0
                                }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <p className="text-[#9CA3AF] text-sm leading-relaxed pb-6">{faq.answer}</p>
                            </motion.div>
                        </motion.div>
                    ))
                )}
            </div>
        </motion.div>
    );
};
