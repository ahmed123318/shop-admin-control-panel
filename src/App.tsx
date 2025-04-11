
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Subcategories from "./pages/Subcategories";
import Brands from "./pages/Brands";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Users from "./pages/Users";
import Reviews from "./pages/Reviews";
import Coupons from "./pages/Coupons";
import Suppliers from "./pages/Suppliers";
import Taxes from "./pages/Taxes";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
              <Route path="subcategories" element={<Subcategories />} />
              <Route path="brands" element={<Brands />} />
              <Route path="orders" element={<Orders />} />
              <Route path="customers" element={<Customers />} />
              <Route path="users" element={<Users />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="coupons" element={<Coupons />} />
              <Route path="suppliers" element={<Suppliers />} />
              <Route path="taxes" element={<Taxes />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
