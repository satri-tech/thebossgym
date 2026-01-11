import { Testimonial } from "../types/types";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Weight Loss Client",
    goal: "weight-loss",
    quote:
      "Lost 30 pounds in 4 months! The trainers here are incredible and the community support is unmatched. Best decision I ever made.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Williams",
    role: "Muscle Gain Client",
    goal: "muscle-gain",
    quote:
      "Gained 20 lbs of pure muscle in 6 months. The personalized training programs and nutrition guidance are top-notch.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Endurance Athlete",
    goal: "endurance",
    quote:
      "Completed my first marathon thanks to the expert coaching here. They pushed me beyond what I thought was possible.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 5,
  },
  {
    id: 4,
    name: "David Martinez",
    role: "Fitness Enthusiast",
    goal: "general",
    quote:
      "The facilities are world-class and the atmosphere is motivating. I actually look forward to my workouts now!",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 5,
  },
  {
    id: 5,
    name: "Jessica Taylor",
    role: "Weight Loss Client",
    goal: "weight-loss",
    quote:
      "Down 45 pounds and feeling amazing! The support system here is like a second family. Forever grateful.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    rating: 5,
  },
  {
    id: 6,
    name: "Ryan Cooper",
    role: "Muscle Gain Client",
    goal: "muscle-gain",
    quote:
      "Transformed my physique completely. The trainers know exactly how to push you to reach your goals safely.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    rating: 5,
  },
];

export const GOAL_FILTERS = [
  { value: "all", label: "All Stories" },
  { value: "weight-loss", label: "Weight Loss" },
  { value: "muscle-gain", label: "Muscle Gain" },
  { value: "endurance", label: "Endurance" },
  { value: "general", label: "General Fitness" },
];
