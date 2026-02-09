import { NextRequest } from "next/server";
import prisma from "@/core/lib/prisma";
import { checkAuth } from "@/core/lib/auth/auth-utils";
import {
  successResponse,
  errorResponse,
  validationError,
} from "@/core/lib/auth/api-response";

// GET - List all FAQs
export async function GET(_request: NextRequest) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const faqs = await prisma.fAQ.findMany({
      orderBy: { createdAt: "desc" },
    });

    return successResponse(faqs, "FAQs fetched successfully");
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return errorResponse("Failed to fetch FAQs", 500);
  }
}

// POST - Create FAQ
export async function POST(request: NextRequest) {
  try {
    const authCheck = await checkAuth();
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const body = await request.json();
    const { question, answer } = body as {
      question: string;
      answer: string;
    };

    if (!question || !answer) {
      return validationError("Question and answer are required");
    }

    const faq = await prisma.fAQ.create({
      data: { question, answer },
    });

    return successResponse(faq, "FAQ created successfully", 201);
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return errorResponse("Failed to create FAQ", 500);
  }
}


