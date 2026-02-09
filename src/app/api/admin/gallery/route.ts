import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/core/lib/auth";
import prisma from "@/core/lib/prisma";
import { createGalleryImageSchema } from "@/core/validators/gallery.validator";

// GET - Fetch all gallery images
export async function GET() {
  try {
    console.log("[Gallery API] Fetching gallery images...");
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
    console.log("[Gallery API] Found images:", images.length);

    return NextResponse.json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.error("[Gallery API] Error fetching gallery images:", error);
    console.error("[Gallery API] Error details:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch gallery images",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// POST - Create new gallery image
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = createGalleryImageSchema.parse(body);

    const image = await prisma.galleryImage.create({
      data: validatedData,
    });

    return NextResponse.json({
      success: true,
      data: image,
      message: "Gallery image created successfully",
    });
  } catch (error) {
    console.error("Error creating gallery image:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: error,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create gallery image",
      },
      { status: 500 }
    );
  }
}
