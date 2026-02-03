import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { updateServiceSchema } from "@/core/validators/service.validator";
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

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        features: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!service) {
      return errorResponse("Service not found", 404);
    }

    return successResponse(service, "Service retrieved successfully");
  } catch (error) {
    console.error("Error fetching service:", error);
    return errorResponse("Failed to fetch service", 500);
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { id } = await context.params;

    const existingService = await prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      return errorResponse("Service not found", 404);
    }

    const body = await request.json();
    const validatedData = updateServiceSchema.parse(body);

    if (validatedData.order !== undefined && validatedData.order !== existingService.order) {
      const orderExists = await prisma.service.findFirst({
        where: { order: validatedData.order },
      });

      if (orderExists) {
        return errorResponse("A service with this order already exists", 409);
      }
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: validatedData,
      include: {
        features: {
          orderBy: { order: "asc" },
        },
      },
    });

    return successResponse(updatedService, "Service updated successfully");
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error updating service:", error);
    return errorResponse("Failed to update service", 500);
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { id } = await context.params;

    const existingService = await prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      return errorResponse("Service not found", 404);
    }

    await prisma.service.delete({
      where: { id },
    });

    return successResponse({ id, deleted: true }, "Service deleted successfully");
  } catch (error) {
    console.error("Error deleting service:", error);
    return errorResponse("Failed to delete service", 500);
  }
}
