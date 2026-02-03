import prisma from "@/core/lib/prisma";
import { successResponse, errorResponse } from "@/core/lib/auth/api-response";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: {
        features: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    });
    return successResponse(services, "Services retrieved successfully");
  } catch (error) {
    console.error("Error fetching services:", error);
    return errorResponse("Failed to fetch services", 500);
  }
}
