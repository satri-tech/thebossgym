import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { updateTrainerSchema } from "@/core/validators/trainer.validator";
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

    const trainer = await prisma.trainer.findUnique({
      where: { id },
      include: {
        socialMedia: true,
      },
    });

    if (!trainer) {
      return errorResponse("Trainer not found", 404);
    }

    return successResponse(trainer, "Trainer retrieved successfully");
  } catch (error) {
    console.error("Error fetching trainer:", error);
    return errorResponse("Failed to fetch trainer", 500);
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { id } = await context.params;

    const existingTrainer = await prisma.trainer.findUnique({
      where: { id },
    });

    if (!existingTrainer) {
      return errorResponse("Trainer not found", 404);
    }

    const body = await request.json();
    const validatedData = updateTrainerSchema.parse(body);

    const updatedTrainer = await prisma.trainer.update({
      where: { id },
      data: validatedData,
      include: {
        socialMedia: true,
      },
    });

    return successResponse(updatedTrainer, "Trainer updated successfully");
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error updating trainer:", error);
    return errorResponse("Failed to update trainer", 500);
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { id } = await context.params;

    const existingTrainer = await prisma.trainer.findUnique({
      where: { id },
    });

    if (!existingTrainer) {
      return errorResponse("Trainer not found", 404);
    }

    await prisma.trainer.delete({
      where: { id },
    });

    return successResponse({ id, deleted: true }, "Trainer deleted successfully");
  } catch (error) {
    console.error("Error deleting trainer:", error);
    return errorResponse("Failed to delete trainer", 500);
  }
}
