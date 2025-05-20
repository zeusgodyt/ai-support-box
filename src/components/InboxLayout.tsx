
import React, { useState, useEffect } from 'react';
import HeaderBar from './HeaderBar';
import InboxSidebar from './InboxSidebar';
import ChatPanel from './ChatPanel';
import AICopilotPanel from './AICopilotPanel';
import { Conversation, Message } from '@/types';
import { cn } from "@/lib/utils";

// Sample Data
const sampleConversations: Conversation[] = [
  { id: 'conv1', customerName: 'Alice Wonderland', brand: 'Mad Hatter Inc.', lastMessagePreview: 'I seem to have lost my hat...', lastMessageTimestamp: '10:30 AM', unread: true, avatar: 'https://i.pravatar.cc/150?u=alice' },
  { id: 'conv2', customerName: 'Bob The Builder', brand: 'Construct Ltd.', lastMessagePreview: 'Can we fix it? Yes, we can!', lastMessageTimestamp: 'Yesterday', unread: false, avatar: 'https://i.pravatar.cc/150?u=bob' },
  { id: 'conv3', customerName: 'Charlie Brown', brand: 'Peanuts Corp.', lastMessagePreview: 'Good grief! My kite is stuck again.', lastMessageTimestamp: 'Mon', unread: true, avatar: 'https://i.pravatar.cc/150?u=charlie' },
  { id: 'conv4', customerName: 'Diana Prince', brand: 'Themyscira Exports', lastMessagePreview: 'The lasso of truth needs polishing.', lastMessageTimestamp: 'May 15', unread: false, avatar: 'https://i.pravatar.cc/150?u=diana' },
];

const sampleMessages: { [key: string]: Message[] } = {
  conv1: [
    { id: 'msg1', sender: 'user', content: 'Hello, I seem to have lost my hat. Can you help me find it?', timestamp: '10:25 AM', senderName: "Alice Wonderland", avatar: 'https://i.pravatar.cc/150?u=alice' },
    { id: 'msg2', sender: 'agent', content: 'Good morning, Alice! Oh dear, a lost hat is no fun. Let me see what I can do. Which hat was it?', timestamp: '10:28 AM', senderName: "Support Agent", avatar: 'https://i.pravatar.cc/150?u=agent1' },
    { id: 'msg3', sender: 'user', content: 'It was my favorite top hat, the one with the 10/6 card!', timestamp: '10:30 AM', read: true, senderName: "Alice Wonderland", avatar: 'https://i.pravatar.cc/150?u=alice' },
  ],
  conv2: [
    { id: 'msg4', sender: 'user', content: 'My crane is broken!', timestamp: 'Yesterday', senderName: "Bob The Builder", avatar: 'https://i.pravatar.cc/150?u=bob' },
  ],
  // Add more messages for other conversations if needed
};

const InboxLayout: React.FC = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(sampleConversations[0]?.id || null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile inbox sidebar
  const [isCopilotOpen, setIsCopilotOpen] = useState(false); // For mobile AI Copilot panel

  useEffect(() => {
    if (selectedConversationId) {
      setMessages(sampleMessages[selectedConversationId] || []);
    } else {
      setMessages([]);
    }
  }, [selectedConversationId]);

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
    if (window.innerWidth < 768) { // md breakpoint
      setIsSidebarOpen(false); 
    }
    if (window.innerWidth < 1024 && isCopilotOpen) { // lg breakpoint for copilot
        setIsCopilotOpen(false); // Close copilot if open on small screens when new chat selected
    }
  };

  const handleSendMessage = (content: string) => {
    if (!selectedConversationId) return;
    const newMessage: Message = {
      id: `msg${Date.now()}`,
      sender: 'agent',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderName: "Support Agent",
      avatar: 'https://i.pravatar.cc/150?u=agent2'
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const activeCustomerName = sampleConversations.find(c => c.id === selectedConversationId)?.customerName;
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCopilotPanel = () => setIsCopilotOpen(!isCopilotOpen);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <HeaderBar 
        onToggleSidebar={toggleSidebar}
        onToggleCopilotPanel={toggleCopilotPanel} 
      />
      <div className="flex flex-row flex-grow overflow-hidden relative">
        {/* Mobile Inbox Sidebar - Overlay */}
        {isSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={toggleSidebar}></div>
        )}
        <div className={cn(
          "flex flex-col h-full transform transition-transform duration-300 ease-in-out",
          "fixed md:static z-50 md:z-auto inset-y-0 left-0", 
          "w-full sm:w-80 lg:w-96", // Full width on xs, specific widths sm+
          isSidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full md:translate-x-0" 
        )}>
          <InboxSidebar
            conversations={sampleConversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={handleSelectConversation}
          />
        </div>
        {/* Main chat panel */}
        <main className={cn(
          "flex-grow flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
        )}>
          {selectedConversationId ? (
            <ChatPanel messages={messages} onSendMessage={handleSendMessage} customerName={activeCustomerName} />
          ) : (
            <div className="flex-grow flex items-center justify-center text-muted-foreground">
              <p>Select a conversation to start chatting.</p>
            </div>
          )}
        </main>
        {/* AI Copilot Panel - Desktop static, Mobile overlay from right */}
        {isCopilotOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={toggleCopilotPanel}></div>
        )}
        <div className={cn(
          "flex flex-col h-full transform transition-transform duration-300 ease-in-out",
          "fixed lg:static z-50 lg:z-auto inset-y-0 right-0",
          "w-full sm:w-80 lg:w-96 bg-card",
          isCopilotOpen ? "translate-x-0 shadow-xl flex" : "translate-x-full lg:translate-x-0 lg:flex"
        )}>
          {/* Always show Copilot panel on lg+ screens, only show on mobile if open */}
          {(isCopilotOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && selectedConversationId && (
            <AICopilotPanel onClose={toggleCopilotPanel} />
          )}
          {(isCopilotOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && !selectedConversationId && (
            <div className="flex-grow flex items-center justify-center text-muted-foreground p-4">
              <p>Select a conversation to use AI Copilot.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InboxLayout;
