import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between px-4 mx-auto max-w-5xl">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-foreground" />
          <span className="font-semibold text-sm tracking-tight">Scott Vermast</span>
        </Link>

        <div className="flex items-center gap-1">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 mr-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm transition-colors hover:text-foreground',
                  location.pathname === link.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {import.meta.env.DEV && (
            <Button variant="outline" size="sm" asChild className="hidden md:inline-flex mr-1 border-border/50 whitespace-nowrap">
              <Link to="/builder">
                <Plus className="h-3.5 w-3.5 mr-1" />
                New Project
              </Link>
            </Button>
          )}

          <ThemeToggle />

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-lg font-medium transition-colors hover:text-foreground',
                      location.pathname === link.href
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                {import.meta.env.DEV && (
                  <Link
                    to="/builder"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-foreground text-muted-foreground"
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      New Project
                    </span>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
