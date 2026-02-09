import { NextResponse } from "next/server";
import prisma from "@/core/lib/prisma";

// GET - Fetch all gallery images (public)
export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch gallery images",
      },
      { status: 500 }
    );
  }
}
