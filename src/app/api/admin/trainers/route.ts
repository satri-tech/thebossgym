import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { createTrainerSchema } from "@/core/validators/trainer.validator";
import { ZodError } from "zod";

export async function GET() {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const trainers = await prisma.trainer.findMany({
      include: {
        socialMedia: true,
      },
      orderBy: {
        order: "asc",
      },
    });
    return successResponse(trainers, "Trainers retrieved successfully");
  } catch (error) {
    console.error("Error fetching trainers:", error);
    return errorResponse("Failed to fetch trainers", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const body = await request.json();
    const validatedData = createTrainerSchema.parse(body);

    const { socialMedia, ...trainerData } = validatedData;

    // Get the current max order
    const maxOrderTrainer = await prisma.trainer.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = maxOrderTrainer ? maxOrderTrainer.order + 1 : 0;

    const newTrainer = await prisma.trainer.create({
      data: {
        ...trainerData,
        order: newOrder,
        socialMedia: {
          create: socialMedia,
        },
      },
      include: {
        socialMedia: true,
      },
    });

    return successResponse(newTrainer, "Trainer created successfully", 201);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error creating trainer:", error);
    return errorResponse("Failed to create trainer", 500);
  }
}
