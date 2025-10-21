'use client';

import * as React from 'react';
import { Moon, Sun, Github } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function HeaderButtons() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="fixed top-4 right-4 z-50 flex gap-2">
            {/* GitHub Link */}
            <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full w-12 h-12 shadow-lg transition-all duration-300 hover:scale-110"
            >
                <a
                    href="https://github.com/matejondov/xss-demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View source on GitHub"
                >
                    <Github className="h-[1.2rem] w-[1.2rem]" />
                </a>
            </Button>

            {/* Theme Toggle */}
            {!mounted ? (
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-12 h-12 shadow-lg"
                >
                    <Sun className="h-[1.2rem] w-[1.2rem]" />
                </Button>
            ) : (
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="rounded-full w-12 h-12 shadow-lg transition-all duration-300 hover:scale-110"
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            )}
        </div>
    );
}
