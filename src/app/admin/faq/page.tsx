"use client";

import { useEffect, useState } from "react";
import { Button } from "@/core/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/core/components/ui/dialog";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Textarea } from "@/core/components/ui/textarea";
import { Spinner } from "@/core/components/ui/spinner";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, HelpCircle, AlertCircle } from "lucide-react";

type FAQ = {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
};

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<FAQ | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/faq");
      const data = await res.json();

      if (data.success) {
        setFaqs(data.data);
      } else {
        toast.error(data.error || "Failed to load FAQs");
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      toast.error("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openCreateDialog = () => {
    setEditingFaq(null);
    setQuestion("");
    setAnswer("");
    setDialogOpen(true);
  };

  const openEditDialog = (faq: FAQ) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      toast.error("Question and answer are required");
      return;
    }

    try {
      setSaving(true);

      const isEdit = !!editingFaq;
      const url = isEdit
        ? `/api/admin/faq/${editingFaq.id}`
        : "/api/admin/faq";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, answer }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.error || "Failed to save FAQ");
        return;
      }

      toast.success(isEdit ? "FAQ updated" : "FAQ created");
      setDialogOpen(false);
      setEditingFaq(null);
      setQuestion("");
      setAnswer("");
      await fetchFaqs();
    } catch (error) {
      console.error("Error saving FAQ:", error);
      toast.error("Failed to save FAQ");
    } finally {
      setSaving(false);
    }
  };

  const openDeleteDialog = (faq: FAQ) => {
    setFaqToDelete(faq);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!faqToDelete) return;

    try {
      setIsDeleting(true);

      const res = await fetch(`/api/admin/faq/${faqToDelete.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.error || "Failed to delete FAQ");
        return;
      }

      toast.success("FAQ deleted");
      setDeleteDialogOpen(false);
      setFaqToDelete(null);
      await fetchFaqs();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast.error("Failed to delete FAQ");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            FAQ Management
          </h1>
          <p className="text-muted-foreground">
            Manage frequently asked questions shown on your website.
          </p>
        </div>
        <Button onClick={openCreateDialog} disabled={loading} className="gold-bg  text-black">
          <Plus className="w-4 h-4 mr-2" />
          Add FAQ
        </Button>
      </div>

      {loading ? (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted/50 px-4 py-3 border-b">
            <div className="h-5 w-32 bg-muted animate-pulse rounded" />
          </div>
          <div className="divide-y">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="px-4 py-3 flex items-center gap-4"
              >
                <div className="h-4 w-8 bg-muted animate-pulse rounded" />
                <div className="h-4 flex-1 bg-muted animate-pulse rounded" />
                <div className="h-8 w-24 bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No FAQs yet</h3>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first FAQ
          </p>
          <Button onClick={openCreateDialog} className="gold-bg  text-black">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First FAQ
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden bg-card">
          {/* Table Header - styled similar to stats */}
          <div className="bg-muted/30 px-4 py-2.5 border-b">
            <div className="grid grid-cols-[2fr_3fr_auto] gap-4 items-center">
              <div className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider">
                Question
              </div>
              <div className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider">
                Answer
              </div>
              <div className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider text-right">
                Actions
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="px-4 py-3 grid grid-cols-[2fr_3fr_auto] gap-4 items-start"
              >
                <div className="font-medium text-foreground">
                  {faq.question}
                </div>
                <div className="text-sm text-muted-foreground whitespace-pre-line">
                  {faq.answer}
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openEditDialog(faq)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => openDeleteDialog(faq)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create / Edit FAQ Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open && !saving) {
            setDialogOpen(false);
            setEditingFaq(null);
            setQuestion("");
            setAnswer("");
          } else {
            setDialogOpen(open);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingFaq ? "Edit FAQ" : "Create FAQ"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. What are your opening hours?"
                disabled={saving}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={4}
                placeholder="Write a clear, helpful answer..."
                disabled={saving}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (!saving) {
                    setDialogOpen(false);
                    setEditingFaq(null);
                    setQuestion("");
                    setAnswer("");
                  }
                }}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="gold-bg  text-black">
                {saving ? (
                  <>
                    <Spinner className="w-4 h-4 mr-2" />
                    Saving...
                  </>
                ) : editingFaq ? (
                  "Save changes"
                ) : (
                  "Create FAQ"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog - similar to stats */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Delete FAQ
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <p className="text-sm">
              Are you sure you want to delete the FAQ{" "}
              <strong>&quot;{faqToDelete?.question || ""}&quot;</strong>?
            </p>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                className="flex-1"
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleConfirmDelete}
                className="flex-1"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
