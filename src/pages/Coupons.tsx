
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

type CouponType = "percentage" | "fixed";
type CouponStatus = "active" | "expired" | "scheduled";

interface Coupon {
  id: number;
  code: string;
  type: CouponType;
  value: number;
  minPurchase: number;
  maxUses: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  status: CouponStatus;
}

interface CouponFormValues {
  code: string;
  type: CouponType;
  value: number;
  minPurchase: number;
  maxUses: number;
  status: CouponStatus;
}

export default function Coupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: 1,
      code: "WELCOME20",
      type: "percentage",
      value: 20,
      minPurchase: 50,
      maxUses: 100,
      usedCount: 45,
      startDate: "2023-04-01",
      endDate: "2023-12-31",
      status: "active"
    },
    {
      id: 2,
      code: "SUMMER10",
      type: "percentage",
      value: 10,
      minPurchase: 25,
      maxUses: 500,
      usedCount: 213,
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      status: "expired"
    },
    {
      id: 3,
      code: "FREESHIP",
      type: "fixed",
      value: 15,
      minPurchase: 75,
      maxUses: 200,
      usedCount: 0,
      startDate: "2023-09-01",
      endDate: "2023-09-30",
      status: "scheduled"
    }
  ]);
  
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [isEditCouponOpen, setIsEditCouponOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [formValues, setFormValues] = useState<CouponFormValues>({
    code: "",
    type: "percentage",
    value: 0,
    minPurchase: 0,
    maxUses: 0,
    status: "active"
  });
  
  const { toast } = useToast();
  
  const handleOpenAddCoupon = () => {
    setFormValues({
      code: "",
      type: "percentage",
      value: 0,
      minPurchase: 0,
      maxUses: 0,
      status: "active"
    });
    setIsAddCouponOpen(true);
  };
  
  const handleOpenEditCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setFormValues({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      minPurchase: coupon.minPurchase,
      maxUses: coupon.maxUses,
      status: coupon.status
    });
    setIsEditCouponOpen(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "value" || name === "minPurchase" || name === "maxUses") {
      setFormValues({
        ...formValues,
        [name]: Number(value)
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value
      });
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  
  const handleAddCoupon = () => {
    const newCoupon: Coupon = {
      id: coupons.length > 0 ? Math.max(...coupons.map(c => c.id)) + 1 : 1,
      code: formValues.code.toUpperCase(),
      type: formValues.type,
      value: Number(formValues.value),
      minPurchase: Number(formValues.minPurchase),
      maxUses: Number(formValues.maxUses),
      usedCount: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: formValues.status
    };
    
    setCoupons([...coupons, newCoupon]);
    setIsAddCouponOpen(false);
    
    toast({
      title: "Coupon Added",
      description: `Coupon ${newCoupon.code} has been created successfully.`,
    });
  };
  
  const handleUpdateCoupon = () => {
    if (!selectedCoupon) return;
    
    setCoupons(coupons.map(coupon => 
      coupon.id === selectedCoupon.id 
        ? { 
            ...coupon, 
            code: formValues.code.toUpperCase(),
            type: formValues.type,
            value: Number(formValues.value),
            minPurchase: Number(formValues.minPurchase),
            maxUses: Number(formValues.maxUses),
            status: formValues.status 
          }
        : coupon
    ));
    
    setIsEditCouponOpen(false);
    
    toast({
      title: "Coupon Updated",
      description: `Coupon ${formValues.code} has been updated successfully.`,
    });
  };
  
  const handleDeleteCoupon = (id: number) => {
    setCoupons(coupons.filter(coupon => coupon.id !== id));
    
    toast({
      title: "Coupon Deleted",
      description: "The coupon has been deleted successfully.",
    });
  };
  
  const getStatusBadgeColor = (status: CouponStatus) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "expired":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      case "scheduled":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Coupons</h2>
          <p className="text-muted-foreground">
            Manage your store's discount coupons and promotional offers
          </p>
        </div>
        <Button onClick={handleOpenAddCoupon}>Add New Coupon</Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Min. Purchase</TableHead>
              <TableHead>Uses</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map(coupon => (
              <TableRow key={coupon.id}>
                <TableCell className="font-medium">{coupon.code}</TableCell>
                <TableCell>{coupon.type === "percentage" ? "Percentage" : "Fixed Amount"}</TableCell>
                <TableCell>
                  {coupon.type === "percentage" ? `${coupon.value}%` : `$${coupon.value.toFixed(2)}`}
                </TableCell>
                <TableCell>${coupon.minPurchase.toFixed(2)}</TableCell>
                <TableCell>{coupon.usedCount} / {coupon.maxUses}</TableCell>
                <TableCell className="text-xs">
                  <div>{coupon.startDate}</div>
                  <div>{coupon.endDate}</div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(coupon.status)} variant="outline">
                    {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleOpenEditCoupon(coupon)}
                    >
                      Edit
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Coupon</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the coupon "{coupon.code}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteCoupon(coupon.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Add Coupon Dialog */}
      <Dialog open={isAddCouponOpen} onOpenChange={setIsAddCouponOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Coupon</DialogTitle>
            <DialogDescription>
              Create a new discount coupon for your store
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Code
              </Label>
              <Input
                id="code"
                name="code"
                className="col-span-3"
                value={formValues.code}
                onChange={handleInputChange}
                placeholder="e.g., SUMMER20"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Type</Label>
              <Select 
                value={formValues.type} 
                onValueChange={(value) => handleSelectChange('type', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select coupon type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Value
              </Label>
              <Input
                id="value"
                name="value"
                type="number"
                className="col-span-3"
                value={formValues.value}
                onChange={handleInputChange}
                min={0}
                placeholder={formValues.type === "percentage" ? "e.g., 10 for 10%" : "e.g., 15 for $15"}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="minPurchase" className="text-right">
                Min. Purchase ($)
              </Label>
              <Input
                id="minPurchase"
                name="minPurchase"
                type="number"
                className="col-span-3"
                value={formValues.minPurchase}
                onChange={handleInputChange}
                min={0}
                placeholder="e.g., 50"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maxUses" className="text-right">
                Max Uses
              </Label>
              <Input
                id="maxUses"
                name="maxUses"
                type="number"
                className="col-span-3"
                value={formValues.maxUses}
                onChange={handleInputChange}
                min={0}
                placeholder="e.g., 100"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <Select 
                value={formValues.status} 
                onValueChange={(value: CouponStatus) => handleSelectChange('status', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCouponOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCoupon}>
              Create Coupon
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Coupon Dialog */}
      <Dialog open={isEditCouponOpen} onOpenChange={setIsEditCouponOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Coupon</DialogTitle>
            <DialogDescription>
              Update the details of this coupon
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-code" className="text-right">
                Code
              </Label>
              <Input
                id="edit-code"
                name="code"
                className="col-span-3"
                value={formValues.code}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Type</Label>
              <Select 
                value={formValues.type} 
                onValueChange={(value) => handleSelectChange('type', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select coupon type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-value" className="text-right">
                Value
              </Label>
              <Input
                id="edit-value"
                name="value"
                type="number"
                className="col-span-3"
                value={formValues.value}
                onChange={handleInputChange}
                min={0}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-minPurchase" className="text-right">
                Min. Purchase ($)
              </Label>
              <Input
                id="edit-minPurchase"
                name="minPurchase"
                type="number"
                className="col-span-3"
                value={formValues.minPurchase}
                onChange={handleInputChange}
                min={0}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-maxUses" className="text-right">
                Max Uses
              </Label>
              <Input
                id="edit-maxUses"
                name="maxUses"
                type="number"
                className="col-span-3"
                value={formValues.maxUses}
                onChange={handleInputChange}
                min={0}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <Select 
                value={formValues.status} 
                onValueChange={(value: CouponStatus) => handleSelectChange('status', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCouponOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCoupon}>
              Update Coupon
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
