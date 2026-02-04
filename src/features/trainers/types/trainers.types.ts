export interface TrainerSocialMedia {
  id: string;
  title: string;
  link: string;
  icon?: string | null;
  trainerId?: string | null;
}

export interface Trainer {
  id: string;
  fullname: string;
  position?: string | null;
  experience?: string | null;
  description?: string | null;
  image?: string | null;
  order?: number;
  socialMedia?: TrainerSocialMedia[];
}

// For landing page compatibility
export interface LandingTrainer {
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

export interface CreateTrainerInput {
  fullname: string;
  position?: string | null;
  experience?: string | null;
  description?: string | null;
  image?: string | null;
  socialMedia?: Array<{
    title: string;
    link: string;
    icon?: string | null;
  }>;
}

export interface UpdateTrainerInput {
  fullname?: string;
  position?: string | null;
  experience?: string | null;
  description?: string | null;
  image?: string | null;
}
