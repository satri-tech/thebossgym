import { NextRequest } from "next/server";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse } from "@/core/lib/auth/api-response";
import { uploadSingleFile } from "@/core/lib/image/uploadFiles";

export async function POST(request: NextRequest) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return errorResponse("No file provided", 400);
    }

    // Upload to public/trainers directory
    const result = await uploadSingleFile(file, {
      uploadPath: "public/trainers",
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: {
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
        "image/gif": [".gif"],
      },
    });

    if (!result.success || result.files.length === 0) {
      return errorResponse(
        result.errors[0] || "Failed to upload file",
        400
      );
    }

    const imageUrl = `/trainers/${result.files[0]}`;

    return successResponse(
      { url: imageUrl },
      "Image uploaded successfully",
      201
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return errorResponse("Failed to upload image", 500);
  }
}
