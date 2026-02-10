'use client';

import { MessagesTable } from '@/features/contact/messages/admin/components/MessagesTable';
import { CategoriesTable } from '@/features/contact/messages/admin/components/CategoriesTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/components/ui/tabs';

export default function MessagesPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Contact Messages</h1>
        <p className="text-zinc-500">Manage incoming messages and message categories</p>
      </div>

      <Tabs defaultValue="messages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <MessagesTable />
        </TabsContent>

        <TabsContent value="categories">
          <CategoriesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
