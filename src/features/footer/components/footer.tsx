
'use client';

import { Mail, Phone, Instagram, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import { useContactInfo } from "@/features/contact/client/hooks/useContactInfo";
import {
    FOOTER_BRAND,
    FOOTER_QUICK_LINKS,
    FOOTER_COPYRIGHT,
} from "../constants/constants";

const SOCIAL_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    instagram: Instagram,
    facebook: Facebook,
    linkedin: Linkedin,
    twitter: Twitter,
    youtube: Youtube,
};

const Footer = () => {
    const { contactInfo } = useContactInfo();

    const socialLinks = contactInfo ? [
        { key: 'instagram', label: 'Instagram', href: contactInfo.instagram },
        { key: 'facebook', label: 'Facebook', href: contactInfo.facebook },
        { key: 'linkedin', label: 'LinkedIn', href: contactInfo.linkedin },
        { key: 'twitter', label: 'Twitter', href: contactInfo.twitter },
        { key: 'youtube', label: 'YouTube', href: contactInfo.youtube },
    ].filter(social => social.href) : [];

    return (
        <footer className="relative bg-black border-t border-zinc-900 pt-20 pb-10 px-6">
            {/* Background Text - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none overflow-hidden pb-4">
                <span className="anton-font text-[10rem] md:text-[14rem] lg:text-[18rem] text-zinc-900/20 select-none whitespace-nowrap tracking-tight leading-none">
                    {FOOTER_BRAND.backgroundText}
                </span>
            </div>

            <div className="relative z-0 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
                    {/* Brand & Tagline */}
                    <div>
                        <h3 className="anton-font text-2xl gold-text mb-3">{FOOTER_BRAND.name}</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-6">{FOOTER_BRAND.tagline}</p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-2">
                            {socialLinks.map((social) => {
                                const IconComponent = SOCIAL_ICON_MAP[social.key];
                                return (
                                    <a
                                        key={social.key}
                                        href={social.href}
                                        aria-label={social.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative w-10 h-10 flex items-center justify-center bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-primary/50 hover:bg-zinc-900 transition-all duration-300"
                                    >
                                        <IconComponent className="w-4 h-4 text-zinc-500 group-hover:text-primary transition-colors duration-300" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {FOOTER_QUICK_LINKS.map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-zinc-500 text-sm hover:text-primary transition-colors inline-flex items-center gap-2 group">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-6">Get in Touch</h4>
                        <div className="space-y-4">
                            {contactInfo?.email && (
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="flex items-center gap-3 text-zinc-500 text-sm hover:text-primary transition-colors group"
                                >
                                    <div className="w-9 h-9 flex items-center justify-center bg-zinc-900/50 border border-zinc-800 rounded-lg group-hover:border-primary/50 transition-colors">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span>{contactInfo.email}</span>
                                </a>
                            )}
                            {contactInfo?.phone && (
                                <a
                                    href={`tel:${contactInfo.phone}`}
                                    className="flex items-center gap-3 text-zinc-500 text-sm hover:text-primary transition-colors group"
                                >
                                    <div className="w-9 h-9 flex items-center justify-center bg-zinc-900/50 border border-zinc-800 rounded-lg group-hover:border-primary/50 transition-colors">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <span>{contactInfo.phone}</span>
                                </a>
                            )}
                        </div>
                    </div>

                   
                </div>

                {/* Copyright */}
                <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-zinc-600 text-xs">
                        © {FOOTER_COPYRIGHT.year} {FOOTER_COPYRIGHT.company}. All rights reserved
                    </p>
                    <div className="flex items-center gap-6 text-xs text-zinc-600">
                        {FOOTER_COPYRIGHT.links.map((link) => (
                            <a key={link.label} href={link.href} className="hover:text-primary transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer