
import React from 'react';
import { Conversation } from '@/types';
import ConversationItem from './ConversationItem';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowDownUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface InboxSidebarProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

const InboxSidebar: React.FC<InboxSidebarProps> = ({ conversations, selectedConversationId, onSelectConversation }) => {
  return (
    <aside className="w-full md:w-80 lg:w-96 bg-card border-r border-border flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-foreground">Inbox</h2>
          {/* Placeholder for sorting */}
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <ArrowDownUp className="h-4 w-4 mr-1.5" />
            Waiting Longest
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search conversations..." className="pl-9 rounded-2xl bg-background focus:bg-card" />
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-2 space-y-1">
          {conversations.map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isSelected={selectedConversationId === conv.id}
              onClick={() => onSelectConversation(conv.id)}
            />
          ))}
        </div>
      </ScrollArea>
      {/* Optional: Add a footer or quick actions here */}
    </aside>
  );
};

export default InboxSidebar;
