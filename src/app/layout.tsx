import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton } from "next/font/google";
import "./globals.css";
import LayoutContent from "./layout-content";
import AuthProvider from "@/core/providers/auth-provider";
import { outfit } from "@/core/fonts/outfit";
import { Toaster } from "@/core/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Boss Gym",
  description: "The Boss Gym is a modern fitness center offering expert coaching, premium equipment, and a motivating environment to help you achieve real results.p",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${geistSans.variable} ${geistMono.variable} ${anton.variable} antialiased font-sans`}
        style={{ fontFamily: 'var(--font-outfit)' }}
      >
        <LayoutContent>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </LayoutContent>
      </body>
    </html>
  );
}
