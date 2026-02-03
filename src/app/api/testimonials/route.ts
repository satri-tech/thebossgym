import prisma from "@/core/lib/prisma";
import { successResponse, errorResponse } from "@/core/lib/auth/api-response";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return successResponse(testimonials, "Testimonials retrieved successfully");
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return errorResponse("Failed to fetch testimonials", 500);
  }
}
