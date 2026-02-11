"use client";

import { Dumbbell } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Skeleton } from "@/core/components/ui/skeleton";
import Image from "next/image";

interface Facility {
  id: string;
  title: string;
  description: string;
  image: string;
}

// Facilities Snapshot
const FacilitiesSnapshot = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoadedStates, setImageLoadedStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch("/api/facilities");
        const result = await response.json();
        if (result.success && result.data) {
          setFacilities(result.data);
          // Initialize image loaded states
          const states: Record<string, boolean> = {};
          result.data.forEach((facility: Facility) => {
            states[facility.id] = false;
          });
          setImageLoadedStates(states);
        }
      } catch (error) {
        console.error("Failed to fetch facilities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const defaultFacilities = [
    { id: "1", title: "Strength Zone", description: "Olympic platforms & premium equipment", image: "" },
    { id: "2", title: "Cardio Theater", description: "State-of-the-art machines with entertainment", image: "" },
    { id: "3", title: "Functional Area", description: "Battle ropes, sleds, and agility training", image: "" },
    { id: "4", title: "Recovery Lounge", description: "Massage chairs, sauna, and cold plunge", image: "" },
    { id: "5", title: "Group Studio", description: "High-energy classes and community workouts", image: "" },
    { id: "6", title: "Nutrition Bar", description: "Fresh smoothies, supplements, and fuel", image: "" }
  ];

  const displayFacilities = facilities.length > 0 ? facilities : defaultFacilities;

  const handleImageLoad = (facilityId: string) => {
    setImageLoadedStates(prev => ({
      ...prev,
      [facilityId]: true
    }));
  };

  if (loading) {
    return (
      <section className="relative py-32 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-16 w-96 mx-auto mb-20" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="aspect-4/3" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-32 px-4 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="anton-font text-4xl md:text-7xl mb-20 text-center"
        >
          OUR <span className="gold-text">FACILITIES</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayFacilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative aspect-4/3 bg-black border border-zinc-800 hover:border-[#d4af37] transition-all duration-300 overflow-hidden group"
            >
              {/* Skeleton loader */}
              {!imageLoadedStates[facility.id] && facility.image && (
                <Skeleton className="absolute inset-0 rounded-none" />
              )}

              {/* Image */}
              {facility.image ? (
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onLoadingComplete={() => handleImageLoad(facility.id)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Dumbbell className="w-20 h-20 text-zinc-900 group-hover:text-zinc-800 transition-colors" />
                </div>
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10" />

              {/* Text content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="anton-font text-2xl mb-2 group-hover:gold-text transition-all duration-300">
                  {facility.title}
                </h3>
                <p className="text-sm text-gray-400">{facility.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSnapshot;
