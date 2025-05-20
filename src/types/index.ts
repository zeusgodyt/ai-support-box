
export interface User {
  id: string;
  name: string;
  avatar?: string; // URL to avatar image
}

export interface Conversation {
  id: string;
  customerName: string;
  brand: string; // e.g., Nike, Github
  lastMessagePreview: string;
  lastMessageTimestamp: string; // e.g., "10:30 AM" or "Yesterday"
  unread: boolean;
  avatar?: string; // Customer avatar
}

export interface Message {
  id: string;
  sender: 'user' | 'agent'; // or 'copilot'
  content: string;
  timestamp: string; // e.g., "10:35 AM"
  read?: boolean; // For read receipts
  senderName?: string; // Name of the sender if not the primary user/agent
  avatar?: string;
}

export interface CopilotSuggestion {
  id: string;
  text: string;
  action?: () => void; // Optional action for the button
}
