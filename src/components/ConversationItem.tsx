
import React from 'react';
import { Conversation } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, isSelected, onClick }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-start p-3 text-left rounded-2xl transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary border-l-4",
        isSelected ? "bg-primary/10 border-l-green-500" : "hover:bg-accent/50 border-l-transparent",
      )}
    >
      <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
        <AvatarImage src={conversation.avatar} alt={conversation.customerName} />
        <AvatarFallback className="bg-secondary text-secondary-foreground font-medium">
          {getInitials(conversation.customerName)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-grow overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className={cn("text-sm font-semibold truncate", isSelected ? "text-primary" : "text-foreground")}>
            {conversation.customerName}
          </h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {conversation.lastMessageTimestamp}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{conversation.brand}</p>
        <p className={cn("text-xs mt-1 truncate", isSelected ? "text-foreground/90" : "text-muted-foreground")}>
          {conversation.lastMessagePreview}
        </p>
      </div>
      {conversation.unread && (
        <div className="ml-2 mt-1 self-start flex-shrink-0">
          <span className="block h-2.5 w-2.5 bg-primary rounded-full"></span>
        </div>
      )}
    </button>
  );
};

export default ConversationItem;
