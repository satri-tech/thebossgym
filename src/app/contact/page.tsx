'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/core/ui/select";

// Dynamically import the map component to avoid SSR issues
const ContactMap = dynamic(() => import('@/components/contact-map'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
            <p className="text-zinc-600">Loading map...</p>
        </div>
    ),
});

const ContactFormContent = () => {
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interestedIn: 'membership',
        message: '',
    });

    useEffect(() => {
        const plan = searchParams.get('plan');
        const message = searchParams.get('message');
        
        if (plan || message) {
            setFormData(prev => ({
                ...prev,
                interestedIn: 'membership',
                message: message || '',
            }));
        }
    }, [searchParams]);

    const faqItems = [
        { question: "What are your operating hours?", answer: "We're open Sunday to Friday from 6:00 AM to 9:00 PM, and weekends from 7:00 AM to 8:00 PM." },
        { question: "Do you offer personal training?", answer: "Yes, we have certified personal trainers available for one-on-one sessions." },
        { question: "What membership plans do you offer?", answer: "We offer monthly, quarterly, and annual membership plans with various benefits." },
        { question: "Is there a trial period available?", answer: "Yes, we offer a 2-day free trial for new members to experience our facilities." }
    ];

    return (
        <div className="relative min-h-screen flex justify-center bg-black text-white">
            {/* Main Container */}
            <div className="relative z-10 max-w-11/12  px-8 md:px-16 lg:px-20 py-24 md:py-32">
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
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-3">Send a Message</h2>
                            <p className="text-[#9CA3AF] text-sm leading-relaxed">
                                Fill out the form below and we'll get back to you as soon as possible.
                            </p>
                        </div>

                        <form className="space-y-6">
                            {/* Name and Email Row */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label className="block text-[#9CA3AF] text-xs uppercase tracking-wider mb-2">
                                        Name
                                    </label>
                            <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full bg-transparent border-b border-zinc-800 py-3 text-white placeholder-zinc-700 focus:border-[#d4af37] focus:outline-none transition-colors text-sm"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <label className="block text-[#9CA3AF] text-xs uppercase tracking-wider mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                                    <label className="block text-[#9CA3AF] text-xs uppercase tracking-wider mb-2">
                                        Interested In
                                    </label>
                                    <Select key={formData.interestedIn} value={formData.interestedIn} onValueChange={(value) => setFormData(prev => ({ ...prev, interestedIn: value }))}>
                                        <SelectTrigger className="w-full bg-transparent border-b border-zinc-800 rounded-none py-3 text-white focus:border-[#d4af37] focus:outline-none transition-colors text-sm">
                                            <SelectValue placeholder="Select an option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="membership">Membership</SelectItem>
                                            <SelectItem value="training">Personal Training</SelectItem>
                                            <SelectItem value="zumba">Zumba Classes</SelectItem>
                                            <SelectItem value="boxing">Boxing</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <label className="block text-[#9CA3AF] text-xs uppercase tracking-wider mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
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
                                <label className="block text-[#9CA3AF] text-xs uppercase tracking-wider mb-2">
                                    Message
                                </label>
                                <textarea
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
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
                                className="gold-bg  font-anton flex items-center gap-2 ml-auto cursor-pointer text-black
                                 px-8 py-2 rounded-sm font-medim text-base uppercase tracking-wider hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]
                                  transition-all duration-300"
                            >
                                SUMBIT <ArrowRight size={19} />
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Right Panel - Contact Info */}
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
                            <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">
                                Get in touch with our team for immediate assistance.
                            </p>
                            <a href="tel:+977XXXXXXXXX" className="flex items-center gap-3 text-[#d4af37] hover:text-[#ffd700] transition-colors group">
                                <Phone className="w-5 h-5" />
                                <span className="font-semibold">(977) 123-4567</span>
                            </a>
                        </motion.div>

                        {/* Visit Us */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h3 className="text-xl font-bold text-white mb-3">Visit Us</h3>
                            <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">
                                Come visit our state-of-the-art facility in Pokhara.
                            </p>
                            <a href="#map" className="flex items-center gap-3 text-[#d4af37] hover:text-[#ffd700] transition-colors group">
                                <MapPin className="w-5 h-5" />
                                <span className="font-semibold">Prithivi Chwok, Pokhara, Nepal</span>
                            </a>
                        </motion.div>

                        {/* Email Us */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <h3 className="text-xl font-bold text-white mb-3">Email Us</h3>
                            <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">
                                Send us an email and we'll respond within 24 hours.
                            </p>
                            <a href="mailto:info@gym.com" className="flex items-center gap-3 text-[#d4af37] hover:text-[#ffd700] transition-colors group">
                                <Mail className="w-5 h-5" />
                                <span className="font-semibold">info@gym.com</span>
                            </a>
                        </motion.div>

                        {/* Live Chat */}
                        {/* <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <h3 className="text-xl font-bold text-white mb-3">Live Chat</h3>
                            <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">
                                Chat with our support team in real-time.
                            </p>
                            <button className="flex items-center gap-3 text-[#d4af37] hover:text-[#ffd700] transition-colors group">
                                <MessageCircle className="w-5 h-5" />
                                <span className="font-semibold">Start Chat</span>
                            </button>
                        </motion.div> */}
                    </motion.div>
                </div>

                {/* Map Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    id="map"
                    className="mb-24"
                >
                    <div className="relative w-full h-[400px] md:h-[500px] bg-zinc-950 overflow-hidden rounded-lg">
                        <ContactMap
                            latitude={28.2086342}
                            longitude={83.9858103}
                            zoom={15}
                        />
                    </div>
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="grid lg:grid-cols-[0.6fr_1fr] gap-16 lg:gap-24"
                >
                    {/* FAQ Title */}
                    <div>
                        <p className="text-[#9CA3AF] text-xs uppercase tracking-wider mb-4">FAQ</p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            Frequently asked <span className="gold-text">questions</span>
                        </h2>
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-6">
                        {faqItems.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 + index * 0.1 }}
                                className="border-b border-zinc-800"
                            >
                                <button 
                                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                                    className="w-full flex items-center justify-between text-left group py-6"
                                >
                                    <h3 className="text-white font-semibold text-base group-hover:text-[#d4af37] transition-colors">
                                        {faq.question}
                                    </h3>
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
                                    <p className="text-[#9CA3AF] text-sm leading-relaxed pb-6">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const ContactPage = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><p className="text-white">Loading...</p></div>}>
            <ContactFormContent />
        </Suspense>
    );
};

export default ContactPage;