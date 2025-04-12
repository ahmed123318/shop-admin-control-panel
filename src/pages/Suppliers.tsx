
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
import { Plus, Edit, Trash2, Truck, Search, Phone, Mail } from "lucide-react";

// Define supplier form schema
const supplierFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  status: z.enum(["Active", "Inactive"])
});

type SupplierFormValues = z.infer<typeof supplierFormSchema>;

interface Supplier {
  id: number;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  products: number;
  status: "Active" | "Inactive";
}

const initialSuppliers: Supplier[] = [
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
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const { toast } = useToast();

  const filteredSuppliers = searchTerm 
    ? suppliers.filter(supplier => 
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : suppliers;

  // Form for creating and updating suppliers
  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      name: "",
      contactName: "",
      email: "",
      phone: "",
      address: "",
      status: "Active"
    },
  });

  // Handle supplier creation
  const handleCreateSupplier = (values: SupplierFormValues) => {
    const newSupplier: Supplier = {
      id: suppliers.length > 0 ? Math.max(...suppliers.map(s => s.id)) + 1 : 1,
      name: values.name,
      contactName: values.contactName,
      email: values.email,
      phone: values.phone,
      address: values.address,
      products: 0,
      status: values.status
    };
    
    setSuppliers([...suppliers, newSupplier]);
    setIsCreateDialogOpen(false);
    form.reset();
    
    toast({
      title: "Supplier created",
      description: `${newSupplier.name} has been added successfully.`,
    });
  };

  // Handle supplier update
  const handleUpdateSupplier = (values: SupplierFormValues) => {
    if (!selectedSupplier) return;
    
    const updatedSuppliers = suppliers.map(supplier => 
      supplier.id === selectedSupplier.id 
        ? { 
            ...supplier, 
            name: values.name,
            contactName: values.contactName,
            email: values.email,
            phone: values.phone,
            address: values.address,
            status: values.status 
          }
        : supplier
    );
    
    setSuppliers(updatedSuppliers);
    setIsUpdateDialogOpen(false);
    form.reset();
    
    toast({
      title: "Supplier updated",
      description: `${values.name} has been updated successfully.`,
    });
  };

  // Handle supplier deletion
  const handleDeleteSupplier = () => {
    if (!selectedSupplier) return;
    
    const updatedSuppliers = suppliers.filter(supplier => supplier.id !== selectedSupplier.id);
    setSuppliers(updatedSuppliers);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Supplier deleted",
      description: `${selectedSupplier.name} has been deleted successfully.`,
      variant: "destructive",
    });
  };

  // Open update dialog and populate form
  const openUpdateDialog = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    form.reset({
      name: supplier.name,
      contactName: supplier.contactName,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      status: supplier.status
    });
    setIsUpdateDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Suppliers</h2>
          <p className="text-muted-foreground">
            Manage your product suppliers
          </p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => {
          form.reset({name: "", contactName: "", email: "", phone: "", address: "", status: "Active"});
          setIsCreateDialogOpen(true);
        }}>
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
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openUpdateDialog(supplier)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openDeleteDialog(supplier)}
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

      {/* Create Supplier Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
            <DialogDescription>
              Create a new product supplier.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateSupplier)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contact name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
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
                <Button type="submit">Create Supplier</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Update Supplier Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Supplier</DialogTitle>
            <DialogDescription>
              Update supplier details.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateSupplier)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contact name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
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
                <Button type="submit">Update Supplier</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Supplier Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the supplier{" "}
              <span className="font-semibold">{selectedSupplier?.name}</span> and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSupplier} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
