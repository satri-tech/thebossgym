"use client";

import { Testimonial } from "../../types/types";
import { Card } from "@/core/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/core/components/ui/avatar";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
      {/* Stars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        "{testimonial.comment}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={testimonial.image || "/testimonials/fallback.jpg"}
            alt={testimonial.name}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.position}</p>
        </div>
      </div>
    </Card>
  );
}
