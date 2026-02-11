"use client";
import MissionVisionValues from "@/features/about-us/components/mission-vision-values";
import TrainingPhilosophy from "@/features/about-us/components/training-philosophy";
import FacilitiesSnapshot from "@/features/facilities/client/components/facilities-snapshot";
import CTASection from "@/features/about-us/components/cta-section";
import AboutUsSection from "@/features/about-us/components/hero-section";
import { useAboutScroll } from "@/features/about-us/hooks/useScroll";
import FounderMessage from "@/features/founder-message/client/components/founder-message";

const AboutUsPage = () => {
    const { containerRef } = useAboutScroll();

    return (
        <div ref={containerRef} className="relative bg-black text-white overflow-hidden">
            {/* Hero Section */}
            <AboutUsSection theme="dark" />

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
