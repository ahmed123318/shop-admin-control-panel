
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
import { Plus, Edit, Trash2, Ticket, Search } from "lucide-react";

// Define coupon form schema with proper data type conversions
const couponFormSchema = z.object({
  code: z.string().min(2, "Code must be at least 2 characters").max(20, "Code cannot be longer than 20 characters"),
  type: z.enum(["Percentage", "Fixed", "Free Shipping"]),
  value: z.string().transform(val => parseFloat(val)),
  minPurchase: z.string().transform(val => parseFloat(val)),
  maxUses: z.string().transform(val => parseInt(val, 10)),
  status: z.enum(["Active", "Inactive", "Expired"])
});

type CouponFormValues = z.infer<typeof couponFormSchema>;

interface Coupon {
  id: number;
  code: string;
  type: "Percentage" | "Fixed" | "Free Shipping";
  value: number;
  minPurchase: number;
  maxUses: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  status: "Active" | "Inactive" | "Expired";
}

const initialCoupons: Coupon[] = [
  {
    id: 1,
    code: "SUMMER20",
    type: "Percentage",
    value: 20.0,
    minPurchase: 50.0,
    maxUses: 100,
    usedCount: 35,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    status: "Active"
  },
  {
    id: 2,
    code: "FREESHIP",
    type: "Free Shipping",
    value: 0.0,
    minPurchase: 25.0,
    maxUses: 50,
    usedCount: 12,
    startDate: "2023-07-15",
    endDate: "2023-09-15",
    status: "Active"
  },
  {
    id: 3,
    code: "NEWUSER10",
    type: "Percentage",
    value: 10.0,
    minPurchase: 0.0,
    maxUses: 200,
    usedCount: 145,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: "Active"
  },
  {
    id: 4,
    code: "FIXED15",
    type: "Fixed",
    value: 15.0,
    minPurchase: 40.0,
    maxUses: 75,
    usedCount: 60,
    startDate: "2023-09-01",
    endDate: "2023-10-31",
    status: "Active"
  },
  {
    id: 5,
    code: "WINTER25",
    type: "Percentage",
    value: 25.0,
    minPurchase: 100.0,
    maxUses: 50,
    usedCount: 48,
    startDate: "2023-12-01",
    endDate: "2024-02-29",
    status: "Inactive"
  },
  {
    id: 6,
    code: "SPRING5",
    type: "Percentage",
    value: 5.0,
    minPurchase: 20.0,
    maxUses: 150,
    usedCount: 150,
    startDate: "2023-03-01",
    endDate: "2023-05-31",
    status: "Expired"
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
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coupon.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : coupons;

  // Form for creating and updating coupons
  const form = useForm<CouponFormValues>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      code: "",
      type: "Percentage",
      value: "0",
      minPurchase: "0",
      maxUses: "1",
      status: "Active"
    },
  });

  // Handle coupon creation
  const handleCreateCoupon = (values: CouponFormValues) => {
    const newCoupon: Coupon = {
      id: coupons.length > 0 ? Math.max(...coupons.map(c => c.id)) + 1 : 1,
      code: values.code.toUpperCase(),
      type: values.type,
      value: Number(values.value),
      minPurchase: Number(values.minPurchase),
      maxUses: Number(values.maxUses),
      usedCount: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: values.status
    };
    
    setCoupons([...coupons, newCoupon]);
    setIsCreateDialogOpen(false);
    form.reset();
    
    toast({
      title: "Coupon created",
      description: `Coupon ${newCoupon.code} has been added successfully.`,
    });
  };

  // Handle coupon update
  const handleUpdateCoupon = (values: CouponFormValues) => {
    if (!selectedCoupon) return;
    
    const updatedCoupons = coupons.map(coupon => 
      coupon.id === selectedCoupon.id 
        ? { 
            ...coupon, 
            code: values.code.toUpperCase(),
            type: values.type,
            value: Number(values.value),
            minPurchase: Number(values.minPurchase),
            maxUses: Number(values.maxUses),
            status: values.status 
          }
        : coupon
    );
    
    setCoupons(updatedCoupons);
    setIsUpdateDialogOpen(false);
    form.reset();
    
    toast({
      title: "Coupon updated",
      description: `Coupon ${values.code} has been updated successfully.`,
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
      description: `Coupon ${selectedCoupon.code} has been deleted successfully.`,
      variant: "destructive",
    });
  };

  // Open update dialog and populate form
  const openUpdateDialog = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    form.reset({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value.toString(),
      minPurchase: coupon.minPurchase.toString(),
      maxUses: coupon.maxUses.toString(),
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
            Manage your discount coupons
          </p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => {
          form.reset({
            code: "",
            type: "Percentage",
            value: "0",
            minPurchase: "0",
            maxUses: "1",
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
          <CardTitle>Coupons</CardTitle>
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
                  <TableHead>Type</TableHead>
                  <TableHead className="text-center">Value</TableHead>
                  <TableHead>Min. Purchase</TableHead>
                  <TableHead className="text-center">Used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoupons.map(coupon => (
                  <TableRow key={coupon.id}>
                    <TableCell className="font-medium">#{coupon.id}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Ticket className="h-5 w-5 text-muted-foreground" />
                      {coupon.code}
                    </TableCell>
                    <TableCell>{coupon.type}</TableCell>
                    <TableCell className="text-center">
                      {coupon.type === "Percentage" ? `${coupon.value}%` : `$${coupon.value}`}
                    </TableCell>
                    <TableCell>${coupon.minPurchase}</TableCell>
                    <TableCell className="text-center">{coupon.usedCount} / {coupon.maxUses}</TableCell>
                    <TableCell>
                      <Badge variant={coupon.status === "Active" ? "default" : coupon.status === "Expired" ? "destructive" : "secondary"}>
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
              Create a new discount coupon.
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
                      <Input placeholder="e.g., SUMMER20" {...field} />
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
                    <FormLabel>Coupon Type</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border rounded-md"
                        {...field}
                      >
                        <option value="Percentage">Percentage</option>
                        <option value="Fixed">Fixed Amount</option>
                        <option value="Free Shipping">Free Shipping</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min="0" max="100" placeholder="e.g., 20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="minPurchase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min. Purchase</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min="0" placeholder="e.g., 50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="maxUses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max. Uses</FormLabel>
                    <FormControl>
                      <Input type="number" step="1" min="1" placeholder="e.g., 100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <Input placeholder="e.g., SUMMER20" {...field} />
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
                    <FormLabel>Coupon Type</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border rounded-md"
                        {...field}
                      >
                        <option value="Percentage">Percentage</option>
                        <option value="Fixed">Fixed Amount</option>
                        <option value="Free Shipping">Free Shipping</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min="0" max="100" placeholder="e.g., 20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="minPurchase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min. Purchase</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min="0" placeholder="e.g., 50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="maxUses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max. Uses</FormLabel>
                    <FormControl>
                      <Input type="number" step="1" min="1" placeholder="e.g., 100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <span className="font-semibold">{selectedCoupon?.code}</span> and remove it from our servers.
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
