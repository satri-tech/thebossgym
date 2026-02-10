"use client";

import { useState, useEffect } from "react";
import type { GalleryImage } from "@/core/constants/gallery";

export function useGalleryPublic() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/gallery");
        const data = await response.json();

        if (data.success) {
          // Map API response to match GalleryImage interface
          const mappedImages = data.data.map((img: any) => ({
            id: img.id,
            src: img.imageUrl,
            alt: img.alt,
            width: img.width,
            height: img.height,
            tags: img.tags || [],
          }));
          setImages(mappedImages);
        }
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return { images, loading };
}
