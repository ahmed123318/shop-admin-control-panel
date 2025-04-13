
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Define the schema for product validation
const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  brand: z.string().min(2, "Brand must be at least 2 characters"),
  category: z.string().min(2, "Category is required"),
  subcategory: z.string().min(2, "Subcategory is required"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Stock must be a non-negative number",
  }),
  status: z.string(),
  description: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialValues?: ProductFormValues & { id?: number, images?: string[], coverImage?: string };
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
}

const categories = [
  "Electronics",
  "Clothing",
  "Footwear",
  "Home & Garden",
  "Beauty",
  "Sports",
  "Toys",
  "Books",
  "Automotive",
];

const subcategoriesByCategory: Record<string, string[]> = {
  Electronics: ["Laptops", "Smartphones", "Gaming Consoles", "Smart Home", "Cameras", "Accessories"],
  Clothing: ["T-shirts", "Jeans", "Dresses", "Shirts", "Jackets", "Sweaters"],
  Footwear: ["Sneakers", "Formal Shoes", "Boots", "Sandals", "Athletic Shoes"],
  "Home & Garden": ["Furniture", "Kitchen", "Bedding", "Decor", "Garden Tools"],
  Beauty: ["Skincare", "Makeup", "Haircare", "Fragrances", "Bath & Body"],
  Sports: ["Exercise Equipment", "Sports Apparel", "Outdoor Gear", "Team Sports"],
  Toys: ["Action Figures", "Board Games", "Dolls", "Educational Toys"],
  Books: ["Fiction", "Non-fiction", "Children's Books", "Academic", "Comics"],
  Automotive: ["Parts", "Accessories", "Tools", "Car Care"],
};

const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialValues?.category || "Electronics");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [images, setImages] = useState<string[]>(initialValues?.images || []);
  const [coverImage, setCoverImage] = useState<string>(initialValues?.coverImage || "https://source.unsplash.com/featured/?product");

  // Initialize the form with default values or provided initial values
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialValues?.name || "",
      brand: initialValues?.brand || "",
      category: initialValues?.category || "Electronics",
      subcategory: initialValues?.subcategory || subcategoriesByCategory["Electronics"][0],
      price: initialValues?.price ? String(initialValues.price) : "",
      stock: initialValues?.stock ? String(initialValues.stock) : "",
      status: initialValues?.status || "Active",
      description: initialValues?.description || "",
    },
  });

  // Handle category change to update subcategory options
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    form.setValue("category", value);
    form.setValue("subcategory", subcategoriesByCategory[value][0]);
  };

  // Simulating image upload (in a real app, this would connect to a storage service)
  const handleImageUpload = () => {
    setUploadingImage(true);
    
    // Simulate API delay
    setTimeout(() => {
      // For demo purposes, add a random unsplash image
      const newImage = `https://source.unsplash.com/featured/?product&random=${Date.now()}`;
      setImages([...images, newImage]);
      
      if (!coverImage || coverImage === "https://source.unsplash.com/featured/?product") {
        setCoverImage(newImage);
      }
      
      setUploadingImage(false);
      toast({
        title: "Image uploaded",
        description: "Image has been successfully uploaded.",
      });
    }, 1500);
  };

  // Set image as cover
  const setAsCover = (image: string) => {
    setCoverImage(image);
    toast({
      title: "Cover Image Updated",
      description: "The cover image has been updated.",
    });
  };

  // Remove image
  const removeImage = (image: string) => {
    const newImages = images.filter(img => img !== image);
    setImages(newImages);
    
    if (coverImage === image) {
      setCoverImage(newImages.length > 0 ? newImages[0] : "https://source.unsplash.com/featured/?product");
    }
    
    toast({
      title: "Image removed",
      description: "Image has been removed from the product.",
    });
  };
  
  const handleSubmit = async (values: ProductFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Include images in the submission
      await onSubmit({
        ...values,
        price: values.price,
        stock: values.stock,
      });
      
      toast({
        title: "Success",
        description: `Product ${initialValues ? "updated" : "created"} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${initialValues ? "update" : "create"} product.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Product Images</h3>
          <p className="text-sm text-muted-foreground">
            Add images for your product. The first image will be the cover.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className={`aspect-square rounded-md overflow-hidden border ${coverImage === image ? 'ring-2 ring-primary' : ''}`}>
                <img 
                  src={image} 
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {coverImage !== image && (
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => setAsCover(image)}
                    className="text-xs"
                  >
                    Set as cover
                  </Button>
                )}
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => removeImage(image)} 
                  className="text-xs"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          
          <div className="aspect-square rounded-md border border-dashed flex flex-col items-center justify-center p-4 hover:bg-muted/50 cursor-pointer transition-colors" onClick={handleImageUpload}>
            {uploadingImage ? (
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            ) : (
              <>
                <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground text-center">Upload image</p>
              </>
            )}
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter product name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter brand name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    value={field.value} 
                    onValueChange={handleCategoryChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subcategoriesByCategory[selectedCategory]?.map(subcategory => (
                        <SelectItem key={subcategory} value={subcategory}>{subcategory}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.01" placeholder="0.00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="0" />
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
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Discontinued">Discontinued</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Enter product description..." 
                    className="min-h-[120px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Product
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
