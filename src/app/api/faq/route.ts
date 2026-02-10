import prisma from "@/core/lib/prisma";
import { successResponse, errorResponse } from "@/core/lib/auth/api-response";

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { createdAt: "desc" },
    });
    return successResponse(faqs, "FAQs retrieved successfully");
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return errorResponse("Failed to fetch FAQs", 500);
  }
}
