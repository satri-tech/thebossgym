"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Service } from "../types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { SERVICES_CONFIG } from "../constants/services.constants";

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}

export function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
  const [imageSrc, setImageSrc] = useState<string>(service.image);

  useEffect(() => {
    setImageSrc(service.image);
  }, [service.image]);

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-border gap-4 py-0 bg-card hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={`/api/images${imageSrc}`}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => {
            if (imageSrc === SERVICES_CONFIG.FALLBACK_IMAGE) return;
            setImageSrc(SERVICES_CONFIG.FALLBACK_IMAGE);
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/80 via-background/20 to-transparent" />
      </div>

      {/* Header */}
      <CardHeader className="gap-1.5">
        <CardTitle className="line-clamp-2 text-lg leading-tight">
          {service.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-sm text-muted-foreground leading-relaxed">
          {service.description}
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex-1 pt-0 ">
        {service.features.length > 0 && (
          <div className="border-t border-border pt-3">
            <p className="mb-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Features ({service.features.length})
            </p>
            <ul className="space-y-1.5 max-h-28 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              {service.features.map((feature) => (
                <li
                  key={feature.id}
                  className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2"
                >
                  <span className="text-primary mt-0.5">•</span>
                  <span className="flex-1">{feature.feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="mt-auto pt-0 pb-5 px-5">
        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(service)}
            className="flex-1 h-9"
          >
            <Edit className="h-3.5 w-3.5 mr-1.5" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(service.id)}
            className="flex-1 h-9 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}