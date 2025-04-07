
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2023-04-05",
    total: "$128.00",
    status: "Delivered",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2023-04-05",
    total: "$245.99",
    status: "Processing",
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    date: "2023-04-04",
    total: "$79.00",
    status: "Shipped",
  },
  {
    id: "ORD-004",
    customer: "Emily Williams",
    date: "2023-04-04",
    total: "$189.50",
    status: "Pending",
  },
  {
    id: "ORD-005",
    customer: "Michael Brown",
    date: "2023-04-03",
    total: "$322.45",
    status: "Delivered",
  },
];

const statusStyles = {
  Delivered: "bg-green-100 text-green-800",
  Processing: "bg-blue-100 text-blue-800",
  Shipped: "bg-purple-100 text-purple-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest 5 orders from customers</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
