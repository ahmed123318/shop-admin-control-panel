
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
import { Star, Edit, Trash2, MessageSquare, Search } from "lucide-react";

const reviews = [
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

  const filteredReviews = searchTerm 
    ? reviews.filter(review => 
        review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : reviews;

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
                      <Badge variant={review.status === "Approved" ? "default" : "secondary"}>
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="icon">
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
