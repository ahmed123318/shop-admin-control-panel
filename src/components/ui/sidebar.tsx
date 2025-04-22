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
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export function Sidebar({ className, children }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const ref = useRef<HTMLButtonElement | HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        window.innerWidth < 768
      ) {
        setCollapsed(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setCollapsed]);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={cn(className, "relative")}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({ className, align = "start", ...props }: SidebarTriggerProps) {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <Button
      variant="ghost"
      className={cn(
        "md:hidden h-10 w-10 p-0",
        align === "end" && "ml-auto",
        className
      )}
      onClick={() => setCollapsed(!collapsed)}
      {...props}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle Menu</span>
    </Button>
  );
}

interface SidebarContentProps {
  className?: string;
}

export function SidebarContent({ className }: SidebarContentProps) {
  const { collapsed, setCollapsed } = useSidebarContext();

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
          "fixed md:static z-50 flex flex-col top-0 left-0 h-screen md:max-w-sm  border-r bg-secondary text-secondary-foreground w-3/4",
          collapsed ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <SidebarHeader />
        <SidebarMenu />
      </SheetContent>
    </Sheet>
  );
}

interface SidebarHeaderProps {
  className?: string;
}

export function SidebarHeader({ className }: SidebarHeaderProps) {
  return (
    <div className={cn("flex items-center py-4 px-6 h-16 shrink-0", className)}>
      <SheetHeader className="pl-0 pb-4">
        <SheetTitle>Dashboard</SheetTitle>
        <SheetDescription>
          Manage your store and track performance
        </SheetDescription>
      </SheetHeader>
    </div>
  );
}

const sidebarItems = [
  { href: "/", label: "Dashboard" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/subcategories", label: "Subcategories" },
  { href: "/brands", label: "Brands" },
  { href: "/orders", label: "Orders" },
  { href: "/customers", label: "Customers" },
  { href: "/users", label: "Users" },
  { href: "/reviews", label: "Reviews" },
  { href: "/coupons", label: "Coupons" },
  { href: "/suppliers", label: "Suppliers" },
  { href: "/taxes", label: "Taxes" },
  { href: "/analytics", label: "Analytics" },
  { href: "/settings", label: "Settings" },
];

interface SidebarMenuProps {
  className?: string;
}

export function SidebarMenu({ className }: SidebarMenuProps) {
  const location = useLocation();

  return (
    <div className={cn("flex flex-col gap-2 py-4 px-6", className)}>
      {sidebarItems.map((item) => (
        <SidebarMenuItem
          key={item.href}
          href={item.href}
          label={item.label}
          active={location.pathname === item.href}
        />
      ))}
    </div>
  );
}

interface SidebarMenuItemProps {
  href: string;
  label: string;
  active?: boolean;
}

export function SidebarMenuItem({ href, label, active }: SidebarMenuItemProps) {
  return (
    <Link to={href}>
      <Button variant={active ? "secondary" : "ghost"} className="w-full justify-start">
        {label}
      </Button>
    </Link>
  );
}

export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a <Sidebar />");
  }
  return context;
}
