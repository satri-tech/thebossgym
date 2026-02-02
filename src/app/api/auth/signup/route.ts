import prisma from "@/core/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    console.log(username, email, password);
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Please fill all the fields", success: false },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: "STAFF",
      },
    });
    if (!user) {
      return NextResponse.json({
        message: "User not created",
        success: false,
      });
    }
    return NextResponse.json(
      { message: "User Created Succesfully", success: true },
      { status: 201 },
    );
  } catch (error) {
    // Check if it's a Prisma error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Username or email already exists" },
          { status: 409 },
        );
      }
    }
    return NextResponse.json(
      { message: "Internal Server Errror", success: false },
      { status: 500 },
    );
  }
}
