"use client";

import { motion } from "framer-motion";
import { Button } from "@/core/components/ui/button";
import { navLinks } from "../constants/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
    const pathname = usePathname();
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="shrink-0"
                    >
                        <Image
                            src="/logo.png"
                            alt="logo"
                            height={40}
                            width={80}
                            quality={100}
                            priority
                            className="object-contain h-12 w-auto"
                        />
                        {/* <span className="anton-font text-2xl font-bold gold-text">
                            BOSS
                        </span> */}
                    </motion.div>
                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, i) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link key={i} href={link.href}>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="relative group inline-block"
                                    >
                                        <span className="text-[13px] font-medium cursor-pointer inline-block relative">
                                            <span
                                                className={`transition-opacity ${isActive
                                                    ? "gold-text"
                                                    : "text-white group-hover:opacity-0"
                                                    }`}
                                            >
                                                {link.label}
                                            </span>
                                            {!isActive && (
                                                <span className="gold-text absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {link.label}
                                                </span>
                                            )}
                                        </span>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* CTA Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href={'/contact'}>
                            <Button
                                variant="goldGlow"
                                className="anton-font text-lg tracking-wide px-6 py-5"
                            >
                                <span className="gold-text">JOIN NOW</span>
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
