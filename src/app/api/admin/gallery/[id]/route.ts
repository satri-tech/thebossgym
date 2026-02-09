import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/core/lib/auth";
import prisma from "@/core/lib/prisma";
import { updateGalleryImageSchema } from "@/core/validators/gallery.validator";
import { deleteFiles } from "@/core/lib/image/uploadFiles";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// DELETE - Delete gallery image
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    // Get the image to delete the file
    const image = await prisma.galleryImage.findUnique({
      where: { id },
    });

    if (!image) {
      return NextResponse.json(
        { success: false, error: "Image not found" },
        { status: 404 }
      );
    }

    // Delete the image from database
    await prisma.galleryImage.delete({
      where: { id },
    });

    // Delete the file from disk
    if (image.imageUrl) {
      await deleteFiles([image.imageUrl], "public/gallery");
    }

    return NextResponse.json({
      success: true,
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete gallery image",
      },
      { status: 500 }
    );
  }
}

// PATCH - Update gallery image
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const body = await request.json();
    const validatedData = updateGalleryImageSchema.parse(body);

    const image = await prisma.galleryImage.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json({
      success: true,
      data: image,
      message: "Gallery image updated successfully",
    });
  } catch (error) {
    console.error("Error updating gallery image:", error);

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
        error: "Failed to update gallery image",
      },
      { status: 500 }
    );
  }
}
