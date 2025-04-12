
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
import { Plus, Edit, Trash2, Percent, Search } from "lucide-react";

// Define tax form schema
const taxFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  rate: z.string().transform(val => parseFloat(val)),
  country: z.string().min(2, "Country must be at least 2 characters"),
  region: z.string(),
  productCategories: z.string(),
  status: z.enum(["Active", "Inactive"])
});

type TaxFormValues = z.infer<typeof taxFormSchema>;

interface Tax {
  id: number;
  name: string;
  rate: number;
  country: string;
  region: string;
  productCategories: string;
  status: "Active" | "Inactive";
}

const initialTaxes: Tax[] = [
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
  const [taxes, setTaxes] = useState<Tax[]>(initialTaxes);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTax, setSelectedTax] = useState<Tax | null>(null);
  const { toast } = useToast();

  const filteredTaxes = searchTerm 
    ? taxes.filter(tax => 
        tax.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tax.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tax.region.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : taxes;

  const form = useForm<TaxFormValues>({
    resolver: zodResolver(taxFormSchema),
    defaultValues: {
      name: "",
      rate: "0",
      country: "",
      region: "All",
      productCategories: "All",
      status: "Active"
    },
  });

  const handleCreateTax = (values: TaxFormValues) => {
    const newTax: Tax = {
      id: taxes.length > 0 ? Math.max(...taxes.map(t => t.id)) + 1 : 1,
      name: values.name,
      rate: Number(values.rate),
      country: values.country,
      region: values.region,
      productCategories: values.productCategories,
      status: values.status
    };
    
    setTaxes([...taxes, newTax]);
    setIsCreateDialogOpen(false);
    form.reset();
    
    toast({
      title: "Tax rate created",
      description: `${newTax.name} has been added successfully.`,
    });
  };

  const handleUpdateTax = (values: TaxFormValues) => {
    if (!selectedTax) return;
    
    const updatedTaxes = taxes.map(tax => 
      tax.id === selectedTax.id 
        ? { 
            ...tax, 
            name: values.name,
            rate: Number(values.rate),
            country: values.country,
            region: values.region,
            productCategories: values.productCategories,
            status: values.status 
          }
        : tax
    );
    
    setTaxes(updatedTaxes);
    setIsUpdateDialogOpen(false);
    form.reset();
    
    toast({
      title: "Tax rate updated",
      description: `${values.name} has been updated successfully.`,
    });
  };

  const handleDeleteTax = () => {
    if (!selectedTax) return;
    
    const updatedTaxes = taxes.filter(tax => tax.id !== selectedTax.id);
    setTaxes(updatedTaxes);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Tax rate deleted",
      description: `${selectedTax.name} has been deleted successfully.`,
      variant: "destructive",
    });
  };

  const openUpdateDialog = (tax: Tax) => {
    setSelectedTax(tax);
    form.reset({
      name: tax.name,
      rate: tax.rate.toString(),
      country: tax.country,
      region: tax.region,
      productCategories: tax.productCategories,
      status: tax.status
    });
    setIsUpdateDialogOpen(true);
  };

  const openDeleteDialog = (tax: Tax) => {
    setSelectedTax(tax);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Taxes</h2>
          <p className="text-muted-foreground">
            Manage tax rates and rules
          </p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => {
          form.reset({
            name: "",
            rate: "0",
            country: "",
            region: "All",
            productCategories: "All",
            status: "Active"
          });
          setIsCreateDialogOpen(true);
        }}>
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
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openUpdateDialog(tax)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openDeleteDialog(tax)}
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

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Tax Rate</DialogTitle>
            <DialogDescription>
              Create a new tax rate for your products.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateTax)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Sales Tax, VAT" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" max="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., United States" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region/State</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., California, All" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="productCategories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Applied To (Categories)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Electronics, All" {...field} />
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
                <Button type="submit">Create Tax</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Tax Rate</DialogTitle>
            <DialogDescription>
              Update tax rate details.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateTax)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Sales Tax, VAT" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" max="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., United States" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region/State</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., California, All" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="productCategories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Applied To (Categories)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Electronics, All" {...field} />
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
                <Button type="submit">Update Tax</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the tax rate{" "}
              <span className="font-semibold">{selectedTax?.name}</span> for{" "}
              <span className="font-semibold">{selectedTax?.country} ({selectedTax?.region})</span> and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTax} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
