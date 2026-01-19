import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton } from "next/font/google";
import "./globals.css";
import Navbar from "@/features/navbar/components/NavBar";
import Footer from "@/features/footer/components/footer";

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
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} antialiased`}
      >
        <Navbar />
        {children}

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
