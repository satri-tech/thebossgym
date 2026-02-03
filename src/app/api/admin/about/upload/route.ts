import { NextRequest } from "next/server";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse } from "@/core/lib/auth/api-response";
import { uploadSingleFile, deleteFiles } from "@/core/lib/image/uploadFiles";
import prisma from "@/core/lib/prisma";

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

    // Get current about data to delete old image if exists
    const currentAbout = await prisma.about.findUnique({
      where: { id: 1 },
    });

    // Upload new image to /public/about directory
    const uploadResult = await uploadSingleFile(file, {
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: {
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
        "image/gif": [".gif"],
      },
      uploadPath: "public/about",
      maxFiles: 1,
    });

    if (!uploadResult.success || uploadResult.files.length === 0) {
      return errorResponse(
        uploadResult.errors[0] || "Failed to upload image",
        400
      );
    }

    const filename = uploadResult.files[0];
    const imageUrl = `/about/${filename}`;

    // Delete old image if it exists
    if (currentAbout?.image) {
      const oldFilename = currentAbout.image.split("/").pop();
      if (oldFilename) {
        await deleteFiles([oldFilename], "public/about");
      }
    }

    return successResponse(
      { url: imageUrl, filename },
      "Image uploaded successfully"
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return errorResponse("Failed to upload image", 500);
  }
}
