'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useMessagesAdmin = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/messages');
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch messages';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${messageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });
      if (!response.ok) throw new Error('Failed to update message');
      
      setMessages(prev =>
        prev.map(msg => msg.id === messageId ? { ...msg, isRead: true } : msg)
      );
      toast.success('Message marked as read');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update message';
      toast.error(message);
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${messageId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete message');
      
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      toast.success('Message deleted');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete message';
      toast.error(message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages,
    isLoading,
    error,
    refetch: fetchMessages,
    markAsRead,
    deleteMessage,
  };
};
