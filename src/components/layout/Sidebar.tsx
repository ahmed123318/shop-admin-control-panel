
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
  FolderOpen,
  Folder,
  ShoppingCart,
  Users,
  UserRound,
  BarChart,
  Settings,
  LogOut,
  MessageSquare,
  Percent,
  Truck,
  Tag,
  BadgePercent,
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
    title: "Categories",
    path: "/categories",
    icon: FolderOpen,
  },
  {
    title: "Subcategories",
    path: "/subcategories",
    icon: Folder,
  },
  {
    title: "Brands",
    path: "/brands",
    icon: Tag,
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
    title: "Users",
    path: "/users",
    icon: UserRound,
  },
  {
    title: "Reviews",
    path: "/reviews",
    icon: MessageSquare,
  },
  {
    title: "Coupons",
    path: "/coupons",
    icon: Percent,
  },
  {
    title: "Suppliers",
    path: "/suppliers",
    icon: Truck,
  },
  {
    title: "Taxes",
    path: "/taxes",
    icon: BadgePercent,
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
              {menuItems.slice(0, 5).map((item) => (
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

        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-1">Sales & Customers</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.slice(5, 8).map((item) => (
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

        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-1">Marketing & Finance</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.slice(8, 12).map((item) => (
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

        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-1">System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.slice(12).map((item) => (
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
