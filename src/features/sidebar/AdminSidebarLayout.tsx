"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/core/components/ui/breadcrumb";
import {
    SidebarProvider,
    SidebarTrigger,
} from "@/core/components/ui/sidebar";
import { Separator } from "@/core/components/ui/separator";
import { outfit } from "@/core/fonts/outfit";
import { useUserData } from "./hooks/useUserData";
import { AppSidebar } from "./components/app-sidebar";
import { IHeaderData, ISidebarLinks } from "./types/types";
import { SidebarInset } from "@/core/components/ui/sidebar";

export function ReusableSidebarLayout({ children, sidebarLinks, navHeaderData }: { children: React.ReactNode, sidebarLinks: ISidebarLinks, navHeaderData: IHeaderData }) {

    const pathname = usePathname();
    const userData = useUserData();

    return (
        <SidebarProvider className={outfit.className}>
            <AppSidebar
                headerData={navHeaderData}
                userData={userData}
                sidebarLinks={sidebarLinks}
            />
            <SidebarInset>
                <header className="flex border-b h-12 w-full top-0 fixed bg-background shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" variant="secondary" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <Link href="/admin" className="hover:text-foreground">
                                        Home
                                    </Link>
                                </BreadcrumbItem>
                                {pathname !== "/admin" && (
                                    <>
                                        {pathname.split("/").filter(Boolean).slice(1).map((segment, index, arr) => {
                                            const href = "/admin/" + arr.slice(0, index + 1).join("/");
                                            const isLast = index === arr.length - 1;
                                            const label = segment
                                                .split("-")
                                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                .join(" ");

                                            return (
                                                <div key={segment} className="flex items-center gap-2">
                                                    <BreadcrumbSeparator className="hidden md:block" />
                                                    <BreadcrumbItem>
                                                        {isLast ? (
                                                            <BreadcrumbLink className="text-foreground font-medium">
                                                                {label}
                                                            </BreadcrumbLink>
                                                        ) : (
                                                            <Link href={href} className="hover:text-foreground">
                                                                {label}
                                                            </Link>
                                                        )}
                                                    </BreadcrumbItem>
                                                </div>
                                            );
                                        })}
                                    </>
                                )}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4  pt-10">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}