"use client";

import { Smartphone } from "lucide-react";
import {
    Card, CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/core/components/ui/card";

export default function Settings() {

    return (
        <div className="min-h-screen bg-background">
            <div className="w-full  mx-auto p-6">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                        <p className="text-muted-foreground">
                            Manage your application preferences and appearance.
                        </p>
                    </div>

                    {/* Additional Settings Placeholder */}
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Smartphone className="h-5 w-5 text-primary" />
                                </div>
                                More Settings
                            </CardTitle>
                            <CardDescription>
                                Additional preferences and configurations coming soon.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
                                {[
                                    "Notifications",
                                    "Language",
                                    "Accessibility",
                                    "Privacy",
                                    "Data",
                                    "Account",
                                ].map((setting) => (
                                    <div
                                        key={setting}
                                        className="p-4 border rounded-lg bg-muted/20 cursor-pointer hover:scale-[1.01] transition-all duration-200 "
                                    >
                                        <h3 className="font-medium text-sm text-muted-foreground">
                                            {setting}
                                        </h3>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Coming soon
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
