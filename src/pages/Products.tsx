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
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Search, Tag, Star, Eye, Image } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductForm, { ProductFormValues } from "@/components/products/ProductForm";

const products = [
  {
    id: 1,
    name: "Apple MacBook Pro",
    category: "Electronics",
    subcategory: "Laptops",
    brand: "Apple",
    price: 1999.99,
    stock: 15,
    reviewCount: 28,
    rating: 4.7,
    status: "Active",
    coverImage: "https://source.unsplash.com/featured/?macbook",
    images: [
      "https://source.unsplash.com/featured/?macbook",
      "https://source.unsplash.com/featured/?laptop",
      "https://source.unsplash.com/featured/?apple"
    ]
  },
  {
    id: 2,
    name: "Samsung Galaxy S22",
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "Samsung",
    price: 899.99,
    stock: 28,
    reviewCount: 42,
    rating: 4.5,
    status: "Active",
    coverImage: "https://source.unsplash.com/featured/?samsung",
    images: [
      "https://source.unsplash.com/featured/?samsung",
      "https://source.unsplash.com/featured/?smartphone",
      "https://source.unsplash.com/featured/?galaxy"
    ]
  },
  {
    id: 3,
    name: "Levi's Jeans",
    category: "Clothing",
    subcategory: "Jeans",
    brand: "Levi's",
    price: 59.99,
    stock: 45,
    reviewCount: 19,
    rating: 4.2,
    status: "Active",
    coverImage: "https://source.unsplash.com/featured/?jeans",
    images: [
      "https://source.unsplash.com/featured/?jeans",
      "https://source.unsplash.com/featured/?denim",
      "https://source.unsplash.com/featured/?levis"
    ]
  },
  {
    id: 4,
    name: "Nike Air Max",
    category: "Footwear",
    subcategory: "Sneakers",
    brand: "Nike",
    price: 129.99,
    stock: 32,
    reviewCount: 35,
    rating: 4.6,
    status: "Active",
    coverImage: "https://source.unsplash.com/featured/?nike",
    images: [
      "https://source.unsplash.com/featured/?nike",
      "https://source.unsplash.com/featured/?sneakers",
      "https://source.unsplash.com/featured/?shoes"
    ]
  },
  {
    id: 5,
    name: "Sony PlayStation 5",
    category: "Electronics",
    subcategory: "Gaming Consoles",
    brand: "Sony",
    price: 499.99,
    stock: 0,
    reviewCount: 52,
    rating: 4.8,
    status: "Out of Stock",
    coverImage: "https://source.unsplash.com/featured/?playstation",
    images: [
      "https://source.unsplash.com/featured/?playstation",
      "https://source.unsplash.com/featured/?console",
      "https://source.unsplash.com/featured/?gaming"
    ]
  },
  {
    id: 6,
    name: "Amazon Echo Dot",
    category: "Electronics",
    subcategory: "Smart Home",
    brand: "Amazon",
    price: 49.99,
    stock: 62,
    reviewCount: 78,
    rating: 4.3,
    status: "Active",
    coverImage: "https://source.unsplash.com/featured/?echo",
    images: [
      "https://source.unsplash.com/featured/?echo",
      "https://source.unsplash.com/featured/?alexa",
      "https://source.unsplash.com/featured/?smart-speaker"
    ]
  },
  {
    id: 7,
    name: "Organic Cotton T-shirt",
    category: "Clothing",
    subcategory: "T-shirts",
    brand: "Organic Basics",
    price: 24.99,
    stock: 120,
    reviewCount: 12,
    rating: 4.1,
    status: "Active",
    coverImage: "https://source.unsplash.com/featured/?tshirt",
    images: [
      "https://source.unsplash.com/featured/?tshirt",
      "https://source.unsplash.com/featured/?cotton",
      "https://source.unsplash.com/featured/?organic-clothing"
    ]
  },
  {
    id: 8,
    name: "Leather Sofa",
    category: "Home & Garden",
    subcategory: "Furniture",
    brand: "IKEA",
    price: 899.99,
    stock: 5,
    reviewCount: 8,
    rating: 4.0,
    status: "Active",
    coverImage: "https://source.unsplash.com/featured/?sofa",
    images: [
      "https://source.unsplash.com/featured/?sofa",
      "https://source.unsplash.com/featured/?leather-sofa",
      "https://source.unsplash.com/featured/?furniture"
    ]
  }
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddProductFormOpen, setIsAddProductFormOpen] = useState(false);
  const [isEditProductFormOpen, setIsEditProductFormOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const filteredProducts = searchTerm 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span>{rating.toFixed(1)}</span>
        <span className="text-xs text-muted-foreground">({products.find(p => p.rating === rating)?.reviewCount})</span>
      </div>
    );
  };

  const handleAddProduct = (productData: ProductFormValues) => {
    console.log('Adding new product:', productData);
    toast({
      title: "Product Added",
      description: `${productData.name} has been added to the catalog.`,
    });
    setIsAddProductFormOpen(false);
  };

  const handleEditProduct = (productData: ProductFormValues) => {
    console.log('Updating product:', selectedProduct?.id, productData);
    toast({
      title: "Product Updated",
      description: `${productData.name} has been updated.`,
    });
    setIsEditProductFormOpen(false);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditProductFormOpen(true);
  };

  const handleDelete = (product) => {
    toast({
      title: "Delete Product",
      description: `${product.name} would be deleted.`,
      variant: "destructive",
    });
  };

  const handleView = (product) => {
    setSelectedProduct(product);
  };

  const ProductImagesDialog = ({product}) => (
    <Dialog>
      <DialogTrigger asChild>
        <div className="h-10 w-10 rounded-md overflow-hidden cursor-pointer">
          <img 
            src={product.coverImage} 
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Product Images - {product.name}</DialogTitle>
          <DialogDescription>
            Browse through all product images
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index}>
                  <AspectRatio ratio={16/9}>
                    <img 
                      src={image} 
                      alt={`${product.name} - image ${index + 1}`}
                      className="rounded-lg object-cover w-full h-full" 
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4 gap-2">
              <CarouselPrevious className="relative static" />
              <CarouselNext className="relative static" />
            </div>
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );

  const ProductDetailsDrawer = ({ product }) => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="h-4 w-4" />
          <span className="sr-only">View Product</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{product.name}</DrawerTitle>
          <DrawerDescription>Product details</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="w-full max-h-64 overflow-hidden rounded-md">
                <img 
                  src={product.coverImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.images.slice(0, 3).map((image, i) => (
                  <div key={i} className="h-20 overflow-hidden rounded-md">
                    <img src={image} alt={`${product.name} ${i}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
                <p>#{product.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Brand</h3>
                <p>{product.brand}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                <p>{product.category} / {product.subcategory}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
                <p className="font-medium">${product.price.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Stock</h3>
                <p>{product.stock} units</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Rating</h3>
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <Badge variant={product.status === "Active" ? "default" : "secondary"}>
                  {product.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter className="flex flex-row justify-between">
          <Button variant="outline" onClick={() => handleEdit(product)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => handleDelete(product)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <DrawerClose asChild>
            <Button variant="secondary">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your product inventory
          </p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setIsAddProductFormOpen(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </Button>
      </div>

      <Dialog open={isAddProductFormOpen} onOpenChange={setIsAddProductFormOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new product to your inventory.
            </DialogDescription>
          </DialogHeader>
          <ProductForm 
            onSubmit={handleAddProduct} 
            onCancel={() => setIsAddProductFormOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditProductFormOpen} onOpenChange={setIsEditProductFormOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the details of {selectedProduct?.name}.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <ProductForm 
              initialValues={{
                ...selectedProduct,
                price: String(selectedProduct.price),
                stock: String(selectedProduct.stock),
              }} 
              onSubmit={handleEditProduct} 
              onCancel={() => setIsEditProductFormOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Products Inventory</CardTitle>
          <CardDescription>
            Showing {filteredProducts.length} products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="hidden md:table-cell">Subcategory</TableHead>
                  <TableHead className="hidden md:table-cell">Brand</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right hidden md:table-cell">Stock</TableHead>
                  <TableHead className="hidden md:table-cell">Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">#{product.id}</TableCell>
                    <TableCell>
                      <ProductImagesDialog product={product} />
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">{product.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                    <TableCell className="hidden md:table-cell">{product.subcategory}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        {product.brand}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right hidden md:table-cell">{product.stock}</TableCell>
                    <TableCell className="hidden md:table-cell">{renderStars(product.rating)}</TableCell>
                    <TableCell>
                      <Badge variant={product.status === "Active" ? "default" : "secondary"}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <ProductDetailsDrawer product={product} />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDelete(product)}
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
    </div>
  );
}
