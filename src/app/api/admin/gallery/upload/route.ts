import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/core/lib/auth";
import { uploadSingleFile } from "@/core/lib/image/uploadFiles";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const uploadResult = await uploadSingleFile(file, {
      maxFileSize: 10 * 1024 * 1024, // 10MB
      allowedTypes: {
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
      },
      uploadPath: "public/gallery",
      maxFiles: 1,
    });

    if (!uploadResult.success || uploadResult.files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: uploadResult.errors[0] || "Failed to upload image",
        },
        { status: 400 }
      );
    }

    const filename = uploadResult.files[0];
    const imageUrl = `/gallery/${filename}`;

    return NextResponse.json({
      success: true,
      url: imageUrl,
      filename,
    });
  } catch (error) {
    console.error("Error uploading gallery image:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      },
      { status: 500 }
    );
  }
}
