import { LandingTrainer } from "../../types/trainers.types";

export const TRAINERS: LandingTrainer[] = [
  {
    name: 'Mike Johnson',
    title: 'Head Boxing Coach',
    specialties: ['Boxing', 'HIIT', 'Strength Training'],
    bio: 'Former professional boxer with 15 years of coaching experience. Specializes in technique, power development, and fight conditioning.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=1000&fit=crop',
    experience: '15+ Years',
    social: {
      instagram: '#',
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Sarah Martinez',
    title: 'Zumba & Dance Instructor',
    specialties: ['Zumba', 'Dance Fitness', 'Cardio'],
    bio: 'Certified Zumba instructor bringing energy and passion to every class. Makes fitness fun and accessible for all levels.',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&h=1000&fit=crop',
    experience: '8+ Years',
    social: {
      instagram: '#',
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'David Chen',
    title: 'Strength & Conditioning Coach',
    specialties: ['Powerlifting', 'Olympic Lifting', 'Bodybuilding'],
    bio: 'Competitive powerlifter and certified strength coach. Expert in building muscle, increasing strength, and proper lifting technique.',
    image: 'https://images.unsplash.com/photo-1567598508481-65985588e295?w=800&h=1000&fit=crop',
    experience: '12+ Years',
    social: {
      instagram: '#',
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Jessica Williams',
    title: 'Personal Training Director',
    specialties: ['Personal Training', 'Nutrition', 'Weight Loss'],
    bio: 'Holistic approach to fitness combining training, nutrition, and lifestyle coaching. Helped hundreds achieve their goals.',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800&h=1000&fit=crop',
    experience: '10+ Years',
    social: {
      instagram: '#',
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Marcus Thompson',
    title: 'CrossFit & Functional Training',
    specialties: ['CrossFit', 'Functional Training', 'Mobility'],
    bio: 'CrossFit Level 3 trainer focused on functional movements and athletic performance. Builds strong, capable athletes.',
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&h=1000&fit=crop',
    experience: '9+ Years',
    social: {
      instagram: '#',
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Emily Rodriguez',
    title: 'Yoga & Wellness Coach',
    specialties: ['Yoga', 'Pilates', 'Mindfulness'],
    bio: 'Registered yoga teacher specializing in strength-building flows and recovery. Promotes balance between intensity and restoration.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=1000&fit=crop',
    experience: '7+ Years',
    social: {
      instagram: '#',
      twitter: '#',
      linkedin: '#',
    },
  },
];

export const TRAINER_IMAGES = TRAINERS.map(trainer => trainer.image);
