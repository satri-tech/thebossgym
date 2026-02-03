import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { updateFeatureSchema } from "@/core/validators/feature.validator";
import { ZodError } from "zod";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { id } = await context.params;

    const feature = await prisma.feature.findUnique({
      where: { id },
      include: {
        planFeatures: {
          include: {
            plan: true,
          },
        },
      },
    });

    if (!feature) {
      return errorResponse("Feature not found", 404);
    }

    return successResponse(feature, "Feature retrieved successfully");
  } catch (error) {
    console.error("Error fetching feature:", error);
    return errorResponse("Failed to fetch feature", 500);
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { id } = await context.params;

    const existingFeature = await prisma.feature.findUnique({
      where: { id },
    });

    if (!existingFeature) {
      return errorResponse("Feature not found", 404);
    }

    const body = await request.json();
    const validatedData = updateFeatureSchema.parse(body);

    if (validatedData.name && validatedData.name !== existingFeature.name) {
      const nameExists = await prisma.feature.findUnique({
        where: { name: validatedData.name },
      });

      if (nameExists) {
        return errorResponse("A feature with this name already exists", 409);
      }
    }

    const updatedFeature = await prisma.feature.update({
      where: { id },
      data: validatedData,
    });

    return successResponse(updatedFeature, "Feature updated successfully");
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error updating feature:", error);
    return errorResponse("Failed to update feature", 500);
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { id } = await context.params;

    const existingFeature = await prisma.feature.findUnique({
      where: { id },
    });

    if (!existingFeature) {
      return errorResponse("Feature not found", 404);
    }

    await prisma.feature.delete({
      where: { id },
    });

    return successResponse({ id, deleted: true }, "Feature deleted successfully");
  } catch (error) {
    console.error("Error deleting feature:", error);
    return errorResponse("Failed to delete feature", 500);
  }
}
