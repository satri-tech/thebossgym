// CTA Section

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/core/ui/button";
import Link from "next/link";
const CTASection = () => {
    return (
        <section className="relative py-32 px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center"
            >
                <h2 className="anton-font text-6xl md:text-8xl mb-8">
                    JOIN THE
                    <br />
                    <span className="gold-text">BOSS FAMILY</span>
                </h2>

                <p className="text-xl md:text-xl text-secondary-foreground mb-12 max-w-2xl mx-auto">
                    Experience the difference. Start your transformation journey with a complimentary trial session.
                </p>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link href={'/contact'}>
                        <Button
                            size="lg"
                            className="anton-font text-xl px-8 py-6 gold-bg text-black group transition-all tracking-wide hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
                        >
                            Start Your Journey
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform text-black" />
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default CTASection
