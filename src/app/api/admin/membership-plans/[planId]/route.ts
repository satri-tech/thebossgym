import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { updateMembershipPlanSchema } from "@/core/validators/membership-plan.validator";
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

    const plan = await prisma.membershipPlan.findUnique({
      where: { id: planId },
      include: {
        features: true,
      },
    });

    if (!plan) {
      return errorResponse("Membership plan not found", 404);
    }

    return successResponse(plan, "Membership plan retrieved successfully");
  } catch (error) {
    console.error("Error fetching membership plan:", error);
    return errorResponse("Failed to fetch membership plan", 500);
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { planId } = await context.params;

    const existingPlan = await prisma.membershipPlan.findUnique({
      where: { id: planId },
    });

    if (!existingPlan) {
      return errorResponse("Membership plan not found", 404);
    }

    const body = await request.json();
    const validatedData = updateMembershipPlanSchema.parse(body);

    // Check for uniqueness of tier/billingCycle combination if either is being updated
    if (validatedData.tier || validatedData.billingCycle) {
      const tierToCheck = validatedData.tier || existingPlan.tier;
      const billingCycleToCheck = validatedData.billingCycle || existingPlan.billingCycle;

      const duplicatePlan = await prisma.membershipPlan.findFirst({
        where: {
          tier: tierToCheck,
          billingCycle: billingCycleToCheck,
          id: { not: planId }, // Exclude current plan
        },
      });

      if (duplicatePlan) {
        return errorResponse(
          `A ${tierToCheck.toLowerCase()} ${billingCycleToCheck.toLowerCase()} plan already exists`,
          400
        );
      }
    }

    const updatedPlan = await prisma.membershipPlan.update({
      where: { id: planId },
      data: validatedData,
      include: {
        features: true,
      },
    });

    return successResponse(updatedPlan, "Membership plan updated successfully");
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error updating membership plan:", error);
    return errorResponse("Failed to update membership plan", 500);
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { planId } = await context.params;

    const existingPlan = await prisma.membershipPlan.findUnique({
      where: { id: planId },
    });

    if (!existingPlan) {
      return errorResponse("Membership plan not found", 404);
    }

    await prisma.membershipPlan.delete({
      where: { id: planId },
    });

    return successResponse({ id: planId, deleted: true }, "Membership plan deleted successfully");
  } catch (error) {
    console.error("Error deleting membership plan:", error);
    return errorResponse("Failed to delete membership plan", 500);
  }
}
