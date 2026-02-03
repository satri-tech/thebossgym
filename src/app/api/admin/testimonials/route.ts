import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { createTestimonialSchema } from "@/core/validators/testimonial.validator";
import { ZodError } from "zod";

export async function GET() {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return successResponse(testimonials, "Testimonials retrieved successfully");
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return errorResponse("Failed to fetch testimonials", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const body = await request.json();
    const validatedData = createTestimonialSchema.parse(body);

    const newTestimonial = await prisma.testimonial.create({
      data: validatedData,
    });

    return successResponse(newTestimonial, "Testimonial created successfully", 201);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error creating testimonial:", error);
    return errorResponse("Failed to create testimonial", 500);
  }
}
