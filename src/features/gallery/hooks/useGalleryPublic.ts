"use client";

import { useState, useEffect } from "react";

export interface GalleryImage {
  id: string;
  imageUrl: string;
  alt: string;
  width: number;
  height: number;
  tags: string[];
}

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
          setImages(data.data);
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
