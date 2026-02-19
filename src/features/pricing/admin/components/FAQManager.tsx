"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { Card } from "@/core/components/ui/card";
import { toast } from "sonner";
import type { FAQ } from "../types/types";
import { FAQDialog } from "./FAQDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

interface FAQManagerProps {
  faqs: FAQ[];
  onRefetch: () => void;
}

export function FAQManager({ faqs, onRefetch }: FAQManagerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleEdit = (faq: FAQ) => {
    setSelectedFAQ(faq);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedFAQ) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/faq/${selectedFAQ.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("FAQ deleted successfully");
        onRefetch();
        setDeleteDialogOpen(false);
        setSelectedFAQ(null);
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to delete FAQ");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast.error("Failed to delete FAQ");
    } finally {
      setDeleting(false);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedFAQ(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">FAQs</h2>
          <p className="text-sm text-muted-foreground">
            Manage frequently asked questions
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="gold-bg  text-black">
          <Plus className="w-4 h-4 mr-2" />
          Add FAQ
        </Button>
      </div>

      <div className="grid gap-4">
        {faqs.map((faq) => (
          <Card key={faq.id} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(faq)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedFAQ(faq);
                    setDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {faqs.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No FAQs yet. Add your first FAQ!</p>
          </Card>
        )}
      </div>

      <FAQDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        faq={selectedFAQ}
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
        title="Delete FAQ"
        description="Are you sure you want to delete this FAQ? This action cannot be undone."
      />
    </div>
  );
}
