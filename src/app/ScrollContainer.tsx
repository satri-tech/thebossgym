"use client";

import { useScrollAnimation } from "@/core/lib/useScrollAnimation";

const ScrollContainer = ({ children }: { children: React.ReactNode }) => {
    const { containerRef } = useScrollAnimation();

    return (
        <div ref={containerRef} className="relative bg-black text-white overflow-hidden">
            <style jsx global>{`
        .boss-text {
          background: linear-gradient(
            135deg,
            #3a3a3a 0%,
            #5a5a5a 15%,
            #ffffff 40%,
            #ffffff 60%,
            #5a5a5a 80%,
            #3a3a3a 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(4px 8px 0px rgba(0, 0, 0, 0.9));
        }
      `}</style>

            {children}
        </div>
    );
};

export default ScrollContainer;
