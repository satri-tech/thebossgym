"use client";

import { Testimonial } from "../../types/types";
import { Button } from "@/core/components/ui/button";
import { Card } from "@/core/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  testimonial: Testimonial;
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => void;
}

export function TestimonialCard({
  testimonial,
  onEdit,
  onDelete,
}: TestimonialCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all py-0 duration-300 border-border bg-card flex flex-col h-full">
      <div className="p-5 space-y-5 flex-1 flex flex-col">
        {/* Profile Section */}
        <div className="flex items-center gap-3.5">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-muted ring-1 ring-border">
              <Image
                src={testimonial.image || "/testimonials/fallback.jpg"}
                alt={testimonial.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
          </div>

          {/* Name and Position */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-base leading-tight mb-0.5">
              {testimonial.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-tight">
              {testimonial.position}
            </p>
          </div>
        </div>

        {/* Comment Section */}
        <div className="flex-1">
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {testimonial.comment}
          </p>
        </div>

        {/* Action Buttons - Now at bottom */}
        <div className="flex gap-2 mt-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-9"
            onClick={() => onEdit(testimonial)}
          >
            <Edit className="h-3.5 w-3.5 mr-1.5" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-9 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(testimonial.id)}
          >
            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}