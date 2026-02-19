"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { Card } from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { toast } from "sonner";
import type { MembershipPlan } from "../types/types";
import { PlanDialog } from "./PlanDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

interface PlanManagerProps {
  plans: MembershipPlan[];
  onRefetch: () => void;
}

export function PlanManager({ plans, onRefetch }: PlanManagerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleEdit = (plan: MembershipPlan) => {
    setSelectedPlan(plan);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedPlan) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/membership-plans/${selectedPlan.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Plan deleted successfully");
        onRefetch();
        setDeleteDialogOpen(false);
        setSelectedPlan(null);
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to delete plan");
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
      toast.error("Failed to delete plan");
    } finally {
      setDeleting(false);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedPlan(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-4 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pricing Management</h1>
          <p className="text-muted-foreground">
            Manage membership plans and their features
          </p>
        </div>

        <Button onClick={() => setDialogOpen(true)} className="gold-bg  text-black">
          <Plus className="w-4 h-4 mr-2" />
          Add Plan
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className="p-4 relative flex flex-col h-full bg-card border-border hover:border-primary/50 transition-colors">
            {plan.isPopular && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                <Badge className="bg-primary text-primary-foreground text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              </div>
            )}

            <div className="flex-1 space-y-3">
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {!plan.isActive && (
                    <Badge variant="secondary" className="text-xs">Inactive</Badge>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary">{formatPrice(plan.price)}</span>
                  <span className="text-xs text-muted-foreground">/{plan.billingCycle.toLowerCase()}</span>
                </div>
              </div>

              {plan.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">{plan.description}</p>
              )}

              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground">Features:</p>
                <ul className="space-y-1">
                  {plan.features.map((feature) => (
                    <li key={feature.id} className="text-xs flex items-start gap-1.5">
                      <span className={`shrink-0 font-bold ${feature.isIncluded ? "text-primary" : "text-muted-foreground"}`}>
                        {feature.isIncluded ? "✓" : "✗"}
                      </span>
                      <span className="line-clamp-1">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-2 pt-3 mt-3 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-8 text-xs border-primary/30 hover:border-primary hover:bg-primary/5"
                onClick={() => handleEdit(plan)}
              >
                <Pencil className="w-3 h-3 mr-1.5" />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => {
                  setSelectedPlan(plan);
                  setDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        ))}

        {plans.length === 0 && (
          <Card className="p-8 text-center col-span-full bg-card/50 border-border">
            <p className="text-sm text-muted-foreground">No plans yet. Add your first plan!</p>
          </Card>
        )}
      </div>

      <PlanDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        plan={selectedPlan}
        onSuccess={() => {
          onRefetch();
          handleDialogClose();
        }}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Plan"
        description="Are you sure you want to delete this plan? This action cannot be undone."
      />
    </div>
  );
}
