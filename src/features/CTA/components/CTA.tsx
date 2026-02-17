import Link from "next/link";
import { Button } from "@/core/components/ui/button";
import CTAAnimated from "./CTAAnimated";

export default function CTA() {
  return (
    <section className="relative py-32 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <CTAAnimated>
          <h2 className="anton-font text-6xl md:text-8xl mb-8">
            READY TO BE
            <br />
            <span className="gold-text">THE BOSS?</span>
          </h2>
        </CTAAnimated>

        <p className="text-xl text-gray-400 mb-12">
          Start your transformation today with a free trial
        </p>

        <Link href="/contact">
          <Button
            size="lg"
            className="anton-font text-2xl px-12 py-8 bg-black border-2 border-primary hover:bg-primary/10"
          >
            <span className="gold-text">GET STARTED NOW</span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
