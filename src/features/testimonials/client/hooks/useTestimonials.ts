"use client";
import { useEffect, useState } from "react";
import { ITestimonial } from "../types/testimonials.types";
import { defaultTestimonials } from "../constants/testimonials.constants";

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(true);
  const [imageLoadedStates, setImageLoadedStates] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        const result = await response.json();
        if (result.success && result.data) {
          setTestimonials(result.data);
          // Initialize image loaded states
          const states: Record<string, boolean> = {};
          result.data.forEach((testimonial: ITestimonial) => {
            states[testimonial.id] = false;
          });
          setImageLoadedStates(states);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const displayTestimonials =
    testimonials.length > 0 ? testimonials : defaultTestimonials;
  const totalSlides = displayTestimonials.length;

  // Auto-slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 8000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const handleImageLoad = (testimonialId: string) => {
    setImageLoadedStates((prev) => ({
      ...prev,
      [testimonialId]: true,
    }));
  };

  return {
    totalSlides,
    loading,
    currentSlide,
    direction,
    imageLoadedStates,
    setCurrentSlide,
    handleImageLoad,
    setDirection,
    displayTestimonials,
  };
}
