"use client";
import Link from "next/link";
import { Button } from "@/core/components/ui/button";
import { Spinner } from "@/core/components/ui/spinner";
import { Input } from "@/core/components/ui/input";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";
import { useSession } from "next-auth/react";
const Login = () => {

    const { isLoading, error, handleLogin } = useLogin()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleLogin(email, password);
    };

    return (
        <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center px-4">
            {/* Animated Background Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.03 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(#84fd3e 1px, transparent 1px), linear-gradient(90deg, #84fd3e 1px, transparent 1px)",
                        backgroundSize: "100px 100px",
                    }}
                />
            </motion.div>

            {/* Animated Background Orbs */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-20 left-10 w-96 h-96 bg-[#d4af37] rounded-full blur-[150px] opacity-10"
            />

            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#ffd700] rounded-full blur-[150px] opacity-10"
            />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="anton-font text-4xl md:text-5xl mb-2"
                    >
                        <span className="text-white">THE </span>
                        <span className="gold-text">BOSS GYM</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-zinc-400 text-sm"
                    >
                        Welcome back, champion
                    </motion.p>
                </div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8"
                >
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="space-y-2"
                        >
                            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[#d4af37]" />
                                Email
                            </label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#d4af37] focus:ring-[#d4af37]/20"
                                required
                            />
                        </motion.div>

                        {/* Password Input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="space-y-2"
                        >
                            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                <Lock className="w-4 h-4 text-[#d4af37]" />
                                Password
                            </label>
                            <Input
                                name="password"
                                type="password"
                                placeholder="••••••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#d4af37] focus:ring-[#d4af37]/20"
                                required
                            />
                        </motion.div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Forgot Password Link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="flex justify-end"
                        >
                            <Link
                                href="#"
                                className="text-xs text-[#d4af37] hover:text-[#ffd700] transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </motion.div>

                        {/* Login Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            <Button
                                type="submit"
                                className="w-full h-12 font-semibold bg-[#d4af37] text-black hover:bg-[#ffd700] transition-all duration-300 rounded-lg shine-effect"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        Logging in <Spinner />
                                    </div>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </motion.div>
                    </form>

                </motion.div>
            </motion.div>
        </div>
    )
}

export default Login