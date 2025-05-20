
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Send } from "lucide-react";
import { CopilotSuggestion } from '@/types';
import { ScrollArea } from "@/components/ui/scroll-area";

const suggestedActions: CopilotSuggestion[] = [
  { id: 'refund', text: '💸 How do I get a refund?' },
  { id: 'status', text: '📦 What is my order status?' },
  { id: 'policy', text: '📜 Summarize the return policy.' },
];

const AICopilotPanel: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  return (
    <aside className="w-full bg-card border-l border-border flex flex-col h-full relative">
      {/* Mobile Close Button */}
      <button
        type="button"
        aria-label="Close panel"
        className="absolute right-2 top-2 z-10 block lg:hidden p-2 rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={onClose}
      >
        <span aria-hidden="true" className="text-2xl">×</span>
      </button>
      <div className="p-4 border-b border-border text-center">
        <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
        <h2 className="text-lg font-semibold text-foreground">AI Copilot</h2>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Hi, I'm Fin, your AI Copilot. Ask me anything about this conversation, or use the suggestions below.
          </p>
          <div className="relative">
            <Input type="text" placeholder="Ask Fin..." className="pr-10 rounded-2xl bg-background focus:bg-card" />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg">
              <Send className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Suggested Actions:</h4>
            <div className="space-y-2">
              {suggestedActions.map(action => (
                <Button key={action.id} variant="outline" className="w-full justify-start text-left h-auto py-2 px-3 rounded-2xl hover:bg-accent/50">
                  <span className="text-sm">{action.text}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
       {/* Optional: Footer for quick actions like summarize or generate reply */}
    </aside>
  );
};

export default AICopilotPanel;
