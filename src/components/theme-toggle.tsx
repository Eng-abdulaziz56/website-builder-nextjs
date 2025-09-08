'use client';

import { Button } from '@/components/ui/button';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
        <div className="h-8 w-8 rounded-md bg-muted-foreground/20 animate-pulse" />
        <div className="h-8 w-8 rounded-md bg-muted-foreground/20 animate-pulse" />
        <div className="h-8 w-8 rounded-md bg-muted-foreground/20 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
      <Button
        variant={theme === 'light' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setTheme('light')}
        className={`h-8 w-8 p-0 rounded-md ${theme === 'light'
          ? 'bg-background text-foreground shadow-sm border'
          : 'text-foreground hover:bg-muted-foreground/20'
          }`}
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === 'dark' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setTheme('dark')}
        className={`h-8 w-8 p-0 rounded-md ${theme === 'dark'
          ? 'bg-background text-foreground shadow-sm border'
          : 'text-foreground hover:bg-muted-foreground/20'
          }`}
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === 'system' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setTheme('system')}
        className={`h-8 w-8 p-0 rounded-md ${theme === 'system'
          ? 'bg-background text-foreground shadow-sm border'
          : 'text-foreground hover:bg-muted-foreground/20'
          }`}
      >
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  );
}
