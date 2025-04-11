
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, UserRound, Search } from "lucide-react";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Customer",
    status: "Active",
    registered: "2023-05-12"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Customer",
    status: "Active",
    registered: "2023-06-23"
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "Admin",
    status: "Active",
    registered: "2022-11-05"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Customer",
    status: "Inactive",
    registered: "2023-02-18"
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael@example.com",
    role: "Customer",
    status: "Active",
    registered: "2023-04-30"
  },
  {
    id: 6,
    name: "Sarah Brown",
    email: "sarah@example.com",
    role: "Manager",
    status: "Active",
    registered: "2022-10-15"
  }
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = searchTerm 
    ? users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Manage your user accounts
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Showing {filteredUsers.length} users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">#{user.id}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <UserRound className="h-5 w-5 text-muted-foreground" />
                      {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.registered}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
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
