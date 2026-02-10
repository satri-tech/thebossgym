"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Textarea } from "@/core/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Spinner } from "@/core/components/ui/spinner";
import type { MembershipPlan } from "../types/types";

interface PlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: MembershipPlan | null;
  onSuccess: () => void;
}

interface FeatureInput {
  id?: string;
  text: string;
  isIncluded: boolean;
}

export function PlanDialog({
  open,
  onOpenChange,
  plan,
  onSuccess,
}: PlanDialogProps) {
  const [loading, setLoading] = useState(false);
  const [existingPlans, setExistingPlans] = useState<MembershipPlan[]>([]);
  const [formData, setFormData] = useState({
    tier: "BASIC" as "BASIC" | "STANDARD" | "PREMIUM",
    billingCycle: "MONTHLY" as "MONTHLY" | "YEARLY",
    price: "",
    name: "",
    description: "",
    isPopular: false,
    isActive: true,
  });
  const [features, setFeatures] = useState<FeatureInput[]>([]);

  // Fetch existing plans to check for duplicates
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("/api/admin/membership-plans");
        if (response.ok) {
          const data = await response.json();
          setExistingPlans(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    if (open) {
      fetchPlans();
    }
  }, [open]);

  useEffect(() => {
    if (plan) {
      setFormData({
        tier: plan.tier,
        billingCycle: plan.billingCycle,
        price: plan.price.toString(),
        name: plan.name,
        description: plan.description || "",
        isPopular: plan.isPopular,
        isActive: plan.isActive,
      });
      setFeatures(
        plan.features.map((feature) => ({
          id: feature.id,
          text: feature.text,
          isIncluded: feature.isIncluded,
        }))
      );
    } else {
      setFormData({
        tier: "BASIC",
        billingCycle: "MONTHLY",
        price: "",
        name: "",
        description: "",
        isPopular: false,
        isActive: true,
      });
      setFeatures([]);
    }
  }, [plan, open]);

  // Check if plan combination already exists
  const checkPlanExists = (tier: string, billingCycle: string) => {
    const exists = existingPlans.some(
      (p) => p.tier === tier && p.billingCycle === billingCycle && p.id !== plan?.id
    );

    if (exists) {
      toast.error(
        `A ${tier.toLowerCase()} ${billingCycle.toLowerCase()} plan already exists!`,
        {
          description: "Please choose a different tier or billing cycle combination.",
        }
      );
    }

    return exists;
  };

  const handleTierChange = (value: any) => {
    setFormData({ ...formData, tier: value });
    checkPlanExists(value, formData.billingCycle);
  };

  const handleBillingCycleChange = (value: any) => {
    setFormData({ ...formData, billingCycle: value });
    checkPlanExists(formData.tier, value);
  };

  const addFeature = () => {
    setFeatures([
      ...features,
      { text: "", isIncluded: true },
    ]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, field: keyof FeatureInput, value: any) => {
    setFeatures(
      features.map((f, i) => (i === index ? { ...f, [field]: value } : f))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for duplicate tier/billing cycle combination (for both create and edit)
    if (checkPlanExists(formData.tier, formData.billingCycle)) {
      return;
    }

    // Validate price
    const price = parseInt(formData.price);
    if (!formData.price || isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    // Validate features
    const validFeatures = features.filter(f => f.text.trim());
    if (validFeatures.length === 0) {
      toast.error("Please add at least one feature");
      return;
    }

    setLoading(true);

    try {
      if (plan) {
        // Update existing plan
        const planResponse = await fetch(`/api/admin/membership-plans/${plan.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            price,
          }),
        });

        if (!planResponse.ok) {
          const error = await planResponse.json();
          toast.error(error.message || "Failed to update plan");
          setLoading(false);
          return;
        }

        // Delete removed features and update existing ones
        const existingFeatureIds = plan.features.map(f => f.id);
        const currentFeatureIds = features.filter(f => f.id).map(f => f.id);
        const featuresToDelete = existingFeatureIds.filter(id => !currentFeatureIds.includes(id));

        // Delete removed features
        await Promise.all(
          featuresToDelete.map(featureId =>
            fetch(`/api/admin/membership-plans/${plan.id}/features/${featureId}`, {
              method: "DELETE",
            })
          )
        );

        // Update or create features
        await Promise.all(
          validFeatures.map(async (feature) => {
            if (feature.id) {
              // Update existing feature
              return fetch(`/api/admin/membership-plans/${plan.id}/features/${feature.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  text: feature.text,
                  isIncluded: feature.isIncluded,
                }),
              });
            } else {
              // Create new feature
              return fetch(`/api/admin/membership-plans/${plan.id}/features`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  text: feature.text,
                  isIncluded: feature.isIncluded,
                }),
              });
            }
          })
        );

        toast.success("Plan updated successfully");
      } else {
        // Create new plan with features
        const response = await fetch("/api/admin/membership-plans", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            price,
            features: validFeatures.map(f => ({
              text: f.text,
              isIncluded: f.isIncluded,
            })),
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          toast.error(error.message || "Failed to create plan");
          setLoading(false);
          return;
        }

        toast.success("Plan created successfully");
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving plan:", error);
      toast.error("Failed to save plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="pb-3">
          <DialogTitle className="text-xl">
            {plan ? "Edit Plan" : "Create Plan"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tier & Billing Cycle */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="tier" className="text-xs font-medium">Tier *</Label>
              <Select
                value={formData.tier}
                onValueChange={handleTierChange}
              >
                <SelectTrigger className="h-8 text-sm w-full rounded-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BASIC">Basic</SelectItem>
                  <SelectItem value="STANDARD">Standard</SelectItem>
                  <SelectItem value="PREMIUM">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="billingCycle" className="text-xs font-medium">Billing Cycle *</Label>
              <Select
                value={formData.billingCycle}
                onValueChange={handleBillingCycleChange}
              >
                <SelectTrigger className="h-8 text-sm w-full rounded-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="YEARLY">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Name & Price */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-medium">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Basic"
                className="h-8 text-sm"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="price" className="text-xs font-medium">Price (NPR) *</Label>
              <Input
                id="price"
                type="text"
                value={formData.price}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /^\d+$/.test(value)) {
                    setFormData({ ...formData, price: value });
                  }
                }}
                placeholder="e.g., 2000"
                className="h-8 text-sm"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs font-medium">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Optional description"
              className="min-h-16 text-sm resize-none"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPopular"
                checked={formData.isPopular}
                onChange={(e) =>
                  setFormData({ ...formData, isPopular: e.target.checked })
                }
                className="w-4 h-4 rounded accent-primary"
              />
              <Label htmlFor="isPopular" className="text-xs font-medium cursor-pointer">
                Mark as Popular
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="w-4 h-4 rounded accent-primary"
              />
              <Label htmlFor="isActive" className="text-xs font-medium cursor-pointer">
                Active
              </Label>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Features *</Label>
              <Button type="button" size="sm" variant="outline" onClick={addFeature} className="h-7 text-xs">
                <Plus className="w-3 h-3 mr-1" />
                Add
              </Button>
            </div>

            <div className="border rounded-lg divide-y max-h-48 overflow-y-auto bg-card/50">
              {features.map((feature, index) => (
                <div key={index} className="p-2.5 space-y-2">
                  <div className="flex items-start gap-2">
                    <button
                      type="button"
                      onClick={() => updateFeature(index, "isIncluded", !feature.isIncluded)}
                      className={`w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${feature.isIncluded
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-muted/50 text-muted-foreground border border-muted/30"
                        }`}
                    >
                      {feature.isIncluded ? "✓" : "✗"}
                    </button>
                    <Input
                      placeholder="Feature text"
                      value={feature.text}
                      onChange={(e) =>
                        updateFeature(index, "text", e.target.value)
                      }
                      className="h-7 text-xs flex-1"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      className="h-7 w-7 shrink-0"
                    >
                      <Trash2 className="w-3 h-3 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}

              {features.length === 0 && (
                <div className="p-6 text-center text-xs text-muted-foreground">
                  No features yet. Click "Add" to add features.
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="h-8 text-sm"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="h-8 text-sm bg-primary hover:bg-primary/90 text-primary-foreground">
              {loading && <Spinner className="w-3 h-3 mr-1.5" />}
              {plan ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
