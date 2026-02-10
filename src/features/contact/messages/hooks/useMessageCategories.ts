'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface MessageCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const useMessageCategories = () => {
  const [categories, setCategories] = useState<MessageCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/message-categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch categories';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async (name: string) => {
    try {
      const response = await fetch('/api/admin/message-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error('Failed to create category');
      
      const newCategory = await response.json();
      setCategories(prev => [...prev, newCategory]);
      toast.success('Category created');
      return newCategory;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create category';
      toast.error(message);
      throw err;
    }
  };

  const updateCategory = async (id: string, name: string) => {
    try {
      const response = await fetch(`/api/admin/message-categories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error('Failed to update category');
      
      const updated = await response.json();
      setCategories(prev =>
        prev.map(cat => cat.id === id ? updated : cat)
      );
      toast.success('Category updated');
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update category';
      toast.error(message);
      throw err;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/message-categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete category');
      
      setCategories(prev => prev.filter(cat => cat.id !== id));
      toast.success('Category deleted');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete category';
      toast.error(message);
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
    refetch: fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
