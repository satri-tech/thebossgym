import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import {
  successResponse,
  errorResponse,
  validationError,
} from "@/core/lib/auth/api-response";
import { updateStatsSchema } from "@/core/validators/stats.validator";
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

    const stat = await prisma.stats.findUnique({
      where: { id },
    });

    if (!stat) {
      return errorResponse("Stat not found", 404);
    }

    return successResponse(stat, "Stat retrieved successfully");
  } catch (error) {
    console.error("Error fetching stat:", error);
    return errorResponse("Failed to fetch stat", 500);
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { id } = await context.params;

    const existingStat = await prisma.stats.findUnique({
      where: { id },
    });

    if (!existingStat) {
      return errorResponse("Stat not found", 404);
    }

    const body = await request.json();
    const validatedData = updateStatsSchema.parse(body);

    if (validatedData.label && validatedData.label !== existingStat.label) {
      const labelExists = await prisma.stats.findUnique({
        where: { label: validatedData.label },
      });

      if (labelExists) {
        return errorResponse("A stat with this label already exists", 409);
      }
    }

    const updatedStat = await prisma.stats.update({
      where: { id },
      data: validatedData,
    });

    return successResponse(updatedStat, "Stat updated successfully");
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error updating stat:", error);
    return errorResponse("Failed to update stat", 500);
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { id } = await context.params;

    const existingStat = await prisma.stats.findUnique({
      where: { id },
    });

    if (!existingStat) {
      return errorResponse("Stat not found", 404);
    }

    await prisma.stats.delete({
      where: { id },
    });

    return successResponse({ id, deleted: true }, "Stat deleted successfully");
  } catch (error) {
    console.error("Error deleting stat:", error);
    return errorResponse("Failed to delete stat", 500);
  }
}
