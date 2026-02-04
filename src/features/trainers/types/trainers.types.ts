export interface Trainer {
  name: string;
  title: string;
  specialties: string[];
  bio: string;
  image: string;
  experience: string;
  social?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}
