import { useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

export function useAboutScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return { containerRef, smoothProgress };
}
