"use client";

import { Trainer } from "../../types/trainers.types";
import { Button } from "@/core/components/ui/button";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/core/components/ui/tooltip";
import { cn } from "@/core/lib/utils";
import Image from "next/image";
import * as LucideIcons from "lucide-react";

interface TrainerTableRowProps {
  trainer: Trainer;
  onEdit: (trainer: Trainer) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
}

const getIconComponent = (iconName?: string | null) => {
  if (!iconName) return LucideIcons.Link;

  // Convert icon name to PascalCase for Lucide
  const pascalCase = iconName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  const IconComponent = (LucideIcons as any)[pascalCase];
  return IconComponent || LucideIcons.Link;
};

export function TrainerTableRow({ trainer, onEdit, onDelete, isDragging }: TrainerTableRowProps) {
  const imageUrl = trainer.image || "/trainers/fallback.jpg";

  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-3.5 border-b last:border-b-0 bg-background transition-all duration-200",
        "hover:bg-muted/30",
        isDragging && "opacity-40 bg-muted/50"
      )}
    >
      {/* Drag Handle */}
      <div className="cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors">
        <GripVertical className="h-4 w-4" />
      </div>

      {/* Order */}
      <div className="w-12 text-xs font-medium text-muted-foreground/70">
        #{(trainer.order ?? 0) + 1}
      </div>

      {/* Image */}
      <div className="w-12 h-12 relative rounded-full overflow-hidden bg-muted">
        <Image
          src={`/api/images${imageUrl}`}
          alt={trainer.fullname}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground/90 truncate">
          {trainer.fullname}
        </div>
        {trainer.experience && (
          <div className="text-xs text-muted-foreground truncate">
            {trainer.experience}
          </div>
        )}
      </div>

      {/* Position */}
      <div className="w-40">
        <div className="text-sm text-foreground/70 truncate">
          {trainer.position || "—"}
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="w-32">
        {trainer.socialMedia && trainer.socialMedia.length > 0 ? (
          <TooltipProvider>
            <div className="flex gap-1.5">
              {trainer.socialMedia.slice(0, 4).map((social) => {
                const IconComponent = getIconComponent(social.icon);
                return (
                  <Tooltip key={social.id}>
                    <TooltipTrigger asChild>
                      <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <IconComponent className="h-3.5 w-3.5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{social.title}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
              {trainer.socialMedia.length > 4 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground text-xs">
                      +{trainer.socialMedia.length - 4}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{trainer.socialMedia.length - 4} more</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </TooltipProvider>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground/60 hover:text-foreground hover:bg-muted/50"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(trainer);
          }}
        >
          <Pencil className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(trainer.id);
          }}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
