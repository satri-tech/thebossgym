import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isValidToken = token && token.userId && token.email;
  if (isValidToken && (pathname.startsWith("/auth") || pathname === "/")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!isValidToken && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
