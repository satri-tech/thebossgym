import prisma from "@/core/lib/prisma";
import { NextResponse } from "next/server";

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
