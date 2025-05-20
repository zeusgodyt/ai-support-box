
import React from 'react';
import { Message } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAgent = message.sender === 'agent';
  const getInitials = (name: string = "") => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || (isAgent ? "A" : "U");
  };

  return (
    <div className={cn(
      "flex items-end space-x-2 my-3 animate-fade-in-up",
      isAgent ? "justify-start" : "justify-end"
    )}>
      {isAgent && (
        <Avatar className="h-8 w-8 self-end flex-shrink-0">
          <AvatarImage src={message.avatar} />
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {getInitials(message.senderName)}
          </AvatarFallback>
        </Avatar>
      )}
      <div className={cn(
        "max-w-[70%] p-3 rounded-2xl shadow-sm",
        isAgent ? "bg-secondary text-secondary-foreground rounded-bl-none" : "bg-primary text-primary-foreground rounded-br-none"
      )}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <div className={cn(
          "text-xs mt-1.5",
          isAgent ? "text-secondary-foreground/70" : "text-primary-foreground/70",
          isAgent ? "text-left" : "text-right"
        )}>
          {message.timestamp}
          {message.read && !isAgent && <span className="ml-1.5">Seen</span>}
        </div>
      </div>
      {!isAgent && (
         <Avatar className="h-8 w-8 self-end flex-shrink-0">
          <AvatarImage src={message.avatar} />
          <AvatarFallback className="bg-accent text-accent-foreground text-xs">
             {getInitials(message.senderName)}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
