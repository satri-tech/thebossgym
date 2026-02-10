import prisma from "@/core/lib/prisma";
import { contactInfoUpdateValidator } from "@/core/validators/contact-info.validator";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    let contactInfo = await prisma.contactInfo.findUnique({
      where: { id: 1 },
    });

    // If no contact info exists, create a default one
    if (!contactInfo) {
      contactInfo = await prisma.contactInfo.create({
        data: {
          id: 1,
          phone: "",
          phoneLabel: "Get in touch with our team for immediate assistance.",
          address: "",
          addressLabel: "Come visit our state-of-the-art facility in Pokhara.",
          email: "",
          emailLabel: "Send us an email and we'll respond within 24 hours.",
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: contactInfo,
    });
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return NextResponse.json(
      { message: "Failed to fetch contact information" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = contactInfoUpdateValidator.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          message: "Validation failed",
          errors,
        },
        { status: 400 },
      );
    }

    // Filter out undefined values
    const updateData = Object.fromEntries(
      Object.entries(validation.data).filter(([, value]) => value !== undefined)
    );

    const contactInfo = await prisma.contactInfo.update({
      where: { id: 1 },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: contactInfo,
    });
  } catch (error) {
    console.error("Error updating contact info:", error);
    return NextResponse.json(
      { message: "Failed to update contact information" },
      { status: 500 },
    );
  }
}
