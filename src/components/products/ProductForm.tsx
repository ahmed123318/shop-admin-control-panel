
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Package, 
  Save, 
  Image as ImageIcon, 
  X, 
  Loader2,
  Weight,
  Dimensions
} from "lucide-react";
import { productSchema, ProductFormValues } from "@/schemas/productSchema";
import { ProductStatus, ProductColor } from "@/types/product";
import { useImageUpload } from "@/utils/imageUpload";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormDescription,
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
import ColorPicker from "./ColorPicker";

// Simulated data for dropdowns
const categories = [
  { id: "cat1", name: "Electronics" },
  { id: "cat2", name: "Clothing" },
  { id: "cat3", name: "Home & Garden" },
  { id: "cat4", name: "Sports & Outdoors" },
];

const subcategoriesByCategory = {
  cat1: [
    { id: "sub1", name: "Laptops" },
    { id: "sub2", name: "Smartphones" },
    { id: "sub3", name: "Accessories" },
  ],
  cat2: [
    { id: "sub4", name: "Men's Clothing" },
    { id: "sub5", name: "Women's Clothing" },
    { id: "sub6", name: "Children's Clothing" },
  ],
  cat3: [
    { id: "sub7", name: "Furniture" },
    { id: "sub8", name: "Kitchen" },
    { id: "sub9", name: "Decor" },
  ],
  cat4: [
    { id: "sub10", name: "Fitness" },
    { id: "sub11", name: "Camping" },
    { id: "sub12", name: "Team Sports" },
  ],
};

const brands = [
  { id: "brand1", name: "Apple" },
  { id: "brand2", name: "Samsung" },
  { id: "brand3", name: "Nike" },
  { id: "brand4", name: "Adidas" },
  { id: "brand5", name: "Sony" },
  { id: "brand6", name: "IKEA" },
];

interface ProductFormProps {
  initialValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const { toast } = useToast();
  const { uploadImage, uploadMultipleImages } = useImageUpload();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    initialValues?.categoryId
  );
  const [subcategories, setSubcategories] = useState<typeof subcategoriesByCategory['cat1']>([]);

  // Initialize the form with default values
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      quantity: initialValues?.quantity || 0,
      price: initialValues?.price || 0,
      coverImage: initialValues?.coverImage || "",
      images: initialValues?.images || [],
      colors: initialValues?.colors || [],
      weight: initialValues?.weight || undefined,
      weightUnit: initialValues?.weightUnit || "g",
      dimensions: initialValues?.dimensions || { length: 0, width: 0, height: 0 },
      warranty: initialValues?.warranty || "",
      status: initialValues?.status || ProductStatus.ACTIVE,
      categoryId: initialValues?.categoryId || "",
      subcategoryId: initialValues?.subcategoryId || "",
      brandId: initialValues?.brandId || "",
    },
  });

  // Update subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      setSubcategories(subcategoriesByCategory[selectedCategory as keyof typeof subcategoriesByCategory] || []);
      
      // Reset subcategory if the current selection doesn't belong to the new category
      form.setValue("subcategoryId", "");
    }
  }, [selectedCategory, form]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    form.setValue("categoryId", value);
  };

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const imageUrl = await uploadImage(e.target.files[0]);
        form.setValue("coverImage", imageUrl);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  const handleProductImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        const files = Array.from(e.target.files);
        const imageUrls = await uploadMultipleImages(files);
        const currentImages = form.getValues("images") || [];
        
        form.setValue("images", [...currentImages, ...imageUrls]);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  const removeImage = (index: number) => {
    const currentImages = [...form.getValues("images")];
    currentImages.splice(index, 1);
    form.setValue("images", currentImages);
  };

  const handleFormSubmit = async (values: ProductFormValues) => {
    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
      toast({
        title: "Success",
        description: "Product has been saved successfully.",
      });
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-8"
      >
        {/* Basic Information Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Basic Information</h3>
            <p className="text-sm text-muted-foreground">
              Provide the essential details about your product.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Between 3 and 255 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        className="pl-7" 
                        {...field}
                        min={0}
                        step={0.01}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Product price in USD</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      {...field}
                      min={0}
                    />
                  </FormControl>
                  <FormDescription>Available inventory quantity</FormDescription>
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
                      <SelectItem value={ProductStatus.ACTIVE}>Active</SelectItem>
                      <SelectItem value={ProductStatus.OUT_OF_STOCK}>Out of Stock</SelectItem>
                      <SelectItem value={ProductStatus.DISCONTINUED}>Discontinued</SelectItem>
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
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your product in detail..." 
                    className="min-h-[120px]" 
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Minimum 10 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Images Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Product Images</h3>
            <p className="text-sm text-muted-foreground">
              Upload high-quality images of your product.
            </p>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image *</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      {field.value ? (
                        <div className="relative aspect-square w-full max-w-[280px] rounded-md overflow-hidden border">
                          <img 
                            src={field.value} 
                            alt="Cover" 
                            className="object-cover w-full h-full" 
                          />
                          <Button
                            type="button" 
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8"
                            onClick={() => form.setValue("coverImage", "")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center border border-dashed rounded-md h-[280px] w-full max-w-[280px]">
                          <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full hover:bg-muted/50 transition-colors">
                            <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                            <span className="text-sm text-muted-foreground">Upload cover image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleCoverImageUpload}
                            />
                          </label>
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground">
                        This will be the main image displayed for your product
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Images *</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {field.value.map((image, index) => (
                          <div 
                            key={index} 
                            className="relative aspect-square rounded-md overflow-hidden border"
                          >
                            <img 
                              src={image} 
                              alt={`Product ${index}`} 
                              className="object-cover w-full h-full" 
                            />
                            <Button
                              type="button" 
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-7 w-7"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        
                        <div className="aspect-square rounded-md border border-dashed flex flex-col items-center justify-center p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                          <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                            <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                            <span className="text-sm text-muted-foreground text-center">Add images</span>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={handleProductImagesUpload}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Upload multiple images to showcase different angles of your product
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Classification Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Classification</h3>
            <p className="text-sm text-muted-foreground">
              Categorize your product for better searchability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
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
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subcategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory</FormLabel>
                  <Select 
                    value={field.value} 
                    onValueChange={field.onChange}
                    disabled={!selectedCategory || subcategories.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subcategories.map((subcategory) => (
                        <SelectItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {!selectedCategory ? "Select a category first" : ""}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select 
                    value={field.value} 
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Colors Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Colors</h3>
            <p className="text-sm text-muted-foreground">
              Specify available color options for your product.
            </p>
          </div>
          
          <FormField
            control={form.control}
            name="colors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colors</FormLabel>
                <FormControl>
                  <ColorPicker 
                    colors={field.value || []}
                    onChange={field.onChange}
                    error={form.formState.errors.colors?.message as string}
                  />
                </FormControl>
                <FormDescription>
                  Add all available color options
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Physical Attributes Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Physical Attributes</h3>
            <p className="text-sm text-muted-foreground">
              Provide details about the physical characteristics of your product.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-end gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="flex items-center gap-1">
                      <Weight className="h-4 w-4" />
                      Weight
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="0"
                        min={0}
                        step={0.01}
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          const value = e.target.value ? parseFloat(e.target.value) : undefined;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="weightUnit"
                render={({ field }) => (
                  <FormItem className="w-24">
                    <FormLabel>Unit</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="g">Grams (g)</SelectItem>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="warranty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warranty</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 1 year" {...field} />
                  </FormControl>
                  <FormDescription>
                    Format: "1 year", "6 months", etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormLabel className="flex items-center gap-1 mb-2">
              <Dimensions className="h-4 w-4" />
              Dimensions (cm)
            </FormLabel>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="dimensions.length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Length</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="0"
                        min={0}
                        step={0.1}
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          const value = e.target.value ? parseFloat(e.target.value) : 0;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dimensions.width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Width</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="0"
                        min={0}
                        step={0.1}
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          const value = e.target.value ? parseFloat(e.target.value) : 0;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dimensions.height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Height</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="0"
                        min={0}
                        step={0.1}
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          const value = e.target.value ? parseFloat(e.target.value) : 0;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              All measurements in centimeters (cm)
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
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
  );
};

export default ProductForm;
