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

export const useMessages = (categoryId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const url = new URL('/api/admin/messages', window.location.origin);
      if (categoryId) url.searchParams.append('categoryId', categoryId);
      
      const response = await fetch(url.toString());
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string, isRead: boolean) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead }),
      });
      if (!response.ok) throw new Error('Failed to update message');
      const updated = await response.json();
      setMessages(messages.map(m => m.id === id ? updated : m));
    } catch (error) {
      console.error('Error updating message:', error);
      toast.error('Failed to update message');
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete message');
      setMessages(messages.filter(m => m.id !== id));
      toast.success('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [categoryId]);

  return {
    messages,
    loading,
    markAsRead,
    deleteMessage,
    refetch: fetchMessages,
  };
};
