"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import BackgroundShapes from "@/features/gallery/components/BackgroundShapes";
import { ImageGallery } from "@/features/gallery/components/image-gallery";
import { TagFilter } from "@/features/gallery/components/tag-filter";
import { GALLERY_IMAGES, GALLERY_TAGS } from "@/constants/gallery";

export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState<string>('All');

  const filteredImages = useMemo(() => {
    if (activeTag === 'All') {
      return GALLERY_IMAGES;
    }
    return GALLERY_IMAGES.filter((image) => image.tags.includes(activeTag));
  }, [activeTag]);

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
              tags={GALLERY_TAGS}
              activeTag={activeTag}
              onTagChange={setActiveTag}
            />
          </div>
        </section>

        {/* Gallery */}
        <section>
          <ImageGallery images={filteredImages} />
        </section>

        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">
              No images found for this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}