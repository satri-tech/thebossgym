"use client";

import { useState } from "react";
import { useStats } from "../hooks/useStats";
import { Stat } from "../types/types";
import { StatTableRow } from "./StatTableRow";
import { StatDialog } from "./StatDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { SortableList } from "@/core/components/drag-and-drop/SortableList";
import { SortableItem } from "@/core/components/drag-and-drop/SortableItem";
import { Button } from "@/core/components/ui/button";
import { Plus, TrendingUp } from "lucide-react";
import { Skeleton } from "@/core/components/ui/skeleton";

export function StatsManager() {
  const { stats, loading, error, createStat, updateStat, deleteStat, reorderStats } = useStats();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState<Stat | null>(null);
  const [statToDelete, setStatToDelete] = useState<{ id: string; label: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (stat: Stat) => {
    setSelectedStat(stat);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const stat = stats.find((s) => s.id === id);
    if (stat) {
      setStatToDelete({ id: stat.id, label: stat.label });
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (!statToDelete) return;

    setIsDeleting(true);
    const result = await deleteStat(statToDelete.id);
    setIsDeleting(false);

    if (result.success) {
      setDeleteDialogOpen(false);
      setStatToDelete(null);
    }
  };

  const handleSubmit = async (data: any) => {
    if (selectedStat) {
      return await updateStat(selectedStat.id, data);
    } else {
      return await createStat(data);
    }
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedStat(null);
    }
  };

  const handleReorder = async (reorderedStats: Stat[]) => {
    // Update the order property for each stat based on new position
    const statsWithNewOrder = reorderedStats.map((stat, index) => ({
      ...stat,
      order: index,
    }));

    await reorderStats(statsWithNewOrder);
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p className="font-semibold">Error loading stats</p>
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
            <TrendingUp className="h-8 w-8" />
            Stats Management
          </h1>
          <p className="text-muted-foreground">
            Manage statistics displayed on your website. Drag to reorder.
          </p>
        </div>
        <Button className="gold-bg text-black" onClick={() => setDialogOpen(true)} disabled={loading}>
          <Plus className="h-4 w-4 mr-2" />
          Add Stat
        </Button>
      </div>

      {/* Stats Table */}
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
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        </div>
      ) : stats.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No stats yet</h3>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first stat
          </p>
          <Button onClick={() => setDialogOpen(true)} className="gold-bg  text-black">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Stat
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
              <div className="flex-1 text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider">
                Label
              </div>
              <div className="w-24 text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider text-right">
                Value
              </div>
              <div className="w-[64px] text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider">
                Actions
              </div>
            </div>
          </div>

          {/* Table Body */}
          <SortableList
            items={stats}
            onReorder={handleReorder}
            getItemId={(stat) => stat.id}
            renderItem={(stat) => (
              <SortableItem key={stat.id} id={stat.id}>
                <StatTableRow
                  stat={stat}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </SortableItem>
            )}
          />
        </div>
      )}

      {/* Dialogs */}
      <StatDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        stat={selectedStat}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        statLabel={statToDelete?.label || ""}
        isDeleting={isDeleting}
      />
    </div>
  );
}
