"use client";

import { useState, useEffect } from "react";
import { Stat, CreateStatInput, UpdateStatInput } from "../types/types";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";

interface StatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stat?: Stat | null;
  onSubmit: (data: CreateStatInput | UpdateStatInput) => Promise<{ success: boolean; error?: string }>;
}

export function StatDialog({ open, onOpenChange, stat, onSubmit }: StatDialogProps) {
  const [formData, setFormData] = useState({
    label: "",
    value: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (stat) {
      setFormData({
        label: stat.label,
        value: stat.value,
      });
    } else {
      setFormData({
        label: "",
        value: "",
      });
    }
    setErrors({});
  }, [stat, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    const result = await onSubmit(formData);

    setSubmitting(false);

    if (result.success) {
      onOpenChange(false);
    } else if (result.error) {
      setErrors({ general: result.error });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{stat ? "Edit Stat" : "Create New Stat"}</DialogTitle>
          <DialogDescription>
            {stat ? "Update the stat information below." : "Add a new stat to display on your website."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {errors.general && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
              {errors.general}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="e.g., Happy Members"
              required
            />
            {errors.label && (
              <p className="text-sm text-destructive">{errors.label}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              placeholder="e.g., 1000+"
              required
            />
            {errors.value && (
              <p className="text-sm text-destructive">{errors.value}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={submitting}>
              {submitting ? "Saving..." : stat ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
