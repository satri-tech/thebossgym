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
          title: "",
          description: "",
          founderName: "",
          founderPosition: "",
          founderImage: "/founder/fallback.jpg",
        },
      });
    }

    // Ensure fallback image if none is set
    if (!founderMessage.founderImage) {
      founderMessage = {
        ...founderMessage,
        founderImage: "/founder/fallback.jpg",
      };
    }

    return successResponse(founderMessage, "Founder message retrieved successfully");
  } catch (error) {
    console.error("Error fetching founder message:", error);
    return errorResponse("Failed to fetch founder message", 500);
  }
}
