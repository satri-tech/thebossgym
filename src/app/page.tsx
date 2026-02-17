export const revalidate = 40;

import HeroSection from "@/features/hero-section/components/HeroSection";
import AboutUsSection from "@/features/about-us/components/hero-section";
import { TrainersGallery } from "@/features/trainers/landing/components/TrainersGallery";
import Testimonials from "@/features/testimonials/client/components/Testimonials";
import CTA from "@/features/CTA/components/CTA";
import ScrollContainer from "./ScrollContainer";
import { Stat } from "@/features/stats/types/types";

async function getStats(): Promise<Stat[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/stats`, {
      next: { revalidate: 60 } // ISR: revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error("Failed to fetch stats");
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching stats:", error);
    return [];
  }
}

export default async function Page() {
  const stats = await getStats();

  return (
    <ScrollContainer>
      <HeroSection stats={stats} />
      <AboutUsSection theme="transparent" cta_text="Learn More" cta_classname="px-12 py-6" />
      <div className="relative" style={{ transform: "translateZ(0)" }}>
        <TrainersGallery />
      </div>
      <Testimonials />
      <CTA />
    </ScrollContainer>
  );
}
