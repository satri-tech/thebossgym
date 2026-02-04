import prisma from "@/core/lib/prisma";
import { successResponse, errorResponse } from "@/core/lib/auth/api-response";

export async function GET() {
  try {
    const trainers = await prisma.trainer.findMany({
      include: {
        socialMedia: true,
      },
      orderBy: {
        order: "asc",
      },
    });
    return successResponse(trainers, "Trainers retrieved successfully");
  } catch (error) {
    console.error("Error fetching trainers:", error);
    return errorResponse("Failed to fetch trainers", 500);
  }
}
