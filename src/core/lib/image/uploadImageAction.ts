"use server";

import { uploadSingleFile } from "@/core/lib/image/uploadFiles";

export interface UploadImageOptions {
  uploadPath: string;
  maxFileSize?: number;
  allowedTypes?: Record<string, string[]>;
}

export async function uploadImageAction(
  formData: FormData,
  options: UploadImageOptions
) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return {
        success: false,
        error: "No file provided",
      };
    }

    const uploadResult = await uploadSingleFile(file, {
      maxFileSize: options.maxFileSize || 5 * 1024 * 1024,
      allowedTypes: options.allowedTypes || {
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
        "image/gif": [".gif"],
      },
      uploadPath: options.uploadPath,
      maxFiles: 1,
    });

    if (!uploadResult.success || uploadResult.files.length === 0) {
      return {
        success: false,
        error: uploadResult.errors[0] || "Failed to upload image",
      };
    }

    const filename = uploadResult.files[0];
    const imageUrl = `/${options.uploadPath.replace("public/", "")}/${filename}`;

    return {
      success: true,
      url: imageUrl,
      filename,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}
