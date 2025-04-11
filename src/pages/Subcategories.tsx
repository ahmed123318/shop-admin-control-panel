
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
import { Plus, Edit, Trash2, Folder, Search } from "lucide-react";

const subcategories = [
  {
    id: 1,
    name: "Smartphones",
    slug: "smartphones",
    categoryId: 1,
    categoryName: "Electronics",
    products: 45,
    status: "Active"
  },
  {
    id: 2,
    name: "Laptops",
    slug: "laptops",
    categoryId: 1,
    categoryName: "Electronics",
    products: 32,
    status: "Active"
  },
  {
    id: 3,
    name: "T-shirts",
    slug: "t-shirts",
    categoryId: 2,
    categoryName: "Clothing",
    products: 28,
    status: "Active"
  },
  {
    id: 4,
    name: "Jeans",
    slug: "jeans",
    categoryId: 2,
    categoryName: "Clothing",
    products: 19,
    status: "Active"
  },
  {
    id: 5,
    name: "Furniture",
    slug: "furniture",
    categoryId: 3,
    categoryName: "Home & Garden",
    products: 24,
    status: "Active"
  },
  {
    id: 6,
    name: "Kitchen Appliances",
    slug: "kitchen-appliances",
    categoryId: 3,
    categoryName: "Home & Garden",
    products: 18,
    status: "Inactive"
  },
  {
    id: 7,
    name: "TVs",
    slug: "tvs",
    categoryId: 1,
    categoryName: "Electronics",
    products: 15,
    status: "Active"
  }
];

export default function Subcategories() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubcategories = searchTerm 
    ? subcategories.filter(subcategory => 
        subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subcategory.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : subcategories;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Subcategories</h2>
          <p className="text-muted-foreground">
            Manage your product subcategories
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Subcategory</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Subcategories</CardTitle>
          <CardDescription>
            Showing {filteredSubcategories.length} subcategories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search subcategories..." 
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
                  <TableHead>Parent Category</TableHead>
                  <TableHead className="text-center">Products</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubcategories.map(subcategory => (
                  <TableRow key={subcategory.id}>
                    <TableCell className="font-medium">#{subcategory.id}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Folder className="h-5 w-5 text-muted-foreground" />
                      {subcategory.name}
                    </TableCell>
                    <TableCell>{subcategory.slug}</TableCell>
                    <TableCell>{subcategory.categoryName}</TableCell>
                    <TableCell className="text-center">{subcategory.products}</TableCell>
                    <TableCell>
                      <Badge variant={subcategory.status === "Active" ? "default" : "secondary"}>
                        {subcategory.status}
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
