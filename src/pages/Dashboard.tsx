
import React from "react";
import StatCard from "@/components/dashboard/StatCard";
import SalesChart from "@/components/dashboard/SalesChart";
import RecentOrders from "@/components/dashboard/RecentOrders";
import CategoryDistribution from "@/components/dashboard/CategoryDistribution";
import { ShoppingCart, Package, Users, ArrowUpRight } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your store's performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          icon={ArrowUpRight}
          description="vs. previous month"
          trend={12}
        />
        <StatCard
          title="Orders"
          value="345"
          icon={ShoppingCart}
          description="vs. previous month"
          trend={-2}
        />
        <StatCard
          title="Products"
          value="268"
          icon={Package}
          description="Active products"
        />
        <StatCard
          title="Customers"
          value="1,429"
          icon={Users}
          description="vs. previous month"
          trend={8}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SalesChart />
        <CategoryDistribution />
      </div>

      <RecentOrders />
    </div>
  );
}
