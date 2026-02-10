import prisma from "@/core/lib/prisma";
import { successResponse, errorResponse } from "@/core/lib/auth/api-response";

export async function GET() {
  try {
    const plans = await prisma.membershipPlan.findMany({
      where: { isActive: true },
      include: {
        features: true,
      },
      orderBy: { displayOrder: "asc" },
    });
    return successResponse(plans, "Membership plans retrieved successfully");
  } catch (error) {
    console.error("Error fetching membership plans:", error);
    return errorResponse("Failed to fetch membership plans", 500);
  }
}
