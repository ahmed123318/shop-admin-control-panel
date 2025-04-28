
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ProductForm from "@/components/products/ProductForm";
import { ProductFormValues } from "@/schemas/productSchema";
import { useToast } from "@/hooks/use-toast";

export default function CreateProduct() {
  const { toast } = useToast();

  const handleSubmit = (data: ProductFormValues) => {
    // In a real app, this would send the data to an API
    console.log("Form submitted with:", data);
    
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        toast({
          title: "Product Created",
          description: `${data.name} has been created successfully.`,
        });
        resolve(true);
      }, 1000);
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Product</h1>
        <p className="text-muted-foreground mt-1">
          Fill in the details below to add a new product to your inventory.
        </p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <ProductForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
