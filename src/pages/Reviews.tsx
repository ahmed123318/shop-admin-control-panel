
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
import { Textarea } from "@/components/ui/textarea";
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
import { Star } from "lucide-react";

type ReviewStatus = "published" | "pending" | "spam";

interface Review {
  id: number;
  productId: number;
  productName: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  status: ReviewStatus;
}

interface Product {
  id: number;
  name: string;
}

interface ReviewFormValues {
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      productId: 101,
      productName: "Wireless Headphones",
      userName: "John Doe",
      rating: 5,
      comment: "These headphones are amazing! Great sound quality and very comfortable to wear for long periods.",
      date: "2023-04-15",
      status: "published"
    },
    {
      id: 2,
      productId: 102,
      productName: "Smartphone Case",
      userName: "Jane Smith",
      rating: 2,
      comment: "The case didn't fit my phone properly. I'm disappointed with the quality.",
      date: "2023-05-20",
      status: "published"
    },
    {
      id: 3,
      productId: 103,
      productName: "Bluetooth Speaker",
      userName: "Mike Johnson",
      rating: 4,
      comment: "Good speaker with strong bass. Battery life could be better though.",
      date: "2023-06-10",
      status: "pending"
    }
  ]);
  
  const [products, setProducts] = useState<Product[]>([
    { id: 101, name: "Wireless Headphones" },
    { id: 102, name: "Smartphone Case" },
    { id: 103, name: "Bluetooth Speaker" },
    { id: 104, name: "Smart Watch" },
    { id: 105, name: "Laptop Bag" }
  ]);
  
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [isEditReviewOpen, setIsEditReviewOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [formValues, setFormValues] = useState<ReviewFormValues>({
    productId: "",
    userName: "",
    rating: 5,
    comment: "",
    status: "pending"
  });
  
  const { toast } = useToast();
  
  const handleOpenAddReview = () => {
    setFormValues({
      productId: "",
      userName: "",
      rating: 5,
      comment: "",
      status: "pending"
    });
    setIsAddReviewOpen(true);
  };
  
  const handleOpenEditReview = (review: Review) => {
    setSelectedReview(review);
    setFormValues({
      productId: review.productId.toString(),
      userName: review.userName,
      rating: review.rating,
      comment: review.comment,
      status: review.status
    });
    setIsEditReviewOpen(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "rating") {
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
  
  const handleAddReview = () => {
    const product = products.find(p => p.id === Number(formValues.productId));
    
    if (!product) {
      toast({
        title: "Error",
        description: "Please select a valid product.",
        variant: "destructive"
      });
      return;
    }
    
    const newReview: Review = {
      id: reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1,
      productId: product.id,
      productName: product.name,
      userName: formValues.userName,
      rating: Number(formValues.rating),
      comment: formValues.comment,
      date: new Date().toISOString().split('T')[0],
      status: formValues.status
    };
    
    setReviews([...reviews, newReview]);
    setIsAddReviewOpen(false);
    
    toast({
      title: "Review Added",
      description: `Review for ${product.name} has been added successfully.`,
    });
  };
  
  const handleUpdateReview = () => {
    if (!selectedReview) return;
    
    const product = products.find(p => p.id === Number(formValues.productId));
    
    if (!product) {
      toast({
        title: "Error",
        description: "Please select a valid product.",
        variant: "destructive"
      });
      return;
    }
    
    setReviews(reviews.map(review => 
      review.id === selectedReview.id 
        ? { 
            ...review, 
            productId: product.id,
            productName: product.name,
            userName: formValues.userName,
            rating: Number(formValues.rating),
            comment: formValues.comment,
            status: formValues.status 
          }
        : review
    ));
    
    setIsEditReviewOpen(false);
    
    toast({
      title: "Review Updated",
      description: `Review for ${product.name} has been updated successfully.`,
    });
  };
  
  const handleDeleteReview = (id: number) => {
    setReviews(reviews.filter(review => review.id !== id));
    
    toast({
      title: "Review Deleted",
      description: "The review has been deleted successfully.",
    });
  };
  
  const getStatusBadgeColor = (status: ReviewStatus) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "spam":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "";
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index}
        className={`h-4 w-4 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
          <p className="text-muted-foreground">
            Manage customer product reviews and feedback
          </p>
        </div>
        <Button onClick={handleOpenAddReview}>Add New Review</Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map(review => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">{review.productName}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                </TableCell>
                <TableCell>{review.userName}</TableCell>
                <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                <TableCell>{review.date}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(review.status)} variant="outline">
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleOpenEditReview(review)}
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
                          <AlertDialogTitle>Delete Review</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this review? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteReview(review.id)}
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
      
      {/* Add Review Dialog */}
      <Dialog open={isAddReviewOpen} onOpenChange={setIsAddReviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Review</DialogTitle>
            <DialogDescription>
              Add a new customer review for a product
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Product</Label>
              <Select 
                value={formValues.productId} 
                onValueChange={(value) => handleSelectChange('productId', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Products</SelectLabel>
                    {products.map(product => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userName" className="text-right">
                Customer Name
              </Label>
              <Input
                id="userName"
                name="userName"
                className="col-span-3"
                value={formValues.userName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">
                Rating (1-5)
              </Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                className="col-span-3"
                value={formValues.rating}
                onChange={handleInputChange}
                min={1}
                max={5}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="comment" className="text-right">
                Comment
              </Label>
              <Textarea
                id="comment"
                name="comment"
                className="col-span-3"
                value={formValues.comment}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <Select 
                value={formValues.status} 
                onValueChange={(value: ReviewStatus) => handleSelectChange('status', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddReviewOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddReview}>
              Add Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Review Dialog */}
      <Dialog open={isEditReviewOpen} onOpenChange={setIsEditReviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
            <DialogDescription>
              Update the details of this review
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Product</Label>
              <Select 
                value={formValues.productId} 
                onValueChange={(value) => handleSelectChange('productId', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Products</SelectLabel>
                    {products.map(product => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-userName" className="text-right">
                Customer Name
              </Label>
              <Input
                id="edit-userName"
                name="userName"
                className="col-span-3"
                value={formValues.userName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-rating" className="text-right">
                Rating (1-5)
              </Label>
              <Input
                id="edit-rating"
                name="rating"
                type="number"
                className="col-span-3"
                value={formValues.rating}
                onChange={handleInputChange}
                min={1}
                max={5}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-comment" className="text-right">
                Comment
              </Label>
              <Textarea
                id="edit-comment"
                name="comment"
                className="col-span-3"
                value={formValues.comment}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <Select 
                value={formValues.status} 
                onValueChange={(value: ReviewStatus) => handleSelectChange('status', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditReviewOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateReview}>
              Update Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
