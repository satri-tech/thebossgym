import { NextRequest } from "next/server";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import {
  successResponse,
  errorResponse,
  validationError,
} from "@/core/lib/auth/api-response";
import { createStatsSchema } from "@/core/validators/stats.validator";
import { ZodError } from "zod";
import prisma from "@/core/lib/prisma";

export async function GET() {
  try {
    const stats = await prisma.stats.findMany({
      orderBy: { order: "asc" },
    });

    console.log(stats);
    return successResponse(stats, "Stats retrieved successfully");
  } catch (error) {
    console.error("Error fetching stats:", error);
    return errorResponse("Failed to fetch stats", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const body = await request.json();
    const validatedData = createStatsSchema.parse(body);

    const existingStat = await prisma.stats.findUnique({
      where: { label: validatedData.label },
    });

    if (existingStat) {
      return errorResponse("A stat with this label already exists", 409);
    }

    const existingOrder = await prisma.stats.findFirst({
      where: { order: validatedData.order },
    });

    if (existingOrder) {
      return errorResponse("A stat with this order already exists", 409);
    }

    const newStat = await prisma.stats.create({
      data: validatedData,
    });

    return successResponse(newStat, "Stat created successfully", 201);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error creating stat:", error);
    return errorResponse("Failed to create stat", 500);
  }
}
