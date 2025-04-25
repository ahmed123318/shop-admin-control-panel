
"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  className?: string;
  children: React.ReactNode;
}

interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  toggleOpen: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleOpen = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, toggleOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function Sidebar({ className, children }: SidebarProps) {
  return (
    <div className={cn(className, "relative")}>
      {children}
    </div>
  );
}

interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  const { toggleOpen } = useSidebar();

  return (
    <Button
      variant="ghost"
      className={cn(
        "md:hidden h-10 w-10 p-0",
        className
      )}
      onClick={toggleOpen}
      {...props}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle Menu</span>
    </Button>
  );
}

interface SidebarContentProps {
  className?: string;
  children?: React.ReactNode;
}

export function SidebarContent({ className, children }: SidebarContentProps) {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <Sheet open={collapsed} onOpenChange={setCollapsed}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden h-10 w-10 p-0">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className={cn(
          "fixed md:static z-50 flex flex-col top-0 left-0 h-screen md:max-w-sm border-r bg-secondary text-secondary-foreground w-3/4",
          collapsed ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        {children}
      </SheetContent>
    </Sheet>
  );
}

interface SidebarHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export function SidebarHeader({ className, children }: SidebarHeaderProps) {
  return (
    <div className={cn("flex items-center py-4 px-6 h-16 shrink-0", className)}>
      {children || (
        <SheetHeader className="pl-0 pb-4">
          <SheetTitle>Dashboard</SheetTitle>
          <SheetDescription>
            Manage your store and track performance
          </SheetDescription>
        </SheetHeader>
      )}
    </div>
  );
}

export function SidebarGroup({ children, className }: { children?: React.ReactNode, className?: string }) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

export function SidebarGroupLabel({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("mb-2 px-2 py-1 text-xs uppercase font-semibold text-muted-foreground", className)}>
      {children}
    </div>
  );
}

export function SidebarGroupContent({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("space-y-1", className)}>
      {children}
    </div>
  );
}

export function SidebarMenu({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {children}
    </nav>
  );
}

export function SidebarMenuItem({ children, href, label, active }: { 
  children?: React.ReactNode,
  href?: string,
  label?: string,
  active?: boolean
}) {
  if (children) {
    return <div className="px-2">{children}</div>;
  }

  return (
    <Link to={href || "#"}>
      <Button variant={active ? "secondary" : "ghost"} className="w-full justify-start">
        {label}
      </Button>
    </Link>
  );
}

export function SidebarMenuButton({ 
  children, 
  asChild, 
  className 
}: { 
  children: React.ReactNode, 
  asChild?: boolean,
  className?: string
}) {
  const Comp = asChild ? React.Fragment : Button;
  const props = asChild ? {} : { variant: "ghost", className: cn("w-full justify-start", className) };
  
  return (
    <Comp {...props}>
      {children}
    </Comp>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a <SidebarProvider />");
  }
  return context;
}
