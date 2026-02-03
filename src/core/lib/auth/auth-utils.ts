import { getServerSession } from "next-auth";
import { authOptions } from "@/core/lib/auth";
import { NextResponse } from "next/server";

export type AuthSession = {
  user: {
    id: string;
    email: string;
    role: string;
    isVerified: boolean;
  };
};

export async function getAuthSession(): Promise<AuthSession | null> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id || !session?.user?.email || !session?.user?.role) {
    return null;
  }

  return {
    user: {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role,
      isVerified: session.user.isVerified ?? false,
    },
  };
}

export function hasRequiredRole(userRole: string, allowedRoles: string[]): boolean {
  return allowedRoles.includes(userRole);
}

export async function checkAuth(allowedRoles: string[] = ["SUPER_ADMIN", "ADMIN"]) {
  const session = await getAuthSession();

  if (!session) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Unauthorized. Please login." },
        { status: 401 }
      ),
    };
  }

  if (!session.user.isVerified) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Account not verified. Please verify your email." },
        { status: 403 }
      ),
    };
  }

  if (!hasRequiredRole(session.user.role, allowedRoles)) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Forbidden. Insufficient permissions." },
        { status: 403 }
      ),
    };
  }

  return {
    authorized: true,
    session,
  };
}
