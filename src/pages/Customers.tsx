
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const customers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john.doe@example.com",
    orders: 5,
    spent: 432.99,
    status: "Active",
    lastOrder: "2023-04-05",
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    orders: 3,
    spent: 245.50,
    status: "Active",
    lastOrder: "2023-04-03",
  },
  {
    id: "CUST-003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    orders: 1,
    spent: 79.99,
    status: "Inactive",
    lastOrder: "2023-03-15",
  },
  {
    id: "CUST-004",
    name: "Emily Williams",
    email: "emily.williams@example.com",
    orders: 8,
    spent: 789.45,
    status: "Active",
    lastOrder: "2023-04-04",
  },
  {
    id: "CUST-005",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    orders: 2,
    spent: 145.00,
    status: "Active",
    lastOrder: "2023-04-01",
  },
  {
    id: "CUST-006",
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    orders: 0,
    spent: 0.00,
    status: "New",
    lastOrder: "-",
  },
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map(part => part.charAt(0))
    .join("")
    .toUpperCase();
};

export default function Customers() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <p className="text-muted-foreground">
          Manage and track your customer base
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Customer List</CardTitle>
          <CardDescription>
            Showing {customers.length} customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Input
              placeholder="Search customers..."
              className="max-w-sm"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map(customer => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(customer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell className="text-right">{customer.orders}</TableCell>
                    <TableCell className="text-right">${customer.spent.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={customer.status === "Active" ? "default" : customer.status === "New" ? "outline" : "secondary"}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.lastOrder}</TableCell>
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
