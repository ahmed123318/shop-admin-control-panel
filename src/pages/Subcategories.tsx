
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
import { Plus, Edit, Trash2, Folder, Search } from "lucide-react";

// Define form schema
const subcategoryFormSchema = z.object({
  name: z.string().min(2, "Subcategory name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  categoryId: z.string().min(1, "Please select a parent category"),
  status: z.enum(["Active", "Inactive"])
});

type SubcategoryFormValues = z.infer<typeof subcategoryFormSchema>;

// Category for selection
interface Category {
  id: number;
  name: string;
}

// Subcategory type definition
interface Subcategory {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  categoryName: string;
  products: number;
  status: "Active" | "Inactive";
}

const categories: Category[] = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Home & Garden" }
];

const initialSubcategories: Subcategory[] = [
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
  const [subcategories, setSubcategories] = useState<Subcategory[]>(initialSubcategories);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const { toast } = useToast();

  const filteredSubcategories = searchTerm 
    ? subcategories.filter(subcategory => 
        subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subcategory.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : subcategories;

  // Form for creating and updating subcategories
  const form = useForm<SubcategoryFormValues>({
    resolver: zodResolver(subcategoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      categoryId: "",
      status: "Active"
    },
  });

  // Handle subcategory creation
  const handleCreateSubcategory = (values: SubcategoryFormValues) => {
    const categoryId = parseInt(values.categoryId);
    const category = categories.find(c => c.id === categoryId);
    
    if (!category) {
      toast({
        title: "Error",
        description: "Selected category not found.",
        variant: "destructive",
      });
      return;
    }
    
    const newSubcategory: Subcategory = {
      id: subcategories.length > 0 ? Math.max(...subcategories.map(s => s.id)) + 1 : 1,
      name: values.name,
      slug: values.slug,
      categoryId: categoryId,
      categoryName: category.name,
      products: 0,
      status: values.status
    };
    
    setSubcategories([...subcategories, newSubcategory]);
    setIsCreateDialogOpen(false);
    form.reset();
    
    toast({
      title: "Subcategory created",
      description: `${newSubcategory.name} has been added successfully.`,
    });
  };

  // Handle subcategory update
  const handleUpdateSubcategory = (values: SubcategoryFormValues) => {
    if (!selectedSubcategory) return;
    
    const categoryId = parseInt(values.categoryId);
    const category = categories.find(c => c.id === categoryId);
    
    if (!category) {
      toast({
        title: "Error",
        description: "Selected category not found.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedSubcategories = subcategories.map(subcategory => 
      subcategory.id === selectedSubcategory.id 
        ? { 
            ...subcategory, 
            name: values.name, 
            slug: values.slug,
            categoryId: categoryId,
            categoryName: category.name,
            status: values.status 
          }
        : subcategory
    );
    
    setSubcategories(updatedSubcategories);
    setIsUpdateDialogOpen(false);
    form.reset();
    
    toast({
      title: "Subcategory updated",
      description: `${values.name} has been updated successfully.`,
    });
  };

  // Handle subcategory deletion
  const handleDeleteSubcategory = () => {
    if (!selectedSubcategory) return;
    
    const updatedSubcategories = subcategories.filter(subcategory => subcategory.id !== selectedSubcategory.id);
    setSubcategories(updatedSubcategories);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Subcategory deleted",
      description: `${selectedSubcategory.name} has been deleted successfully.`,
      variant: "destructive",
    });
  };

  // Open update dialog and populate form
  const openUpdateDialog = (subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
    form.reset({
      name: subcategory.name,
      slug: subcategory.slug,
      categoryId: subcategory.categoryId.toString(),
      status: subcategory.status
    });
    setIsUpdateDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Subcategories</h2>
          <p className="text-muted-foreground">
            Manage your product subcategories
          </p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => {
          form.reset({name: "", slug: "", categoryId: "", status: "Active"});
          setIsCreateDialogOpen(true);
        }}>
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
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openUpdateDialog(subcategory)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openDeleteDialog(subcategory)}
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

      {/* Create Subcategory Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Subcategory</DialogTitle>
            <DialogDescription>
              Create a new product subcategory.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateSubcategory)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategory Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter subcategory name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Category</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border rounded-md"
                        {...field}
                      >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id.toString()}>
                            {category.name}
                          </option>
                        ))}
                      </select>
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
                <Button type="submit">Create Subcategory</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Update Subcategory Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Subcategory</DialogTitle>
            <DialogDescription>
              Update subcategory details.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateSubcategory)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategory Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter subcategory name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Category</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border rounded-md"
                        {...field}
                      >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id.toString()}>
                            {category.name}
                          </option>
                        ))}
                      </select>
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
                <Button type="submit">Update Subcategory</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Subcategory Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the subcategory{" "}
              <span className="font-semibold">{selectedSubcategory?.name}</span> and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSubcategory} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
