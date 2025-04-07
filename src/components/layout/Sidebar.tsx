
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    path: "/products",
    icon: Package,
  },
  {
    title: "Orders",
    path: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    path: "/customers",
    icon: Users,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="h-14 flex items-center px-4 border-b">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center">
            <ShoppingCart className="h-6 w-6 mr-2 text-primary" />
            <span className="font-bold text-lg">ShopAdmin</span>
          </Link>
          <SidebarTrigger className="lg:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-1">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md",
                      location.pathname === item.path
                        ? "bg-sidebar-accent text-white"
                        : "hover:bg-sidebar-accent/50"
                    )}
                  >
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="mt-auto px-3 py-2 mb-4">
          <button 
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-white/80 hover:bg-sidebar-accent/50 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
