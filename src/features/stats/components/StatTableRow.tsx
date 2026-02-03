"use client";

import { Stat } from "../types/types";
import { Button } from "@/core/components/ui/button";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import { cn } from "@/core/lib/utils";

interface StatTableRowProps {
  stat: Stat;
  onEdit: (stat: Stat) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
}

export function StatTableRow({ stat, onEdit, onDelete, isDragging }: StatTableRowProps) {
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
        #{stat.order + 1}
      </div>

      {/* Label */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground/90 truncate">
          {stat.label}
        </div>
      </div>

      {/* Value */}
      <div className="w-24">
        <div className="text-sm font-semibold text-foreground/80 text-right tabular-nums">
          {stat.value}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground/60 hover:text-foreground hover:bg-muted/50"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(stat);
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
            onDelete(stat.id);
          }}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
