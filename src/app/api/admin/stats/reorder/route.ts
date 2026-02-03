import { NextRequest } from "next/server";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import {
  successResponse,
  errorResponse,
} from "@/core/lib/auth/api-response";
import prisma from "@/core/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const body = await request.json();
    const { orderedIds } = body;

    if (!Array.isArray(orderedIds)) {
      return errorResponse("Invalid data format", 400);
    }

    // Update order for each stat
    await Promise.all(
      orderedIds.map((id: string, index: number) =>
        prisma.stats.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    const updatedStats = await prisma.stats.findMany({
      orderBy: { order: "asc" },
    });

    return successResponse(updatedStats, "Stats reordered successfully");
  } catch (error) {
    console.error("Error reordering stats:", error);
    return errorResponse("Failed to reorder stats", 500);
  }
}
