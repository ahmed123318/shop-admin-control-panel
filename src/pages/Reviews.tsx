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
import { Star, Edit, Trash2, MessageSquare, Search } from "lucide-react";

// Define review form schema with proper conversion to number
const reviewFormSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  userName: z.string().min(2, "User name must be at least 2 characters"),
  rating: z.string().transform(val => parseInt(val, 10)),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
  status: z.enum(["Approved", "Pending", "Rejected"])
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

// Product type for selection
interface Product {
  id: number;
  name: string;
}

// Review type definition
interface Review {
  id: number;
  productId: number;
  productName: string;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  status: "Approved" | "Pending" | "Rejected";
  date: string;
}

const products: Product[] = [
  { id: 1, name: "Apple MacBook Pro" },
  { id: 2, name: "Samsung Galaxy S22" },
  { id: 3, name: "Levi's Jeans" },
  { id: 4, name: "Nike Air Max" },
  { id: 5, name: "Sony PlayStation 5" },
  { id: 6, name: "Amazon Echo Dot" }
];

const initialReviews: Review[] = [
  {
    id: 1,
    productId: 1,
    productName: "Apple MacBook Pro",
    userId: 2,
    userName: "Jane Smith",
    rating: 5,
    comment: "Excellent laptop, very fast and reliable.",
    status: "Approved",
    date: "2023-12-15"
  },
  {
    id: 2,
    productId: 3,
    productName: "Levi's Jeans",
    userId: 4,
    userName: "Emily Davis",
    rating: 4,
    comment: "Good quality, but a bit tight around the waist.",
    status: "Approved",
    date: "2023-12-10"
  },
  {
    id: 3,
    productId: 2,
    productName: "Samsung Galaxy S22",
    userId: 1,
    userName: "John Doe",
    rating: 5,
    comment: "Amazing camera and display quality!",
    status: "Approved",
    date: "2023-12-08"
  },
  {
    id: 4,
    productId: 4,
    productName: "Nike Air Max",
    userId: 5,
    userName: "Michael Wilson",
    rating: 3,
    comment: "Comfortable but not very durable.",
    status: "Approved",
    date: "2023-12-05"
  },
  {
    id: 5,
    productId: 6,
    productName: "Amazon Echo Dot",
    userId: 3,
    userName: "Robert Johnson",
    rating: 2,
    comment: "Not as responsive as I expected.",
    status: "Pending",
    date: "2023-12-03"
  },
  {
    id: 6,
    productId: 5,
    productName: "Sony PlayStation 5",
    userId: 6,
    userName: "Sarah Brown",
    rating: 5,
    comment: "Best gaming console I've ever owned!",
    status: "Approved",
    date: "2023-11-28"
  }
];

export default function Reviews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const { toast } = useToast();

  const filteredReviews = searchTerm 
    ? reviews.filter(review => 
        review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : reviews;

  // Form for updating reviews
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      productId: "",
      userName: "",
      rating: "5",
      comment: "",
      status: "Pending"
    },
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  // Handle review update
  const handleUpdateReview = (values: ReviewFormValues) => {
    if (!selectedReview) return;
    
    const product = products.find(p => p.id === parseInt(values.productId));
    
    if (!product) {
      toast({
        title: "Error",
        description: "Selected product not found.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedReviews = reviews.map(review => 
      review.id === selectedReview.id 
        ? { 
            ...review, 
            productId: product.id,
            productName: product.name,
            userName: values.userName,
            rating: parseInt(values.rating.toString(), 10),
            comment: values.comment,
            status: values.status 
          }
        : review
    );
    
    setReviews(updatedReviews);
    setIsUpdateDialogOpen(false);
    form.reset();
    
    toast({
      title: "Review updated",
      description: `Review for ${product.name} has been updated successfully.`,
    });
  };

  // Handle review deletion
  const handleDeleteReview = () => {
    if (!selectedReview) return;
    
    const updatedReviews = reviews.filter(review => review.id !== selectedReview.id);
    setReviews(updatedReviews);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Review deleted",
      description: `Review for ${selectedReview.productName} has been deleted successfully.`,
      variant: "destructive",
    });
  };

  // Open view dialog
  const openViewDialog = (review: Review) => {
    setSelectedReview(review);
    setIsViewDialogOpen(true);
  };

  // Open update dialog and populate form
  const openUpdateDialog = (review: Review) => {
    setSelectedReview(review);
    form.reset({
      productId: review.productId.toString(),
      userName: review.userName,
      rating: review.rating.toString(),
      comment: review.comment,
      status: review.status
    });
    setIsUpdateDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (review: Review) => {
    setSelectedReview(review);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
          <p className="text-muted-foreground">
            Manage product reviews from customers
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Product Reviews</CardTitle>
          <CardDescription>
            Showing {filteredReviews.length} reviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search reviews..." 
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
                  <TableHead>Product</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map(review => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">#{review.id}</TableCell>
                    <TableCell>{review.productName}</TableCell>
                    <TableCell>{review.userName}</TableCell>
                    <TableCell>{renderStars(review.rating)}</TableCell>
                    <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                    <TableCell>{review.date}</TableCell>
                    <TableCell>
                      <Badge variant={review.status === "Approved" ? "default" : review.status === "Rejected" ? "destructive" : "secondary"}>
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openViewDialog(review)}
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openUpdateDialog(review)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openDeleteDialog(review)}
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

      {/* View Review Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Product</h4>
                <p className="text-base font-medium">{selectedReview.productName}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">User</h4>
                <p className="text-base font-medium">{selectedReview.userName}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Rating</h4>
                <div className="mt-1">{renderStars(selectedReview.rating)}</div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                <p className="text-base font-medium">{selectedReview.date}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                <Badge variant={selectedReview.status === "Approved" ? "default" : selectedReview.status === "Rejected" ? "destructive" : "secondary"}>
                  {selectedReview.status}
                </Badge>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Comment</h4>
                <p className="bg-muted/50 p-3 rounded-md mt-1">{selectedReview.comment}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Review Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
            <DialogDescription>
              Update review details.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateReview)} className="space-y-4">
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border rounded-md"
                        {...field}
                      >
                        <option value="">Select a product</option>
                        {products.map(product => (
                          <option key={product.id} value={product.id.toString()}>
                            {product.name}
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
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border rounded-md"
                        {...field}
                      >
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <textarea
                        className="w-full p-2 border rounded-md min-h-[80px]"
                        {...field}
                      ></textarea>
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
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
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
                <Button type="submit">Update Review</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Review Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the review for{" "}
              <span className="font-semibold">{selectedReview?.productName}</span> and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteReview} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
