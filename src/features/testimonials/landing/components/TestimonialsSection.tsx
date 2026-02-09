"use client";

import { useEffect } from "react";
import { useTestimonialsLanding } from "../hooks/useTestimonialsLanding";
import { TestimonialCard } from "./TestimonialCard";
import { Skeleton } from "@/core/components/ui/skeleton";

export function TestimonialsSection() {
  const { testimonials, loading, error, refetch } = useTestimonialsLanding();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load testimonials</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">What Our Members Say</h2>
        <p className="text-muted-foreground">
          Real experiences from our valued gym members
        </p>
      </div>

      {/* Testimonials Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-lg p-6 space-y-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Skeleton key={j} className="h-4 w-4" />
                ))}
              </div>
              <Skeleton className="h-20 w-full" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No testimonials available yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      )}
    </div>
  );
}
