import { ITestimonial } from "../types/testimonials.types";

export const defaultTestimonials: ITestimonial[] = [
  {
    id: "1",
    comment:
      "The Boss Gym has helped me become a better athlete and person than I ever thought possible.",
    name: "Sarah Johnson",
    position: "Professional Athlete",
    image: "/fallback.jpg",
    createdAt: new Date(),
  },
  {
    id: "2",
    comment:
      "The trainers here are exceptional. They pushed me beyond my limits and helped me achieve my dream physique.",
    name: "Michael Chen",
    position: "Fitness Enthusiast",
    image: "/fallback.jpg",
    createdAt: new Date(),
  },
  {
    id: "3",
    comment:
      "Best gym experience I've ever had. The community is supportive and the equipment is top-notch.",
    name: "Emily Rodriguez",
    position: "Marathon Runner",
    image: "/fallback.jpg",
    createdAt: new Date(),
  },
  {
    id: "4",
    comment:
      "Transformed my life completely. Lost 50 pounds and gained confidence I never knew I had.",
    name: "David Thompson",
    position: "Weight Loss Champion",
    image: "/fallback.jpg",
    createdAt: new Date(),
  },
];
