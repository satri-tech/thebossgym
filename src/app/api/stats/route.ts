import { errorResponse, successResponse } from "@/core/lib/auth/api-response";
import prisma from "@/core/lib/prisma";

export async function GET() {
  try {
    const stats = await prisma.stats.findMany({
      orderBy: { order: "asc" },
    });

    console.log(stats);
    return successResponse(stats, "Stats retrieved successfully");
  } catch (error) {
    console.error("Error fetching stats:", error);
    return errorResponse("Failed to fetch stats", 500);
  }
}
