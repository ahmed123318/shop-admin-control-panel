
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
import { Plus, Edit, Trash2, Percent, Search, Calendar } from "lucide-react";

const coupons = [
  {
    id: 1,
    code: "SUMMER25",
    discount: 25,
    type: "Percentage",
    minPurchase: 100,
    maxDiscount: 50,
    validFrom: "2023-06-01",
    validTo: "2023-08-31",
    usage: 245,
    status: "Active"
  },
  {
    id: 2,
    code: "WELCOME10",
    discount: 10,
    type: "Percentage",
    minPurchase: 0,
    maxDiscount: 100,
    validFrom: "2023-01-01",
    validTo: "2023-12-31",
    usage: 589,
    status: "Active"
  },
  {
    id: 3,
    code: "FLAT50",
    discount: 50,
    type: "Fixed",
    minPurchase: 200,
    maxDiscount: null,
    validFrom: "2023-11-20",
    validTo: "2023-11-30",
    usage: 87,
    status: "Expired"
  },
  {
    id: 4,
    code: "HOLIDAY15",
    discount: 15,
    type: "Percentage",
    minPurchase: 75,
    maxDiscount: 30,
    validFrom: "2023-12-01",
    validTo: "2023-12-31",
    usage: 112,
    status: "Active"
  },
  {
    id: 5,
    code: "APP20",
    discount: 20,
    type: "Percentage",
    minPurchase: 50,
    maxDiscount: 40,
    validFrom: "2023-10-01",
    validTo: "2023-12-31",
    usage: 203,
    status: "Active"
  },
  {
    id: 6,
    code: "FLASH30",
    discount: 30,
    type: "Percentage",
    minPurchase: 150,
    maxDiscount: 75,
    validFrom: "2024-01-01",
    validTo: "2024-01-07",
    usage: 0,
    status: "Scheduled"
  }
];

export default function Coupons() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCoupons = searchTerm 
    ? coupons.filter(coupon => 
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : coupons;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Coupons</h2>
          <p className="text-muted-foreground">
            Manage discount coupons and promotions
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Coupon</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Discount Coupons</CardTitle>
          <CardDescription>
            Showing {filteredCoupons.length} coupons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search coupons..." 
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
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Minimum Purchase</TableHead>
                  <TableHead>Validity</TableHead>
                  <TableHead className="text-center">Usage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoupons.map(coupon => (
                  <TableRow key={coupon.id}>
                    <TableCell className="font-medium">#{coupon.id}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Percent className="h-5 w-5 text-muted-foreground" />
                      <span className="font-mono uppercase">{coupon.code}</span>
                    </TableCell>
                    <TableCell>
                      {coupon.type === "Percentage" ? `${coupon.discount}%` : `$${coupon.discount}`}
                      {coupon.maxDiscount && <span className="text-xs text-muted-foreground ml-1">(max ${coupon.maxDiscount})</span>}
                    </TableCell>
                    <TableCell>{coupon.minPurchase > 0 ? `$${coupon.minPurchase}` : "None"}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {coupon.validFrom} to {coupon.validTo}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{coupon.usage}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          coupon.status === "Active" ? "default" : 
                          coupon.status === "Expired" ? "destructive" : 
                          "secondary"
                        }
                      >
                        {coupon.status}
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
