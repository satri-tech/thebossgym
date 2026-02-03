import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { updatePlanFeatureSchema } from "@/core/validators/plan-feature.validator";
import { ZodError } from "zod";

type RouteContext = {
  params: Promise<{ planId: string; featureId: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { planId, featureId } = await context.params;

    const existingPlanFeature = await prisma.planFeature.findUnique({
      where: {
        planId_featureId: {
          planId,
          featureId,
        },
      },
    });

    if (!existingPlanFeature) {
      return errorResponse("Plan feature not found", 404);
    }

    const body = await request.json();
    const validatedData = updatePlanFeatureSchema.parse(body);

    const updatedPlanFeature = await prisma.planFeature.update({
      where: {
        planId_featureId: {
          planId,
          featureId,
        },
      },
      data: validatedData,
      include: {
        feature: true,
      },
    });

    return successResponse(updatedPlanFeature, "Plan feature updated successfully");
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error updating plan feature:", error);
    return errorResponse("Failed to update plan feature", 500);
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { planId, featureId } = await context.params;

    const existingPlanFeature = await prisma.planFeature.findUnique({
      where: {
        planId_featureId: {
          planId,
          featureId,
        },
      },
    });

    if (!existingPlanFeature) {
      return errorResponse("Plan feature not found", 404);
    }

    await prisma.planFeature.delete({
      where: {
        planId_featureId: {
          planId,
          featureId,
        },
      },
    });

    return successResponse(
      { planId, featureId, deleted: true },
      "Feature removed from plan successfully"
    );
  } catch (error) {
    console.error("Error removing feature from plan:", error);
    return errorResponse("Failed to remove feature from plan", 500);
  }
}
