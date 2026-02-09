"use server";

import { uploadImageAction } from "@/core/lib/image/uploadImageAction";

export async function uploadGalleryImage(formData: FormData) {
  return uploadImageAction(formData, {
    uploadPath: "public/gallery",
    maxFileSize: 10 * 1024 * 1024, // 10MB for gallery images
    allowedTypes: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
  });
}
