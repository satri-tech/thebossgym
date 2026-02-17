'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Github,
  Mail,
  Globe,
  MessageCircle,
  Phone,
  MapPin,
  Link as LinkIcon,
} from 'lucide-react';
import { Trainer, TrainerSocialMedia } from '@/features/trainers/types/trainers.types';
import Image from 'next/image';

export function MinimalTrainers() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch('/api/trainers');
        const data = await response.json();
        if (data.success) {
          setTrainers(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch trainers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const getSocialIcon = (social: TrainerSocialMedia) => {
    const icon = social.icon?.toLowerCase() || '';
    const iconProps = { className: 'w-3.5 h-3.5' };

    switch (icon) {
      case 'facebook':
        return <Facebook {...iconProps} />;
      case 'instagram':
        return <Instagram {...iconProps} />;
      case 'twitter':
        return <Twitter {...iconProps} />;
      case 'linkedin':
        return <Linkedin {...iconProps} />;
      case 'youtube':
        return <Youtube {...iconProps} />;
      case 'github':
        return <Github {...iconProps} />;
      case 'email':
        return <Mail {...iconProps} />;
      case 'website':
        return <Globe {...iconProps} />;
      case 'whatsapp':
        return <MessageCircle {...iconProps} />;
      case 'phone':
        return <Phone {...iconProps} />;
      case 'location':
        return <MapPin {...iconProps} />;
      case 'link':
        return <LinkIcon {...iconProps} />;
      default:
        return <LinkIcon {...iconProps} />;
    }
  };

  return (
    <section className="relative py-20 md:py-13 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-6 max-w-4xl mx-auto mb-20"
        >
          <h1 className="anton-font text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none">
            <span className="text-white">MEET OUR </span>
            <span className="gold-text">TRAINERS</span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Expert guidance makes all the difference. Our certified trainers bring years of experience,
            personalized attention, and proven strategies to accelerate your fitness journey.
          </p>
        </motion.div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {loading ? (
            <div className="col-span-full text-center text-zinc-400">Loading trainers...</div>
          ) : (
            trainers.map((trainer, index) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                {/* Image */}
                <motion.div
                  className="relative aspect-3/4 overflow-hidden bg-zinc-900 mb-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >

                  <Image
                    src={trainer.image ? `/api/images${trainer.image}` : '/fallback.jpg'}
                    alt={trainer.fullname}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover"
                    priority={index < 4}
                  />
                </motion.div>

                {/* Content */}
                <div className="space-y-1">
                  {/* Experience */}
                  {trainer.experience && (
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
                      {trainer.experience}
                    </p>
                  )}

                  {/* Name */}
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    {trainer.fullname}
                  </h2>

                  {/* Position */}
                  {trainer.position && (
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      {trainer.position}
                    </p>
                  )}

                  {/* Social Links */}
                  {trainer.socialMedia && trainer.socialMedia.length > 0 && (
                    <div className="flex gap-3 pt-1">
                      {trainer.socialMedia.map((social) => (
                        <motion.a
                          key={social.id}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.2 }}
                          className="text-zinc-500 hover:text-white transition-colors"
                          title={social.title}
                        >
                          {getSocialIcon(social)}
                        </motion.a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
