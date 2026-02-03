"use client"
import { ReusableSidebarLayout } from "@/features/sidebar/AdminSidebarLayout";
import { navAdminheaderData, adminSidebarLinks } from "@/features/sidebar/constants/constants";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ReusableSidebarLayout sidebarLinks={adminSidebarLinks} navHeaderData={navAdminheaderData}>
        {children}
    </ReusableSidebarLayout>;
}