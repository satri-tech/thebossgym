import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { updateTestimonialSchema } from "@/core/validators/testimonial.validator";
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

    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      return errorResponse("Testimonial not found", 404);
    }

    return successResponse(testimonial, "Testimonial retrieved successfully");
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return errorResponse("Failed to fetch testimonial", 500);
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { id } = await context.params;

    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!existingTestimonial) {
      return errorResponse("Testimonial not found", 404);
    }

    const body = await request.json();
    const validatedData = updateTestimonialSchema.parse(body);

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: validatedData,
    });

    return successResponse(updatedTestimonial, "Testimonial updated successfully");
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error updating testimonial:", error);
    return errorResponse("Failed to update testimonial", 500);
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { id } = await context.params;

    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!existingTestimonial) {
      return errorResponse("Testimonial not found", 404);
    }

    await prisma.testimonial.delete({
      where: { id },
    });

    return successResponse({ id, deleted: true }, "Testimonial deleted successfully");
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return errorResponse("Failed to delete testimonial", 500);
  }
}
