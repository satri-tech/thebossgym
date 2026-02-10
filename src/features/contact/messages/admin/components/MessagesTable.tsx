'use client';

import { useState } from 'react';
import { useMessagesAdmin } from '../../hooks/useMessagesAdmin';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Badge } from '@/core/components/ui/badge';
import { Loader2, Search, Filter, Trash2, Eye, EyeOff } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';

export const MessagesTable = () => {
  const { messages, isLoading, markAsRead, deleteMessage, refetch } = useMessagesAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>('all');

  const filteredMessages = messages.filter(msg => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterRead === 'all' ||
      (filterRead === 'read' && msg.isRead) ||
      (filterRead === 'unread' && !msg.isRead);

    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

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
          <h2 className="text-2xl font-semibold">Messages</h2>
          <p className="text-sm text-zinc-500 mt-1">
            {messages.length} total messages
            {unreadCount > 0 && (
              <Badge variant="default" className="ml-2">
                {unreadCount} unread
              </Badge>
            )}
          </p>
        </div>
        <Button onClick={refetch} variant="outline">
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            placeholder="Search by name, email, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterRead} onValueChange={(value: any) => setFilterRead(value)}>
          <SelectTrigger className="w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {filteredMessages.length === 0 ? (
        <div className="text-center py-12 border border-zinc-800 rounded-lg bg-zinc-900/20">
          <p className="text-zinc-500">No messages found</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-zinc-800 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Message</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Date</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((message) => (
                <tr key={message.id} className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors last:border-b-0">
                  <td className="px-6 py-4 text-sm font-medium text-white">{message.name}</td>
                  <td className="px-6 py-4 text-sm text-zinc-400">
                    <a href={`mailto:${message.email}`} className="hover:text-blue-400 transition-colors">
                      {message.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">
                    <a href={`tel:${message.phone}`} className="hover:text-blue-400 transition-colors">
                      {message.phone}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant="outline" className="bg-zinc-900/50">{message.category.name}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400 max-w-xs truncate">
                    {message.message}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant={message.isRead ? 'secondary' : 'default'}>
                      {message.isRead ? 'Read' : 'Unread'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500">
                    {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markAsRead(message.id)}
                        title={message.isRead ? 'Mark as unread' : 'Mark as read'}
                        className="hover:bg-zinc-800 hover:text-yellow-500 transition-colors"
                      >
                        {message.isRead ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteMessage(message.id)}
                        title="Delete message"
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
