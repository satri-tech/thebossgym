import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { updateAboutSchema } from "@/core/validators/about.validator";
import { ZodError } from "zod";

export async function PATCH(request: NextRequest) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const body = await request.json();
    const validatedData = updateAboutSchema.parse(body);

    let about = await prisma.about.findUnique({
      where: { id: 1 },
    });

    if (!about) {
      about = await prisma.about.create({
        data: {
          id: 1,
          description: "",
          ...validatedData,
        },
      });
      return successResponse(about, "About section created successfully", 201);
    }

    const updatedAbout = await prisma.about.update({
      where: { id: 1 },
      data: validatedData,
    });

    return successResponse(updatedAbout, "About section updated successfully");
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error updating about:", error);
    return errorResponse("Failed to update about section", 500);
  }
}
