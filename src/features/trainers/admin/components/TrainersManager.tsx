"use client";

import { useState } from "react";
import { useTrainers } from "../hooks/useTrainers";
import { Trainer } from "../../types/trainers.types";
import { TrainerTableRow } from "./TrainerTableRow";
import { TrainerDialog } from "./TrainerDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { SortableList } from "@/core/components/drag-and-drop/SortableList";
import { SortableItem } from "@/core/components/drag-and-drop/SortableItem";
import { Button } from "@/core/components/ui/button";
import { Plus, Users } from "lucide-react";
import { Skeleton } from "@/core/components/ui/skeleton";

export function TrainersManager() {
  const { trainers, loading, error, createTrainer, updateTrainer, deleteTrainer, reorderTrainers } = useTrainers();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [trainerToDelete, setTrainerToDelete] = useState<{ id: string; fullname: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const trainer = trainers.find((t) => t.id === id);
    if (trainer) {
      setTrainerToDelete({ id: trainer.id, fullname: trainer.fullname });
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (!trainerToDelete) return;

    setIsDeleting(true);
    const result = await deleteTrainer(trainerToDelete.id);
    setIsDeleting(false);

    if (result.success) {
      setDeleteDialogOpen(false);
      setTrainerToDelete(null);
    }
  };

  const handleSubmit = async (data: any) => {
    if (selectedTrainer) {
      return await updateTrainer(selectedTrainer.id, data);
    } else {
      return await createTrainer(data);
    }
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedTrainer(null);
    }
  };

  const handleReorder = async (reorderedTrainers: Trainer[]) => {
    // Update the order property for each trainer based on new position
    const trainersWithNewOrder = reorderedTrainers.map((trainer, index) => ({
      ...trainer,
      order: index,
    }));
    
    await reorderTrainers(trainersWithNewOrder);
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p className="font-semibold">Error loading trainers</p>
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
            <Users className="h-8 w-8" />
            Trainers Management
          </h1>
          <p className="text-muted-foreground">
            Manage trainers displayed on your website. Drag to reorder.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} disabled={loading}>
          <Plus className="h-4 w-4 mr-2" />
          Add Trainer
        </Button>
      </div>

      {/* Trainers Table */}
      {loading ? (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted/50 px-4 py-3 border-b">
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="divide-y">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-4">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        </div>
      ) : trainers.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No trainers yet</h3>
          <p className="text-muted-foreground mb-4">
            Get started by adding your first trainer
          </p>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Trainer
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden bg-card">
          {/* Table Header */}
          <div className="bg-muted/30 px-4 py-2.5 border-b">
            <div className="flex items-center gap-4">
              <div className="w-4"></div>
              <div className="w-12 text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider">
                Order
              </div>
              <div className="w-12 text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider">
                Image
              </div>
              <div className="flex-1 text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider">
                Name
              </div>
              <div className="w-40 text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider">
                Position
              </div>
              <div className="w-32 text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider">
                Social Media
              </div>
              <div className="w-[64px] text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider">
                Actions
              </div>
            </div>
          </div>

          {/* Table Body */}
          <SortableList
            items={trainers}
            onReorder={handleReorder}
            getItemId={(trainer) => trainer.id}
            renderItem={(trainer) => (
              <SortableItem key={trainer.id} id={trainer.id}>
                <TrainerTableRow
                  trainer={trainer}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </SortableItem>
            )}
          />
        </div>
      )}

      {/* Dialogs */}
      <TrainerDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        trainer={selectedTrainer}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        trainerName={trainerToDelete?.fullname || ""}
        isDeleting={isDeleting}
      />
    </div>
  );
}
