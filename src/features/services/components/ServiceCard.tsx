"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Service } from "../types/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { SERVICES_CONFIG } from "../constants/services.constants";

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}

export function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
  const isFallback = service.image === SERVICES_CONFIG.FALLBACK_IMAGE;
  const [imageSrc, setImageSrc] = useState<string>(service.image);

  useEffect(() => {
    setImageSrc(service.image);
  }, [service.image]);

  return (
    <Card className="group overflow-hidden gap-4 border-border/60 bg-card/60 pt-0 backdrop-blur supports-backdrop-filter:bg-card/50 hover:shadow-lg hover:shadow-black/20 transition-all duration-200">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={imageSrc}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          onError={() => {
            if (imageSrc === SERVICES_CONFIG.FALLBACK_IMAGE) return;
            setImageSrc(SERVICES_CONFIG.FALLBACK_IMAGE);
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />
      </div>

      <CardHeader className="gap-0">
        <CardTitle className="line-clamp-2 text-lg leading-snug">
          {service.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-sm text-muted-foreground/80">
          {service.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-2">
          {service.features.length > 0 && (
            <div className="border-t border-border/40 pt-3">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Features ({service.features.length})
              </p>
              <ul className="space-y-1">
                {service.features.map((feature) => (
                  <li key={feature.id} className="text-xs text-muted-foreground">
                    • {feature.feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEdit(service)}
              className="flex-1 bg-muted/50 hover:bg-muted rounded-sm"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(service.id)}
              className="flex-1 rounded-sm"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
