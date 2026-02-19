"use client";

import { useState, useEffect } from "react";
import { useTestimonials } from "../hooks/useTestimonials";
import { Testimonial } from "../../types/types";
import { TestimonialCard } from "./TestimonialCard";
import { TestimonialDialog } from "./TestimonialDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { Button } from "@/core/components/ui/button";
import { Plus } from "lucide-react";
import { Skeleton } from "@/core/components/ui/skeleton";
import { toast } from "sonner";

export function TestimonialsManager() {
  const {
    testimonials,
    loading,
    error,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    refetch,
  } = useTestimonials();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);
  const [testimonialToDelete, setTestimonialToDelete] = useState<{
    id: string;
    name: string;
    image?: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const testimonial = testimonials.find((t) => t.id === id);
    if (testimonial) {
      setTestimonialToDelete({
        id: testimonial.id,
        name: testimonial.name,
        image: testimonial.image || undefined,
      });
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (!testimonialToDelete) return;

    setIsDeleting(true);
    const result = await deleteTestimonial(
      testimonialToDelete.id,
      testimonialToDelete.image
    );
    setIsDeleting(false);

    if (result.success) {
      toast.success("Testimonial deleted successfully");
      setDeleteDialogOpen(false);
      setTestimonialToDelete(null);
    } else {
      toast.error("Failed to delete testimonial", {
        description: result.error,
      });
    }
  };

  const handleSubmit = async (data: any) => {
    if (selectedTestimonial) {
      const result = await updateTestimonial(selectedTestimonial.id, data);
      if (result.success) {
        toast.success("Testimonial updated successfully");
      } else {
        toast.error("Failed to update testimonial", {
          description: result.error,
        });
      }
      return result;
    } else {
      const result = await createTestimonial(data);
      if (result.success) {
        toast.success("Testimonial created successfully");
      } else {
        toast.error("Failed to create testimonial", {
          description: result.error,
        });
      }
      return result;
    }
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedTestimonial(null);
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p className="font-semibold">Error loading testimonials</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Testimonials Management
          </h1>
          <p className="text-muted-foreground">
            Manage customer testimonials displayed on your website
          </p>
        </div>
        <Button className="gold-bg  text-black" onClick={() => setDialogOpen(true)} disabled={loading}>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {/* Testimonials Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <Skeleton className="aspect-square w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 flex-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <h3 className="text-lg font-semibold mb-2">No testimonials yet</h3>
          <p className="text-muted-foreground mb-4">
            Get started by adding your first testimonial
          </p>
          <Button onClick={() => setDialogOpen(true)} className="gold-bg  text-black">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Testimonial
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Dialogs */}
      <TestimonialDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        testimonial={selectedTestimonial}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        testimonialName={testimonialToDelete?.name || ""}
        isDeleting={isDeleting}
      />
    </div>
  );
}
