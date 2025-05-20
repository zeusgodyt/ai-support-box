
import React, { useRef, useEffect } from 'react';
import { Message } from '@/types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { ScrollArea } from "@/components/ui/scroll-area";
import type * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"; // Import type for ref

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  customerName?: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSendMessage, customerName }) => {
  const scrollAreaRef = useRef<React.ElementRef<typeof ScrollAreaPrimitive.Root>>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      // The viewport is typically the first child of the ScrollAreaPrimitive.Root
      const viewport = scrollAreaRef.current.children[0] as HTMLDivElement;
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <section className="flex-grow flex flex-col bg-background h-full overflow-hidden">
      <div className="px-4 md:px-6 py-3 border-b border-border bg-card">
        {customerName && (
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-foreground truncate text-left">{customerName}</h2>
            <span className="ml-2 align-middle text-xs text-green-600 font-semibold">Active now</span>
          </div>
        )}
      </div>
      <ScrollArea ref={scrollAreaRef} className="flex-grow p-4 md:p-6">
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
      </ScrollArea>
      <ChatInput onSendMessage={onSendMessage} />
    </section>
  );
};

export default ChatPanel;
