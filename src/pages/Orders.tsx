
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2023-04-05",
    total: 128.00,
    status: "Delivered",
    items: 3,
    paymentStatus: "Paid",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2023-04-05",
    total: 245.99,
    status: "Processing",
    items: 2,
    paymentStatus: "Paid",
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    date: "2023-04-04",
    total: 79.00,
    status: "Shipped",
    items: 1,
    paymentStatus: "Paid",
  },
  {
    id: "ORD-004",
    customer: "Emily Williams",
    date: "2023-04-04",
    total: 189.50,
    status: "Pending",
    items: 4,
    paymentStatus: "Pending",
  },
  {
    id: "ORD-005",
    customer: "Michael Brown",
    date: "2023-04-03",
    total: 322.45,
    status: "Delivered",
    items: 5,
    paymentStatus: "Paid",
  },
  {
    id: "ORD-006",
    customer: "Sarah Johnson",
    date: "2023-04-03",
    total: 56.99,
    status: "Cancelled",
    items: 1,
    paymentStatus: "Refunded",
  },
  {
    id: "ORD-007",
    customer: "David Wilson",
    date: "2023-04-02",
    total: 159.99,
    status: "Delivered",
    items: 2,
    paymentStatus: "Paid",
  },
  {
    id: "ORD-008",
    customer: "Linda Moore",
    date: "2023-04-02",
    total: 432.50,
    status: "Processing",
    items: 6,
    paymentStatus: "Paid",
  },
];

const statusStyles = {
  Delivered: "bg-green-100 text-green-800",
  Processing: "bg-blue-100 text-blue-800",
  Shipped: "bg-purple-100 text-purple-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
};

const paymentStatusStyles = {
  Paid: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Refunded: "bg-red-100 text-red-800",
};

export default function Orders() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <p className="text-muted-foreground">
          Manage and track customer orders
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Orders List</CardTitle>
          <CardDescription>
            Showing {orders.length} orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Input
              placeholder="Search orders..."
              className="max-w-sm"
            />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell className="text-right">{order.items}</TableCell>
                    <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "bg-transparent",
                          statusStyles[order.status as keyof typeof statusStyles]
                        )}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "bg-transparent",
                          paymentStatusStyles[order.paymentStatus as keyof typeof paymentStatusStyles]
                        )}
                      >
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
