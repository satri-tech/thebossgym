'use client';

import { Card } from '@/core/components/ui/card';
import { Badge } from '@/core/components/ui/badge';
import { Button } from '@/core/components/ui/button';
import { Mail, Phone, User, Trash2, Eye, EyeOff } from 'lucide-react';
import { Message } from '../../hooks/useMessagesAdmin';
import { formatDistanceToNow } from 'date-fns';

interface MessageCardProps {
  message: Message;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const MessageCard = ({ message, onMarkAsRead, onDelete }: MessageCardProps) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">{message.name}</h3>
              <Badge variant={message.isRead ? 'secondary' : 'default'}>
                {message.isRead ? 'Read' : 'Unread'}
              </Badge>
            </div>
            <p className="text-sm text-zinc-500">
              {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
            </p>
          </div>
          <Badge variant="outline">{message.category.name}</Badge>
        </div>

        {/* Contact Info */}
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2 text-zinc-600">
            <Mail className="w-4 h-4" />
            <a href={`mailto:${message.email}`} className="hover:text-blue-500">
              {message.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-zinc-600">
            <Phone className="w-4 h-4" />
            <a href={`tel:${message.phone}`} className="hover:text-blue-500">
              {message.phone}
            </a>
          </div>
        </div>

        {/* Message */}
        <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-md">
          <p className="text-sm text-zinc-700 dark:text-zinc-300 line-clamp-3">
            {message.message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant={message.isRead ? 'outline' : 'default'}
            onClick={() => onMarkAsRead(message.id)}
            className="flex-1"
          >
            {message.isRead ? (
              <>
                <EyeOff className="w-4 h-4 mr-1" />
                Mark Unread
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-1" />
                Mark Read
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(message.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
