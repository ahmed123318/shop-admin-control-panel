
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
import { Plus, Edit, Trash2, FolderOpen, Search } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    products: 124,
    subcategories: 8,
    status: "Active"
  },
  {
    id: 2,
    name: "Clothing",
    slug: "clothing",
    products: 89,
    subcategories: 12,
    status: "Active"
  },
  {
    id: 3,
    name: "Home & Garden",
    slug: "home-garden",
    products: 76,
    subcategories: 15,
    status: "Active"
  },
  {
    id: 4,
    name: "Beauty",
    slug: "beauty",
    products: 52,
    subcategories: 6,
    status: "Active"
  },
  {
    id: 5,
    name: "Sports",
    slug: "sports",
    products: 43,
    subcategories: 9,
    status: "Active"
  },
  {
    id: 6,
    name: "Books",
    slug: "books",
    products: 67,
    subcategories: 5,
    status: "Active"
  },
  {
    id: 7,
    name: "Toys",
    slug: "toys",
    products: 31,
    subcategories: 4,
    status: "Inactive"
  }
];

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = searchTerm 
    ? categories.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categories;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Manage your product categories
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Category</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Showing {filteredCategories.length} categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search categories..." 
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
                  <TableHead>Slug</TableHead>
                  <TableHead className="text-center">Products</TableHead>
                  <TableHead className="text-center">Subcategories</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map(category => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">#{category.id}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <FolderOpen className="h-5 w-5 text-muted-foreground" />
                      {category.name}
                    </TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="text-center">{category.products}</TableCell>
                    <TableCell className="text-center">{category.subcategories}</TableCell>
                    <TableCell>
                      <Badge variant={category.status === "Active" ? "default" : "secondary"}>
                        {category.status}
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
