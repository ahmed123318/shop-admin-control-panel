
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
import { Plus, Edit, Trash2, Tag, Search } from "lucide-react";

const brands = [
  {
    id: 1,
    name: "Apple",
    slug: "apple",
    products: 45,
    status: "Active"
  },
  {
    id: 2,
    name: "Samsung",
    slug: "samsung",
    products: 38,
    status: "Active"
  },
  {
    id: 3,
    name: "Nike",
    slug: "nike",
    products: 52,
    status: "Active"
  },
  {
    id: 4,
    name: "Adidas",
    slug: "adidas",
    products: 47,
    status: "Active"
  },
  {
    id: 5,
    name: "Sony",
    slug: "sony",
    products: 29,
    status: "Active"
  },
  {
    id: 6,
    name: "LG",
    slug: "lg",
    products: 25,
    status: "Active"
  },
  {
    id: 7,
    name: "Levi's",
    slug: "levis",
    products: 31,
    status: "Inactive"
  },
  {
    id: 8,
    name: "IKEA",
    slug: "ikea",
    products: 35,
    status: "Active"
  }
];

export default function Brands() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBrands = searchTerm 
    ? brands.filter(brand => 
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : brands;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Brands</h2>
          <p className="text-muted-foreground">
            Manage your product brands
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Brand</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Brands</CardTitle>
          <CardDescription>
            Showing {filteredBrands.length} brands
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search brands..." 
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
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBrands.map(brand => (
                  <TableRow key={brand.id}>
                    <TableCell className="font-medium">#{brand.id}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-muted-foreground" />
                      {brand.name}
                    </TableCell>
                    <TableCell>{brand.slug}</TableCell>
                    <TableCell className="text-center">{brand.products}</TableCell>
                    <TableCell>
                      <Badge variant={brand.status === "Active" ? "default" : "secondary"}>
                        {brand.status}
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
