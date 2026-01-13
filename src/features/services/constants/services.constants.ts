import { Activity, Dumbbell, Heart, Users, LucideIcon, Droplets, Lock, Music, Flame } from 'lucide-react';

export interface Service {
  title: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  icon: LucideIcon;
}

export const GYM_SERVICES: Service[] = [
  {
    title: 'Boxing Training',
    description:
      'Unleash your inner fighter with our professional boxing program. Learn proper technique, improve your cardio, and build explosive power with our certified boxing coaches. Perfect for all skill levels from beginners to advanced.',
    features: [
      'Professional boxing coaches',
      'Heavy bags & speed bags',
      'Sparring sessions',
      'Technique & footwork training',
    ],
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&h=600&fit=crop',
    imageAlt: 'Boxing training session',
    icon: Flame,
  },
  {
    title: 'Zumba Classes',
    description:
      'Dance your way to fitness with our high-energy Zumba classes. Combining Latin and international music with fun, effective movements, Zumba is a total workout that feels like a party. Burn calories while having a blast.',
    features: [
      'Certified Zumba instructors',
      'Multiple class times daily',
      'All fitness levels welcome',
      'Fun, party-like atmosphere',
    ],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop',
    imageAlt: 'Zumba dance fitness class',
    icon: Music,
  },
  {
    title: 'Personal Training',
    description:
      'Get one-on-one attention from certified personal trainers who create customized workout plans tailored to your specific goals, fitness level, and lifestyle. Experience accelerated results with expert guidance every step of the way.',
    features: [
      'Customized workout plans',
      'Nutrition guidance',
      'Progress tracking',
      'Flexible scheduling',
    ],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
    imageAlt: 'Personal training session',
    icon: Users,
  },
  {
    title: 'Group Fitness Classes',
    description:
      'Join energizing group classes led by expert instructors. From high-intensity interval training to yoga and spin, our diverse class schedule offers something for everyone. Build strength, endurance, and community.',
    features: [
      'Variety of class types',
      'All fitness levels welcome',
      'Motivating instructors',
      'Community atmosphere',
    ],
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
    imageAlt: 'Group fitness class',
    icon: Activity,
  },
  {
    title: 'Strength & Conditioning',
    description:
      'Access our comprehensive strength training area equipped with free weights, machines, and functional training equipment. Build muscle, increase power, and transform your physique with our state-of-the-art facilities.',
    features: [
      'Free weights & machines',
      'Olympic lifting platforms',
      'Functional training zone',
      'Expert guidance available',
    ],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    imageAlt: 'Strength training area',
    icon: Dumbbell,
  },
  {
    title: 'Premium Locker Rooms',
    description:
      'Enjoy our spacious, clean locker rooms equipped with secure lockers, private changing areas, and modern amenities. Store your belongings safely while you focus on your workout in complete peace of mind.',
    features: [
      'Secure personal lockers',
      'Private changing areas',
      'Clean & well-maintained',
      'Complimentary toiletries',
    ],
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop',
    imageAlt: 'Modern locker room facilities',
    icon: Lock,
  },
  {
    title: 'Luxury Showers & Spa',
    description:
      'Refresh and rejuvenate after your workout in our luxury shower facilities. Featuring premium fixtures, hot water, and spa-quality amenities, our showers provide the perfect way to unwind and prepare for your day.',
    features: [
      'Spacious shower stalls',
      'Premium bath products',
      'Hot water guaranteed',
      'Towel service available',
    ],
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&h=600&fit=crop',
    imageAlt: 'Luxury shower facilities',
    icon: Droplets,
  },
  {
    title: 'Cardio & Wellness',
    description:
      'Improve your cardiovascular health with our premium cardio equipment and wellness programs. From treadmills and bikes to rowing machines, plus recovery services like massage and stretching to keep you performing at your best.',
    features: [
      'Latest cardio equipment',
      'Heart rate monitoring',
      'Recovery services',
      'Wellness consultations',
    ],
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=600&fit=crop',
    imageAlt: 'Cardio equipment area',
    icon: Heart,
  },
];
