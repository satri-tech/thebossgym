import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { successResponse, errorResponse } from "@/core/lib/auth/api-response";

export async function GET() {
  try {
    let about = await prisma.about.findUnique({
      where: { id: 1 },
    });

    if (!about) {
      about = await prisma.about.create({
        data: {
          id: 1,
          description: "Welcome to The Boss Gym",
        },
      });
    }

    return successResponse(about, "About section retrieved successfully");
  } catch (error) {
    console.error("Error fetching about:", error);
    return errorResponse("Failed to fetch about section", 500);
  }
}
