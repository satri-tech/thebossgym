import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { createMembershipPlanSchema } from "@/core/validators/membership-plan.validator";
import { ZodError } from "zod";

export async function GET() {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const plans = await prisma.membershipPlan.findMany({
      include: {
        features: {
          include: {
            feature: true,
          },
        },
      },
      orderBy: { displayOrder: "asc" },
    });
    return successResponse(plans, "Membership plans retrieved successfully");
  } catch (error) {
    console.error("Error fetching membership plans:", error);
    return errorResponse("Failed to fetch membership plans", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const body = await request.json();
    const validatedData = createMembershipPlanSchema.parse(body);

    const existingPlan = await prisma.membershipPlan.findUnique({
      where: {
        tier_billingCycle: {
          tier: validatedData.tier,
          billingCycle: validatedData.billingCycle,
        },
      },
    });

    if (existingPlan) {
      return errorResponse("A plan with this tier and billing cycle already exists", 409);
    }

    const { features, ...planData } = validatedData;

    const newPlan = await prisma.membershipPlan.create({
      data: {
        ...planData,
        features: {
          create: features,
        },
      },
      include: {
        features: {
          include: {
            feature: true,
          },
        },
      },
    });

    return successResponse(newPlan, "Membership plan created successfully", 201);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error creating membership plan:", error);
    return errorResponse("Failed to create membership plan", 500);
  }
}
