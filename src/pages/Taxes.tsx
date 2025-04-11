
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
import { Plus, Edit, Trash2, Percent, Search } from "lucide-react";

const taxes = [
  {
    id: 1,
    name: "Standard VAT",
    rate: 20.0,
    country: "United Kingdom",
    region: "All",
    productCategories: "All",
    status: "Active"
  },
  {
    id: 2,
    name: "Reduced VAT",
    rate: 5.0,
    country: "United Kingdom",
    region: "All",
    productCategories: "Books, Children's Items",
    status: "Active"
  },
  {
    id: 3,
    name: "Sales Tax",
    rate: 8.875,
    country: "United States",
    region: "New York",
    productCategories: "All",
    status: "Active"
  },
  {
    id: 4,
    name: "Sales Tax",
    rate: 7.25,
    country: "United States",
    region: "California",
    productCategories: "All",
    status: "Active"
  },
  {
    id: 5,
    name: "HST",
    rate: 13.0,
    country: "Canada",
    region: "Ontario",
    productCategories: "All",
    status: "Active"
  },
  {
    id: 6,
    name: "GST",
    rate: 5.0,
    country: "Canada",
    region: "Alberta",
    productCategories: "All",
    status: "Active"
  },
  {
    id: 7,
    name: "EU VAT",
    rate: 19.0,
    country: "Germany",
    region: "All",
    productCategories: "All",
    status: "Inactive"
  }
];

export default function Taxes() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTaxes = searchTerm 
    ? taxes.filter(tax => 
        tax.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tax.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tax.region.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : taxes;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Taxes</h2>
          <p className="text-muted-foreground">
            Manage tax rates and rules
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Tax</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Tax Rates</CardTitle>
          <CardDescription>
            Showing {filteredTaxes.length} tax rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search taxes..." 
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
                  <TableHead className="text-center">Rate</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Applied To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTaxes.map(tax => (
                  <TableRow key={tax.id}>
                    <TableCell className="font-medium">#{tax.id}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Percent className="h-5 w-5 text-muted-foreground" />
                      {tax.name}
                    </TableCell>
                    <TableCell className="text-center">{tax.rate}%</TableCell>
                    <TableCell>{tax.country}</TableCell>
                    <TableCell>{tax.region}</TableCell>
                    <TableCell className="max-w-xs truncate">{tax.productCategories}</TableCell>
                    <TableCell>
                      <Badge variant={tax.status === "Active" ? "default" : "secondary"}>
                        {tax.status}
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
