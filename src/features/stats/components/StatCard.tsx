"use client";

import { Stat } from "../types/types";
import { Card, CardContent } from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Pencil, Trash2, GripVertical } from "lucide-react";

interface StatCardProps {
  stat: Stat;
  onEdit: (stat: Stat) => void;
  onDelete: (id: string) => void;
}

export function StatCard({ stat, onEdit, onDelete }: StatCardProps) {
  return (
    <Card className="group hover:shadow-md transition-all duration-200 border-border/50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Drag Handle */}
          <div className="cursor-grab active:cursor-grabbing pt-1 text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors">
            <GripVertical className="h-5 w-5" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-muted-foreground mb-1 truncate">
              {stat.label}
            </div>
            <div className="text-2xl font-bold tracking-tight">
              {stat.value}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-muted"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(stat);
              }}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(stat.id);
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
