import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { updateFacilitiesSchema } from "@/core/validators/facilities.validator";
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

    const facility = await prisma.facilities.findUnique({
      where: { id },
    });

    if (!facility) {
      return errorResponse("Facility not found", 404);
    }

    return successResponse(facility, "Facility retrieved successfully");
  } catch (error) {
    console.error("Error fetching facility:", error);
    return errorResponse("Failed to fetch facility", 500);
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { id } = await context.params;

    const existingFacility = await prisma.facilities.findUnique({
      where: { id },
    });

    if (!existingFacility) {
      return errorResponse("Facility not found", 404);
    }

    const body = await request.json();
    const validatedData = updateFacilitiesSchema.parse(body);

    const updatedFacility = await prisma.facilities.update({
      where: { id },
      data: validatedData,
    });

    return successResponse(updatedFacility, "Facility updated successfully");
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error updating facility:", error);
    return errorResponse("Failed to update facility", 500);
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { id } = await context.params;

    const existingFacility = await prisma.facilities.findUnique({
      where: { id },
    });

    if (!existingFacility) {
      return errorResponse("Facility not found", 404);
    }

    await prisma.facilities.delete({
      where: { id },
    });

    return successResponse({ id, deleted: true }, "Facility deleted successfully");
  } catch (error) {
    console.error("Error deleting facility:", error);
    return errorResponse("Failed to delete facility", 500);
  }
}
