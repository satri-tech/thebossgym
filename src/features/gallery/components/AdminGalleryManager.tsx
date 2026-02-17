"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/core/components/ui/button";
import { Spinner } from "@/core/components/ui/spinner";
import { Plus, X } from "lucide-react";
import { useGallery } from "../hooks/useGallery";
import { GalleryUploadDialog } from "./GalleryUploadDialog";
import { GalleryDeleteDialog } from "./GalleryDeleteDialog";
import { TagFilter } from "./tag-filter";
import { GALLERY_TAGS } from "@/core/constants/gallery";
import Image from "next/image";
import { AspectRatio } from "@/core/components/gallery-animations/aspect-ratio";

export function AdminGalleryManager() {
  const { images, loading, uploadImage, deleteImage } = useGallery();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    id: string;
    alt: string;
  } | null>(null);
  const [activeTag, setActiveTag] = useState<string>("All");
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setInitialLoading(false);
    }
  }, [loading]);

  const filteredImages = useMemo(() => {
    if (activeTag === "All") {
      return images;
    }
    return images.filter((image) => image.tags.includes(activeTag));
  }, [images, activeTag]);

  const handleDelete = (id: string, alt: string) => {
    setSelectedImage({ id, alt });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedImage) {
      await deleteImage(selectedImage.id);
      setDeleteDialogOpen(false);
      setSelectedImage(null);
    }
  };

  // Distribute images across columns for masonry layout
  const columns = 4;
  const imageColumns: typeof filteredImages[] = Array.from(
    { length: columns },
    () => []
  );

  filteredImages.forEach((image, index) => {
    imageColumns[index % columns].push(image);
  });

  // Show full-page spinner only on the very first load.
  // During subsequent refetches (e.g. after each image upload), keep the UI
  // and dialogs mounted so the upload dialog doesn't flicker.
  if (initialLoading && loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <p className="text-gray-500 mt-1">
            Upload and manage gallery images
          </p>
        </div>
        <Button onClick={() => setUploadDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Upload Image
        </Button>
      </div>

      {/* Tag Filter */}
      <TagFilter
        tags={GALLERY_TAGS}
        activeTag={activeTag}
        onTagChange={setActiveTag}
      />

      {/* Gallery Grid - match landing page masonry layout (no tags/name/size) */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-lg">
          <p className="text-muted-foreground text-lg">
            {activeTag === "All"
              ? "No images uploaded yet"
              : `No images found for "${activeTag}"`}
          </p>
          {activeTag === "All" && (
            <Button
              onClick={() => setUploadDialogOpen(true)}
              className="mt-4"
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload Your First Image
            </Button>
          )}
        </div>
      ) : (
        <div className="relative flex w-full flex-col items-center justify-center">
          <div className="mx-auto grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {imageColumns.map((columnImages, colIndex) => (
              <div key={colIndex} className="grid gap-6">
                {columnImages.map((image) => {
                  const ratio = image.width / image.height;

                  return (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative group"
                    >
                      <AspectRatio
                        ratio={ratio}
                        className="bg-neutral-900 relative size-full rounded-lg overflow-hidden"
                      >
                        <Image
                          alt={image.alt}
                          src={`/api/images${image.imageUrl}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="rounded-lg object-cover"
                        />

                        {/* Simple delete icon (cross) in the top-right */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(image.id, image.alt);
                          }}
                          className="absolute top-2 right-2 z-10 rounded-full bg-black/60 text-white p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Delete image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </AspectRatio>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Dialog */}
      <GalleryUploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUpload={uploadImage}
      />

      {/* Delete Dialog */}
      {selectedImage && (
        <GalleryDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={confirmDelete}
          imageAlt={selectedImage.alt}
        />
      )}
    </div>
  );
}
