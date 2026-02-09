"use server";

import { uploadSingleFile } from "@/core/lib/image/uploadFiles";

export async function uploadTestimonialImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return {
        success: false,
        error: "No file provided",
      };
    }

    const result = await uploadSingleFile(file, {
      uploadPath: "public/testimonials",
      maxFileSize: 5 * 1024 * 1024,
      allowedTypes: {
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
      },
    });

    if (!result.success) {
      return {
        success: false,
        error: result.errors[0] || "Failed to upload image",
      };
    }

    return {
      success: true,
      filename: result.files[0],
      url: `/testimonials/${result.files[0]}`,
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

export async function deleteTestimonialImage(filename: string) {
  try {
    const { deleteFiles } = await import("@/core/lib/image/uploadFiles");

    if (!filename || filename === "fallback.jpg") {
      return { success: true };
    }

    const result = await deleteFiles([filename], "public/testimonials");

    return {
      success: result.deleted.length > 0,
    };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false };
  }
}
