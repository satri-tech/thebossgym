import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { createFeatureSchema } from "@/core/validators/feature.validator";
import { ZodError } from "zod";

export async function GET() {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const features = await prisma.feature.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return successResponse(features, "Features retrieved successfully");
  } catch (error) {
    console.error("Error fetching features:", error);
    return errorResponse("Failed to fetch features", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const body = await request.json();
    const validatedData = createFeatureSchema.parse(body);

    const existingFeature = await prisma.feature.findUnique({
      where: { name: validatedData.name },
    });

    if (existingFeature) {
      return errorResponse("A feature with this name already exists", 409);
    }

    const newFeature = await prisma.feature.create({
      data: validatedData,
    });

    return successResponse(newFeature, "Feature created successfully", 201);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error creating feature:", error);
    return errorResponse("Failed to create feature", 500);
  }
}
