import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { updateFounderMessageSchema } from "@/core/validators/founder-message.validator";
import { ZodError } from "zod";

export async function PATCH(request: NextRequest) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const body = await request.json();
    const validatedData = updateFounderMessageSchema.parse(body);

    let founderMessage = await prisma.founderMessage.findUnique({
      where: { id: 1 },
    });

    if (!founderMessage) {
      founderMessage = await prisma.founderMessage.create({
        data: {
          id: 1,
          title: "",
          description: "",
          founderName: "",
          founderPosition: "",
          ...validatedData,
        },
      });
      return successResponse(founderMessage, "Founder message created successfully", 201);
    }

    const updatedFounderMessage = await prisma.founderMessage.update({
      where: { id: 1 },
      data: validatedData,
    });

    return successResponse(updatedFounderMessage, "Founder message updated successfully");
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error updating founder message:", error);
    return errorResponse("Failed to update founder message", 500);
  }
}
