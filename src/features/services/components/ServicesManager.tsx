"use client";

import { useState } from "react";
import { useServices } from "../hooks/useServices";
import { Service } from "../types/types";
import { ServiceCard } from "./ServiceCard";
import { ServiceDialog } from "./ServiceDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { Button } from "@/core/components/ui/button";
import { Plus } from "lucide-react";
import { Skeleton } from "@/core/components/ui/skeleton";
import { toast } from "sonner";

export function ServicesManager() {
  const { services, loading, error, createService, updateService, deleteService } = useServices();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<{ id: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const service = services.find((s) => s.id === id);
    if (service) {
      setServiceToDelete({ id: service.id, title: service.title });
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (!serviceToDelete) return;

    setIsDeleting(true);
    const result = await deleteService(serviceToDelete.id);
    setIsDeleting(false);

    if (result.success) {
      toast.success("Service deleted successfully");
      setDeleteDialogOpen(false);
      setServiceToDelete(null);
    } else {
      toast.error("Failed to delete service", {
        description: result.error,
      });
    }
  };

  const handleSubmit = async (data: any, imageFile?: File) => {
    if (selectedService) {
      const result = await updateService(selectedService.id, data, imageFile);
      if (result.success) {
        toast.success("Service updated successfully");
      } else {
        toast.error("Failed to update service", {
          description: result.error,
        });
      }
      return result;
    } else {
      const result = await createService(data, imageFile);
      if (result.success) {
        toast.success("Service created successfully");
      } else {
        toast.error("Failed to create service", {
          description: result.error,
        });
      }
      return result;
    }
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedService(null);
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p className="font-semibold">Error loading services</p>
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
            Services Management
          </h1>
          <p className="text-muted-foreground">
            Manage services displayed on your website
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} disabled={loading} className="gold-bg  text-black">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
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
      ) : services.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <h3 className="text-lg font-semibold mb-2">No services yet</h3>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first service
          </p>
          <Button onClick={() => setDialogOpen(true)} className="gold-bg  text-black">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Service
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Dialogs */}
      <ServiceDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        service={selectedService}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        serviceTitle={serviceToDelete?.title || ""}
        isDeleting={isDeleting}
      />
    </div>
  );
}
