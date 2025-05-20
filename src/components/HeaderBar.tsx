import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sun, Moon, X, MoreHorizontal, Menu, Sparkles } from "lucide-react";

interface HeaderBarProps {
  onToggleSidebar?: () => void;
  onToggleCopilotPanel?: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ onToggleSidebar, onToggleCopilotPanel }) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-card border-b border-border shadow-sm sticky top-0 z-30">
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onToggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <h1 className="text-lg font-bold">AI Inbox</h1> 
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2">
        <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode">
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        {onToggleCopilotPanel && (
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onToggleCopilotPanel}>
            <Sparkles className="h-5 w-5" />
            <span className="sr-only">Toggle AI Copilot</span>
          </Button>
        )}
        <Button variant="outline" size="sm" className="rounded-2xl hidden sm:flex">
          <X className="h-4 w-4 mr-1.5" />
          Close
        </Button>
        <Button variant="ghost" size="icon" aria-label="More options">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default HeaderBar;
