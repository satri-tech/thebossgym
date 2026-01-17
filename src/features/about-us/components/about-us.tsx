"use client";
import MissionVisionValues from "@/features/about-us/components/mission-vision-values";
import FounderMessage from "@/features/about-us/components/founder-message";
import TrainingPhilosophy from "@/features/about-us/components/training-philosophy";
import FacilitiesSnapshot from "@/features/about-us/components/facilities-snapshot";
import CTASection from "@/features/about-us/components/cta-section";
import HeroSection from "@/features/about-us/components/hero-section";
import { useAboutScroll } from "@/features/about-us/hooks/useScroll";

const AboutUsPage = () => {
    const { containerRef } = useAboutScroll();

    return (
        <div ref={containerRef} className="relative bg-black text-white overflow-hidden">
            {/* Hero Section */}
            <HeroSection theme="dark"/>

            {/* Mission, Vision & Values */}
            <MissionVisionValues />

            {/* Founder Message */}
            <FounderMessage />

            {/* Training Philosophy */}
            <TrainingPhilosophy />

            {/* Facilities Snapshot */}
            <FacilitiesSnapshot />

            {/* CTA Section */}
            <CTASection />
        </div>
    );
};


export default AboutUsPage;
