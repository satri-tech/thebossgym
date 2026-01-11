export interface Testimonial {
  id: number;
  name: string;
  role: string;
  goal: "weight-loss" | "muscle-gain" | "endurance" | "general";
  quote: string;
  image: string;
  rating: number;
}
