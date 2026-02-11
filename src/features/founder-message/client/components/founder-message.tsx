"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/core/components/ui/skeleton";

interface FounderMessageData {
  title: string;
  highlight: string;
  description: string;
  founderName: string;
  founderPosition: string;
  founderImage: string;
}

// Founder Message
const FounderMessage = () => {
  const [data, setData] = useState<FounderMessageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/founder-message");
        const result = await response.json();
        if (result.success && result.data) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch founder message:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-3/4 bg-zinc-900 animate-pulse" />
            <div className="space-y-6">
              <div className="h-16 bg-zinc-900 animate-pulse rounded" />
              <div className="space-y-4">
                <div className="h-4 bg-zinc-900 animate-pulse rounded" />
                <div className="h-4 bg-zinc-900 animate-pulse rounded" />
                <div className="h-4 bg-zinc-900 animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const title = data?.title || "FROM THE FOUNDER";
  const highlight = data?.highlight || "FOUNDER";
  const description = data?.description || "";
  const founderName = data?.founderName || "Dhan Bahadur Gurung";
  const founderPosition = data?.founderPosition || "FOUNDER & CEO";
  const founderImage = data?.founderImage;

  // Split description into paragraphs
  const paragraphs = description
    ? description.split("\n").filter((p) => p.trim())
    : [
      '"When I started The Boss Gym, I had one goal: to create a place where people don\'t just work out, they transform. A place where every person who walks through our doors feels empowered, supported, and ready to conquer their goals."',
      '"Fitness isn\'t just about physical strength. It\'s about mental resilience, discipline, and the courage to push beyond your limits. That\'s what we cultivate here every single day."',
      '"Thank you for being part of our journey. Together, we\'re not just building bodies, we\'re building champions."',
    ];
  console.log(founderImage)
  return (
    <section className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-3/4 bg-zinc-900 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10" />
              {!imageLoaded && founderImage && (
                <Skeleton className="absolute inset-0 rounded-none" />
              )}
              {founderImage ? (
                <Image
                  src={founderImage}
                  alt={founderName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  onLoadingComplete={() => setImageLoaded(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="w-32 h-32 text-zinc-800" />
                </div>
              )}
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="anton-font text-6xl md:text-7xl mb-8">
              {title.split(new RegExp(`(${highlight})`, 'gi')).map((part, index) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                  <span key={index} className="gold-text">{part} </span>
                ) : (
                  <span key={index}>{part} </span>
                )
              )}
            </h2>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-justify">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12">
              <div className="anton-font text-4xl gold-text mb-2">
                {founderName}
              </div>
              <div className="text-gray-500 text-sm tracking-wider">
                {founderPosition}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderMessage;