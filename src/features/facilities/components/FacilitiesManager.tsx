"use client";

import { useState } from "react";
import { useFacilities } from "../hooks/useFacilities";
import { Facility } from "../types/types";
import { FacilityCard } from "./FacilityCard";
import { FacilityDialog } from "./FacilityDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { Button } from "@/core/components/ui/button";
import { Building, Plus } from "lucide-react";
import { Skeleton } from "@/core/components/ui/skeleton";
import { toast } from "sonner";

export function FacilitiesManager() {
  const { facilities, loading, error, createFacility, updateFacility, deleteFacility } = useFacilities();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [facilityToDelete, setFacilityToDelete] = useState<{ id: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (facility: Facility) => {
    setSelectedFacility(facility);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const facility = facilities.find((f) => f.id === id);
    if (facility) {
      setFacilityToDelete({ id: facility.id, title: facility.title });
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (!facilityToDelete) return;

    setIsDeleting(true);
    const result = await deleteFacility(facilityToDelete.id);
    setIsDeleting(false);

    if (result.success) {
      toast.success("Facility deleted successfully");
      setDeleteDialogOpen(false);
      setFacilityToDelete(null);
    } else {
      toast.error("Failed to delete facility", {
        description: result.error,
      });
    }
  };

  const handleSubmit = async (data: any, imageFile?: File) => {
    if (selectedFacility) {
      const result = await updateFacility(selectedFacility.id, data, imageFile);
      if (result.success) {
        toast.success("Facility updated successfully");
      } else {
        toast.error("Failed to update facility", {
          description: result.error,
        });
      }
      return result;
    } else {
      const result = await createFacility(data, imageFile);
      if (result.success) {
        toast.success("Facility created successfully");
      } else {
        toast.error("Failed to create facility", {
          description: result.error,
        });
      }
      return result;
    }
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedFacility(null);
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p className="font-semibold">Error loading facilities</p>
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
            <Building className="h-8 w-8" />
            Facilities Management
          </h1>
          <p className="text-muted-foreground">
            Manage facilities displayed on your website
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} disabled={loading}>
          <Plus className="h-4 w-4 mr-2" />
          Add Facility
        </Button>
      </div>

      {/* Facilities Grid */}
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
      ) : facilities.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No facilities yet</h3>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first facility
          </p>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Facility
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Dialogs */}
      <FacilityDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        facility={selectedFacility}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        facilityTitle={facilityToDelete?.title || ""}
        isDeleting={isDeleting}
      />
    </div>
  );
}

