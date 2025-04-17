
import React from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const { toggleOpen } = useSidebar();
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      {isMobile && (
        <Button variant="ghost" size="icon" onClick={toggleOpen}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      )}
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
