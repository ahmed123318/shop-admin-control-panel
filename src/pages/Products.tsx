
import React from "react";
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
import { Plus, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const products = [
  {
    id: 1,
    name: "Apple MacBook Pro",
    category: "Electronics",
    price: 1999.99,
    stock: 15,
    status: "Active"
  },
  {
    id: 2,
    name: "Samsung Galaxy S22",
    category: "Electronics",
    price: 899.99,
    stock: 28,
    status: "Active"
  },
  {
    id: 3,
    name: "Levi's Jeans",
    category: "Clothing",
    price: 59.99,
    stock: 45,
    status: "Active"
  },
  {
    id: 4,
    name: "Nike Air Max",
    category: "Footwear",
    price: 129.99,
    stock: 32,
    status: "Active"
  },
  {
    id: 5,
    name: "Sony PlayStation 5",
    category: "Electronics",
    price: 499.99,
    stock: 0,
    status: "Out of Stock"
  },
  {
    id: 6,
    name: "Amazon Echo Dot",
    category: "Electronics",
    price: 49.99,
    stock: 62,
    status: "Active"
  },
  {
    id: 7,
    name: "Organic Cotton T-shirt",
    category: "Clothing",
    price: 24.99,
    stock: 120,
    status: "Active"
  },
  {
    id: 8,
    name: "Leather Sofa",
    category: "Home & Garden",
    price: 899.99,
    stock: 5,
    status: "Active"
  }
];

export default function Products() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your product inventory
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Products Inventory</CardTitle>
          <CardDescription>
            Showing {products.length} products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Input 
              placeholder="Search products..." 
              className="max-w-sm" 
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">#{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                    <TableCell>
                      <Badge variant={product.status === "Active" ? "default" : "secondary"}>
                        {product.status}
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
