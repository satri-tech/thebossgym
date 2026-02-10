"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import BackgroundShapes from "@/features/gallery/components/BackgroundShapes";
import { ImageGallery } from "@/features/gallery/components/image-gallery";
import { TagFilter } from "@/features/gallery/components/tag-filter";
import { useGalleryPublic } from "@/features/gallery/hooks/useGalleryPublic";
import { GALLERY_TAGS, type GalleryImage } from "@/core/constants/gallery";

const GALLERY_TAGS_ARRAY = Array.from(GALLERY_TAGS);

export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState<string>('All');
  const { images, loading } = useGalleryPublic();

  const filteredImages: GalleryImage[] = useMemo(() => {
    if (activeTag === 'All') {
      return images;
    }
    return images.filter((image) => image.tags.includes(activeTag));
  }, [activeTag, images]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundShapes />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 anton-font">
                Our{" "}
                <span className="gold-text">Gallery</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                Explore our state-of-the-art facilities, inspiring transformations,
                and the energy that makes our gym special.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tag Filter */}
        <section className="px-4 pb-8">
          <div className="max-w-7xl mx-auto">
            <TagFilter
              tags={GALLERY_TAGS_ARRAY}
              activeTag={activeTag}
              onTagChange={setActiveTag}
            />
          </div>
        </section>

        {/* Gallery */}
        <section className="px-4">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Loading gallery...</p>
            </div>
          ) : filteredImages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto text-center py-12"
            >
              <h3 className="text-xl font-bold mb-2 gold-text">Coming Soon</h3>
              <p className="text-gray-400">
                More {activeTag.toLowerCase()} content is on the way.
              </p>
            </motion.div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <ImageGallery images={filteredImages} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}