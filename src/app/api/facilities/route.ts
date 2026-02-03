import prisma from "@/core/lib/prisma";
import { successResponse, errorResponse } from "@/core/lib/auth/api-response";

export async function GET() {
  try {
    const facilities = await prisma.facilities.findMany();
    return successResponse(facilities, "Facilities retrieved successfully");
  } catch (error) {
    console.error("Error fetching facilities:", error);
    return errorResponse("Failed to fetch facilities", 500);
  }
}
