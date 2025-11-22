import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { FileText, Sparkles } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" data-testid="link-home">
          <div className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">CVCraft</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/templates" data-testid="link-templates">
            <Button
              variant={location === "/templates" ? "secondary" : "ghost"}
              className="font-medium"
            >
              Templates
            </Button>
          </Link>
          <Link href="/builder" data-testid="link-builder">
            <Button
              variant={location === "/builder" ? "secondary" : "ghost"}
              className="font-medium"
            >
              My CVs
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/builder" data-testid="link-upgrade">
            <Button variant="default" className="gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Get Started</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
