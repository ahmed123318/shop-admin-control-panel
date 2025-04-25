import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Category, CategoryFormValues } from "@/types/category";
import { CategoryForm } from "@/components/categories/CategoryForm";
import { CategoriesTable } from "@/components/categories/CategoriesTable";
import { CategorySearch } from "@/components/categories/CategorySearch";

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    products: 124,
    subcategories: 8,
    status: "Active",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Clothing",
    slug: "clothing",
    products: 89,
    subcategories: 12,
    status: "Active",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Home & Garden",
    slug: "home-garden",
    products: 76,
    subcategories: 15,
    status: "Active",
    image: ""
  },
  {
    id: 4,
    name: "Beauty",
    slug: "beauty",
    products: 52,
    subcategories: 6,
    status: "Active",
    image: ""
  },
  {
    id: 5,
    name: "Sports",
    slug: "sports",
    products: 43,
    subcategories: 9,
    status: "Active",
    image: ""
  },
  {
    id: 6,
    name: "Books",
    slug: "books",
    products: 67,
    subcategories: 5,
    status: "Active",
    image: ""
  },
  {
    id: 7,
    name: "Toys",
    slug: "toys",
    products: 31,
    subcategories: 4,
    status: "Inactive",
    image: ""
  }
];

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { toast } = useToast();

  const filteredCategories = searchTerm 
    ? categories.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categories;

  const handleCreateCategory = (values: CategoryFormValues) => {
    const newCategory: Category = {
      id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
      name: values.name,
      slug: values.slug,
      products: 0,
      subcategories: 0,
      status: values.status,
      image: values.image || ""
    };
    
    setCategories([...categories, newCategory]);
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Category created",
      description: `${newCategory.name} has been added successfully.`,
    });
  };

  const handleUpdateCategory = (values: CategoryFormValues) => {
    if (!selectedCategory) return;
    
    const updatedCategories = categories.map(category => 
      category.id === selectedCategory.id 
        ? { ...category, name: values.name, slug: values.slug, status: values.status, image: values.image }
        : category
    );
    
    setCategories(updatedCategories);
    setIsUpdateDialogOpen(false);
    
    toast({
      title: "Category updated",
      description: `${values.name} has been updated successfully.`,
    });
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;
    
    const updatedCategories = categories.filter(category => category.id !== selectedCategory.id);
    setCategories(updatedCategories);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Category deleted",
      description: `${selectedCategory.name} has been deleted successfully.`,
      variant: "destructive",
    });
  };

  const openUpdateDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsUpdateDialogOpen(true);
  };

  const openDeleteDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Manage your product categories
          </p>
        </div>
        <Button 
          className="flex items-center gap-2" 
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Add Category</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Showing {filteredCategories.length} categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <CategorySearch value={searchTerm} onChange={setSearchTerm} />
          </div>
          <CategoriesTable 
            categories={filteredCategories}
            onEdit={openUpdateDialog}
            onDelete={openDeleteDialog}
          />
        </CardContent>
      </Card>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new product category.
            </DialogDescription>
          </DialogHeader>
          <CategoryForm onSubmit={handleCreateCategory} />
        </DialogContent>
      </Dialog>

      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update category details.
            </DialogDescription>
          </DialogHeader>
          {selectedCategory && (
            <CategoryForm 
              initialValues={{
                name: selectedCategory.name,
                slug: selectedCategory.slug,
                status: selectedCategory.status,
                image: selectedCategory.image
              }} 
              onSubmit={handleUpdateCategory}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the category{" "}
              <span className="font-semibold">{selectedCategory?.name}</span> and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCategory} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
