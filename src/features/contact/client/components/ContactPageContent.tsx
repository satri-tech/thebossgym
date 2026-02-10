'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useContactInfo, useMessageCategories, useContactForm } from '../hooks';
import { MAP_CONFIG } from '../constants/faq';
import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';
import { MapSection } from './MapSection';
import { FAQSection } from './FAQSection';

export const ContactPageContent = () => {
    const searchParams = useSearchParams();
    const { contactInfo } = useContactInfo();
    const { categories } = useMessageCategories();
    const { formData, isSubmitting, handleChange, handleSubmit } = useContactForm(categories);

    // Handle search params for pre-filled message
    useEffect(() => {
        const message = searchParams.get('message');
        if (message) {
            handleChange('message', message);
        }
    }, [searchParams]);

    return (
        <div className="relative min-h-screen flex justify-center bg-black text-white">
            {/* Main Container */}
            <div className="relative z-10 max-w-11/12 px-8 md:px-16 lg:px-20 py-24 md:py-32">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none text-white mb-4">
                        Get in <span className="gold-text">touch</span>
                    </h1>
                </motion.div>

                {/* Two Column Grid */}
                <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-24 mb-24">
                    {/* Left Panel - Contact Form */}
                    <ContactForm
                        formData={formData}
                        categories={categories}
                        isSubmitting={isSubmitting}
                        onSubmit={handleSubmit}
                        onChange={handleChange}
                    />

                    {/* Right Panel - Contact Info */}
                    <ContactInfo contactInfo={contactInfo} />
                </div>

                {/* Map Section */}
                <MapSection
                    latitude={MAP_CONFIG.latitude}
                    longitude={MAP_CONFIG.longitude}
                    zoom={MAP_CONFIG.zoom}
                />

                {/* FAQ Section */}
                <FAQSection />
            </div>
        </div>
    );
};
