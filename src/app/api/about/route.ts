import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { successResponse, errorResponse } from "@/core/lib/auth/api-response";

export async function GET(request: NextRequest) {
  try {
    let about = await prisma.about.findUnique({
      where: { id: 1 },
    });

    // If no about section exists, create a default one
    if (!about) {
      about = await prisma.about.create({
        data: {
          id: 1,
          tag: "ABOUT THE BOSS GYM",
          heading: "WHERE CHAMPIONS ARE FORGED",
          highlight: "FORGED",
          description: "Welcome to our gym where we help you achieve your fitness goals.",
          buttonText: "START YOUR JOURNEY",
          buttonLink: "/contact",
        },
      });
    }

    return successResponse(about, "About section retrieved successfully");
  } catch (error) {
    console.error("Error fetching about:", error);
    return errorResponse("Failed to fetch about section", 500);
  }
}
