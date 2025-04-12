
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Edit, Trash2, Percent, Search, Calendar } from "lucide-react";

// Define coupon form schema
const couponFormSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").toUpperCase(),
  discount: z.string().transform(val => parseInt(val, 10)),
  type: z.enum(["Percentage", "Fixed"]),
  minPurchase: z.string().transform(val => parseInt(val, 10)),
  maxDiscount: z.string().transform(val => {
    if (val === "") return null;
    return parseInt(val, 10);
  }).nullable(),
  validFrom: z.string(),
  validTo: z.string(),
  status: z.enum(["Active", "Inactive", "Expired", "Scheduled"])
});

type CouponFormValues = z.infer<typeof couponFormSchema>;

interface Coupon {
  id: number;
  code: string;
  discount: number;
  type: "Percentage" | "Fixed";
  minPurchase: number;
  maxDiscount: number | null;
  validFrom: string;
  validTo: string;
  usage: number;
  status: "Active" | "Inactive" | "Expired" | "Scheduled";
}

const initialCoupons: Coupon[] = [
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
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const { toast } = useToast();

  const filteredCoupons = searchTerm 
    ? coupons.filter(coupon => 
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : coupons;

  // Form for creating and updating coupons
  const form = useForm<CouponFormValues>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      code: "",
      discount: "10",
      type: "Percentage",
      minPurchase: "0",
      maxDiscount: "",
      validFrom: new Date().toISOString().split('T')[0],
      validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "Active"
    },
  });

  // Handle coupon creation
  const handleCreateCoupon = (values: CouponFormValues) => {
    const newCoupon: Coupon = {
      id: coupons.length > 0 ? Math.max(...coupons.map(c => c.id)) + 1 : 1,
      code: values.code,
      discount: values.discount,
      type: values.type,
      minPurchase: values.minPurchase,
      maxDiscount: values.maxDiscount,
      validFrom: values.validFrom,
      validTo: values.validTo,
      usage: 0,
      status: values.status
    };
    
    setCoupons([...coupons, newCoupon]);
    setIsCreateDialogOpen(false);
    form.reset();
    
    toast({
      title: "Coupon created",
      description: `${newCoupon.code} has been added successfully.`,
    });
  };

  // Handle coupon update
  const handleUpdateCoupon = (values: CouponFormValues) => {
    if (!selectedCoupon) return;
    
    const updatedCoupons = coupons.map(coupon => 
      coupon.id === selectedCoupon.id 
        ? { 
            ...coupon, 
            code: values.code,
            discount: values.discount,
            type: values.type,
            minPurchase: values.minPurchase,
            maxDiscount: values.maxDiscount,
            validFrom: values.validFrom,
            validTo: values.validTo,
            status: values.status
          }
        : coupon
    );
    
    setCoupons(updatedCoupons);
    setIsUpdateDialogOpen(false);
    form.reset();
    
    toast({
      title: "Coupon updated",
      description: `${values.code} has been updated successfully.`,
    });
  };

  // Handle coupon deletion
  const handleDeleteCoupon = () => {
    if (!selectedCoupon) return;
    
    const updatedCoupons = coupons.filter(coupon => coupon.id !== selectedCoupon.id);
    setCoupons(updatedCoupons);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Coupon deleted",
      description: `${selectedCoupon.code} has been deleted successfully.`,
      variant: "destructive",
    });
  };

  // Open update dialog and populate form
  const openUpdateDialog = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    form.reset({
      code: coupon.code,
      discount: coupon.discount.toString(),
      type: coupon.type,
      minPurchase: coupon.minPurchase.toString(),
      maxDiscount: coupon.maxDiscount ? coupon.maxDiscount.toString() : "",
      validFrom: coupon.validFrom,
      validTo: coupon.validTo,
      status: coupon.status
    });
    setIsUpdateDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Coupons</h2>
          <p className="text-muted-foreground">
            Manage discount coupons and promotions
          </p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => {
          form.reset({
            code: "",
            discount: "10",
            type: "Percentage",
            minPurchase: "0",
            maxDiscount: "",
            validFrom: new Date().toISOString().split('T')[0],
            validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: "Active"
          });
          setIsCreateDialogOpen(true);
        }}>
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
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openUpdateDialog(coupon)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openDeleteDialog(coupon)}
                        >
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

      {/* Create Coupon Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Coupon</DialogTitle>
            <DialogDescription>
              Create a new discount coupon for your store.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateCoupon)} className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupon Code</FormLabel>
                    <FormControl>
                      <Input placeholder="SUMMER25" {...field} className="uppercase" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Value</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Type</FormLabel>
                      <FormControl>
                        <select
                          className="w-full p-2 border rounded-md"
                          {...field}
                        >
                          <option value="Percentage">Percentage (%)</option>
                          <option value="Fixed">Fixed ($)</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minPurchase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min. Purchase ($)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxDiscount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max. Discount ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Optional" 
                          {...field} 
                          value={field.value || ""} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="validFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valid From</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="validTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valid To</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border rounded-md"
                        {...field}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Scheduled">Scheduled</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Create Coupon</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Update Coupon Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Coupon</DialogTitle>
            <DialogDescription>
              Update coupon details.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateCoupon)} className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupon Code</FormLabel>
                    <FormControl>
                      <Input placeholder="SUMMER25" {...field} className="uppercase" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Value</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Type</FormLabel>
                      <FormControl>
                        <select
                          className="w-full p-2 border rounded-md"
                          {...field}
                        >
                          <option value="Percentage">Percentage (%)</option>
                          <option value="Fixed">Fixed ($)</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minPurchase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min. Purchase ($)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxDiscount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max. Discount ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Optional" 
                          {...field} 
                          value={field.value || ""} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="validFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valid From</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="validTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valid To</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border rounded-md"
                        {...field}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Expired">Expired</option>
                        <option value="Scheduled">Scheduled</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Update Coupon</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Coupon Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the coupon{" "}
              <span className="font-semibold font-mono">{selectedCoupon?.code}</span> and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCoupon} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
