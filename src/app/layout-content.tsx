"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/features/navbar/components/NavBar";
import Footer from "@/features/footer/components/footer";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthRoute = (pathname.startsWith("/auth") || pathname.startsWith("/admin"));

  return (
    <>
      {!isAuthRoute && <Navbar />}
      {children}
      {!isAuthRoute && <Footer />}
    </>
  );
}
