"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Facility } from "../types/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { FACILITIES_FALLBACK_IMAGE_URL } from "../constants/facilities.constants";

interface FacilityCardProps {
    facility: Facility;
    onEdit: (facility: Facility) => void;
    onDelete: (id: string) => void;
}

export function FacilityCard({ facility, onEdit, onDelete }: FacilityCardProps) {
    const isFallback = facility.image === FACILITIES_FALLBACK_IMAGE_URL;
    const [imageSrc, setImageSrc] = useState<string>(facility.image);

    useEffect(() => {
        setImageSrc(facility.image);
    }, [facility.image]);

    return (
        <Card className="group overflow-hidden border-border/60 bg-card/60 pt-0 backdrop-blur supports-backdrop-filter:bg-card/50 hover:shadow-lg hover:shadow-black/20 transition-all duration-200">
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image
                    src={imageSrc}
                    alt={facility.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    onError={() => {
                        if (imageSrc === FACILITIES_FALLBACK_IMAGE_URL) return;
                        setImageSrc(FACILITIES_FALLBACK_IMAGE_URL);
                    }}
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />

                <div className="absolute left-3 top-3 flex items-center gap-2">
                    <Badge
                        variant="secondary"
                        className="border border-white/10 bg-black/40 text-white/90"
                    >
                        Facility
                    </Badge>
                    {isFallback && (
                        <Badge
                            variant="secondary"
                            className="border border-white/10 bg-black/40 text-white/80"
                        >
                            No image
                        </Badge>
                    )}
                </div>
            </div>

            <CardHeader className="gap-1">
                <CardTitle className="line-clamp-2 text-lg leading-snug">
                    {facility.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-sm text-muted-foreground/80">
                    {facility.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onEdit(facility)}
                        className="flex-1 bg-muted/50 hover:bg-muted rounded-sm"
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(facility.id)}
                        className="flex-1 rounded-sm"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

