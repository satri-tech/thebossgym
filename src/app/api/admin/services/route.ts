import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import { successResponse, errorResponse, validationError } from "@/core/lib/auth/api-response";
import { createServiceSchema } from "@/core/validators/service.validator";
import { ZodError } from "zod";

export async function GET() {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const services = await prisma.service.findMany({
      include: {
        features: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    });
    return successResponse(services, "Services retrieved successfully");
  } catch (error) {
    console.error("Error fetching services:", error);
    return errorResponse("Failed to fetch services", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const body = await request.json();
    const validatedData = createServiceSchema.parse(body);

    // Auto-calculate order if not provided
    let order = validatedData.order;
    if (order === undefined || order === null) {
      const maxOrderService = await prisma.service.findFirst({
        orderBy: { order: "desc" },
        select: { order: true },
      });
      order = maxOrderService ? maxOrderService.order + 1 : 0;
    } else {
      // Check if order already exists
      const existingOrder = await prisma.service.findFirst({
        where: { order },
      });

      if (existingOrder) {
        return errorResponse("A service with this order already exists", 409);
      }
    }

    const { features, ...serviceData } = validatedData;

    const newService = await prisma.service.create({
      data: {
        ...serviceData,
        order,
        features: {
          create: features,
        },
      },
      include: {
        features: true,
      },
    });

    return successResponse(newService, "Service created successfully", 201);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const path = err.path.join(".");
        acc[path] = err.message;
        return acc;
      }, {});
      return validationError(errors);
    }
    console.error("Error creating service:", error);
    return errorResponse("Failed to create service", 500);
  }
}
