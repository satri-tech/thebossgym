import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import {
  successResponse,
  errorResponse,
  validationError,
} from "@/core/lib/auth/api-response";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// PATCH - Update FAQ
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { id } = await context.params;
    const body = await request.json();
    const { question, answer } = body as {
      question?: string;
      answer?: string;
    };

    if (!question && !answer) {
      return validationError({ error: "At least one of question or answer is required" });
    }

    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        ...(question !== undefined ? { question } : {}),
        ...(answer !== undefined ? { answer } : {}),
      },
    });

    return successResponse(faq, "FAQ updated successfully");
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return errorResponse("Failed to update FAQ", 500);
  }
}

// DELETE - Delete FAQ
export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { id } = await context.params;

    await prisma.fAQ.delete({
      where: { id },
    });

    return successResponse(null, "FAQ deleted successfully");
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return errorResponse("Failed to delete FAQ", 500);
  }
}




