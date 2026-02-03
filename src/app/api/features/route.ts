import prisma from "@/core/lib/prisma";
import { successResponse, errorResponse } from "@/core/lib/auth/api-response";

export async function GET() {
  try {
    const features = await prisma.feature.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });
    return successResponse(features, "Features retrieved successfully");
  } catch (error) {
    console.error("Error fetching features:", error);
    return errorResponse("Failed to fetch features", 500);
  }
}
