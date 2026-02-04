"use server";

import { uploadImageAction } from "@/core/lib/image/uploadImageAction";

export async function uploadServiceImage(formData: FormData) {
  return uploadImageAction(formData, {
    uploadPath: "public/services",
    maxFileSize: 5 * 1024 * 1024,
    allowedTypes: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
  });
}
