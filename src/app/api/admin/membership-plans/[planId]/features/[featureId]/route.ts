import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { ZodError, z } from "zod";

type RouteContext = {
  params: Promise<{ planId: string; featureId: string }>;
};

const updateFeatureSchema = z.object({
  text: z.string().min(1, "Feature text is required").optional(),
  isIncluded: z.boolean().optional(),
});

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { featureId } = await context.params;
    const body = await request.json();
    const validatedData = updateFeatureSchema.parse(body);

    const planFeature = await prisma.planFeature.update({
      where: { id: featureId },
      data: validatedData,
    });

    return successResponse(planFeature, "Feature updated successfully");
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

    const { featureId } = await context.params;

    await prisma.planFeature.delete({
      where: { id: featureId },
    });

    return successResponse({ id: featureId, deleted: true }, "Feature removed from plan successfully");
  } catch (error) {
    console.error("Error deleting feature:", error);
    return errorResponse("Failed to delete feature", 500);
  }
}
