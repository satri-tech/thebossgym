import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { ZodError, z } from "zod";

type RouteContext = {
  params: Promise<{ planId: string }>;
};

const createFeatureSchema = z.object({
  text: z.string().min(1, "Feature text is required"),
  isIncluded: z.boolean().default(true),
});

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { planId } = await context.params;
    const body = await request.json();
    const validatedData = createFeatureSchema.parse(body);

    const planFeature = await prisma.planFeature.create({
      data: {
        planId,
        text: validatedData.text,
        isIncluded: validatedData.isIncluded,
      },
    });

    return successResponse(planFeature, "Feature added to plan successfully", 201);
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
