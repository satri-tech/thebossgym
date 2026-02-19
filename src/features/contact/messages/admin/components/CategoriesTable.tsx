'use client';

import { useState } from 'react';
import { useMessageCategories } from '../../hooks/useMessageCategories';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Loader2, Plus, Trash2, Edit2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';

export const CategoriesTable = () => {
  const { categories, isLoading, createCategory, updateCategory, deleteCategory } = useMessageCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      if (editingId) {
        await updateCategory(editingId, formData.name);
        setEditingId(null);
      } else {
        await createCategory(formData.name);
      }
      setFormData({ name: '' });
      setIsOpen(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (id: string, name: string) => {
    setEditingId(id);
    setFormData({ name });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingId(null);
    setFormData({ name: '' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Message Categories</h2>
          <p className="text-sm text-zinc-500 mt-1">{categories.length} total categories</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => { setEditingId(null); setFormData({ name: '' }); }}
              className="gold-bg  text-black"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edit Contact Category' : 'Add New Contact Category'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  placeholder="e.g., Membership Inquiry"
                  autoFocus
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" className="gold-bg  text-black">
                  {editingId ? 'Update Category' : 'Create Category'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      {categories.length === 0 ? (
        <div className="text-center py-12 border border-zinc-800 rounded-lg bg-zinc-900/20">
          <p className="text-zinc-500">No categories yet. Create one to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-zinc-800 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Category Name</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr
                  key={category.id}
                  className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors last:border-b-0"
                >
                  <td className="px-6 py-4 text-sm font-medium text-white">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(category.id, category.name)}
                        title="Edit category"
                        className="hover:bg-zinc-800 hover:text-yellow-500 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteCategory(category.id)}
                        title="Delete category"
                        className="hover:bg-red-900/30 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
