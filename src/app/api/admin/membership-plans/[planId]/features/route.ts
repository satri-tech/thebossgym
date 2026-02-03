import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { createPlanFeatureSchema } from "@/core/validators/plan-feature.validator";
import { ZodError } from "zod";

type RouteContext = {
  params: Promise<{ planId: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { planId } = await context.params;

    const planFeatures = await prisma.planFeature.findMany({
      where: { planId },
      include: {
        feature: true,
      },
    });

    return successResponse(planFeatures, "Plan features retrieved successfully");
  } catch (error) {
    console.error("Error fetching plan features:", error);
    return errorResponse("Failed to fetch plan features", 500);
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { planId } = await context.params;

    const plan = await prisma.membershipPlan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return errorResponse("Membership plan not found", 404);
    }

    const body = await request.json();
    const validatedData = createPlanFeatureSchema.parse(body);

    if (validatedData.planId !== planId) {
      return errorResponse("Plan ID in body must match URL parameter", 400);
    }

    const feature = await prisma.feature.findUnique({
      where: { id: validatedData.featureId },
    });

    if (!feature) {
      return errorResponse("Feature not found", 404);
    }

    const existingPlanFeature = await prisma.planFeature.findUnique({
      where: {
        planId_featureId: {
          planId: validatedData.planId,
          featureId: validatedData.featureId,
        },
      },
    });

    if (existingPlanFeature) {
      return errorResponse("This feature is already added to the plan", 409);
    }

    const newPlanFeature = await prisma.planFeature.create({
      data: validatedData,
      include: {
        feature: true,
      },
    });

    return successResponse(newPlanFeature, "Feature added to plan successfully", 201);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error adding feature to plan:", error);
    return errorResponse("Failed to add feature to plan", 500);
  }
}
