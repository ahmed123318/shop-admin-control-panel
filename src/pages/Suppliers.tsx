
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
import { Plus, Edit, Trash2, Truck, Search, Phone, Mail } from "lucide-react";

const suppliers = [
  {
    id: 1,
    name: "Tech Distributors Inc.",
    contactName: "David Chen",
    email: "david@techdistributors.com",
    phone: "+1 (555) 234-5678",
    address: "123 Tech Blvd, San Jose, CA",
    products: 45,
    status: "Active"
  },
  {
    id: 2,
    name: "Fashion Wholesale Co.",
    contactName: "Maria Rodriguez",
    email: "maria@fashionwholesale.com",
    phone: "+1 (555) 345-6789",
    address: "456 Fashion Ave, New York, NY",
    products: 78,
    status: "Active"
  },
  {
    id: 3,
    name: "Home Goods Supply",
    contactName: "Robert Johnson",
    email: "robert@homegoods.com",
    phone: "+1 (555) 456-7890",
    address: "789 Home St, Chicago, IL",
    products: 37,
    status: "Active"
  },
  {
    id: 4,
    name: "Beauty Products Ltd.",
    contactName: "Jennifer Lee",
    email: "jennifer@beautyproducts.com",
    phone: "+1 (555) 567-8901",
    address: "101 Beauty Blvd, Los Angeles, CA",
    products: 29,
    status: "Inactive"
  },
  {
    id: 5,
    name: "Sports Equipment Co.",
    contactName: "Michael Brown",
    email: "michael@sportsequipment.com",
    phone: "+1 (555) 678-9012",
    address: "202 Sports Way, Denver, CO",
    products: 42,
    status: "Active"
  }
];

export default function Suppliers() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSuppliers = searchTerm 
    ? suppliers.filter(supplier => 
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : suppliers;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Suppliers</h2>
          <p className="text-muted-foreground">
            Manage your product suppliers
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Supplier</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Suppliers</CardTitle>
          <CardDescription>
            Showing {filteredSuppliers.length} suppliers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search suppliers..." 
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
                  <TableHead>Contact</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead className="text-center">Products</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map(supplier => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">#{supplier.id}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-muted-foreground" />
                      {supplier.name}
                    </TableCell>
                    <TableCell>{supplier.contactName}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {supplier.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          {supplier.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{supplier.products}</TableCell>
                    <TableCell>
                      <Badge variant={supplier.status === "Active" ? "default" : "secondary"}>
                        {supplier.status}
                      </Badge>
                    </TableCell>
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
