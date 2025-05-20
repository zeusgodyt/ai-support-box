
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Smile, Zap } from "lucide-react"; // Zap for shortcuts

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 md:p-4 border-t border-border bg-card">
      <div className="flex items-start space-x-2 bg-background p-1 rounded-2xl border border-input focus-within:ring-2 focus-within:ring-ring">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-grow bg-transparent border-none focus:ring-0 resize-none min-h-[40px] max-h-[120px] text-sm p-2.5"
          rows={1}
        />
        <Button type="submit" size="icon" className="rounded-xl self-end h-9 w-9 bg-primary hover:bg-primary/90">
          <Send className="h-4 w-4 text-primary-foreground" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
      <div className="flex items-center space-x-1 mt-2">
        <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-primary rounded-full">
          <Smile className="h-5 w-5" /> <span className="sr-only">Emoji</span>
        </Button>
        <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-primary rounded-full">
          <Paperclip className="h-5 w-5" /> <span className="sr-only">Attach file</span>
        </Button>
        <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-primary rounded-full">
          <Zap className="h-5 w-5" /> <span className="sr-only">Shortcuts</span>
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
