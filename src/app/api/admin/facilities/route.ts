import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { createFacilitiesSchema } from "@/core/validators/facilities.validator";
import { ZodError } from "zod";

export async function GET() {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const facilities = await prisma.facilities.findMany();
    return successResponse(facilities, "Facilities retrieved successfully");
  } catch (error) {
    console.error("Error fetching facilities:", error);
    return errorResponse("Failed to fetch facilities", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const body = await request.json();
    const validatedData = createFacilitiesSchema.parse(body);

    const newFacility = await prisma.facilities.create({
      data: validatedData,
    });

    return successResponse(newFacility, "Facility created successfully", 201);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error creating facility:", error);
    return errorResponse("Failed to create facility", 500);
  }
}
