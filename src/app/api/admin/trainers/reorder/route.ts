import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse } from "@/core/lib/auth/api-response";

export async function PATCH(request: NextRequest) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const body = await request.json();
    const { orderedIds } = body;

    if (!Array.isArray(orderedIds)) {
      return errorResponse("orderedIds must be an array", 400);
    }

    // Update the order for each trainer
    const updatePromises = orderedIds.map((id, index) =>
      prisma.trainer.update({
        where: { id },
        data: { order: index },
      })
    );

    await Promise.all(updatePromises);

    // Fetch updated trainers
    const trainers = await prisma.trainer.findMany({
      include: {
        socialMedia: true,
      },
      orderBy: {
        order: "asc",
      },
    });

    return successResponse(trainers, "Trainers reordered successfully");
  } catch (error) {
    console.error("Error reordering trainers:", error);
    return errorResponse("Failed to reorder trainers", 500);
  }
}
