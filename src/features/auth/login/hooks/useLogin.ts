"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res?.ok) {
        setError(res?.error || "Invalid credentials");
        setIsLoading(false);
        return;
      }

      router.push("/");
    } catch (err) {
      setError("An error occurred during login");
      setIsLoading(false);
    }
  };

  return { isLoading, error, handleLogin };
}