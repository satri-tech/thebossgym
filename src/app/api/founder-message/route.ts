import prisma from "@/core/lib/prisma";
import { successResponse, errorResponse } from "@/core/lib/auth/api-response";

export async function GET() {
  try {
    let founderMessage = await prisma.founderMessage.findUnique({
      where: { id: 1 },
    });

    if (!founderMessage) {
      founderMessage = await prisma.founderMessage.create({
        data: {
          id: 1,
          title: "FROM THE FOUNDER",
          highlight: "FOUNDER",
          description: "",
          founderName: "",
          founderPosition: "",
          founderImage: null,
        },
      });
    }

    return successResponse(founderMessage, "Founder message retrieved successfully");
  } catch (error) {
    console.error("Error fetching founder message:", error);
    return errorResponse("Failed to fetch founder message", 500);
  }
}
