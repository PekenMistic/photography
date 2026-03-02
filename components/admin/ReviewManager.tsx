"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star, Eye, EyeOff, Trash2, Plus, User, Calendar } from "lucide-react"

interface Review {
  id: string
  clientName: string
  email: string
  rating: number
  title: string
  content: string
  status: "pending" | "approved" | "rejected"
  featured: boolean
  createdAt: string
  eventType: string
}

export default function ReviewManager() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      clientName: "Sarah & John Smith",
      email: "sarah.smith@email.com",
      rating: 5,
      title: "Absolutely Amazing Wedding Photography!",
      content: "We couldn't be happier with our wedding photos! The photographer captured every special moment beautifully. The attention to detail and artistic vision exceeded our expectations. Highly recommended!",
      status: "approved",
      featured: true,
      createdAt: "2024-01-15",
      eventType: "Wedding"
    },
    {
      id: "2",
      clientName: "Emily Rodriguez",
      email: "emily.r@email.com",
      rating: 5,
      title: "Perfect Family Portraits",
      content: "The family portrait session was wonderful. The photographer was patient with our kids and captured beautiful natural moments. We love all the photos!",
      status: "approved",
      featured: false,
      createdAt: "2024-01-10",
      eventType: "Family Portrait"
    },
    {
      id: "3",
      clientName: "Michael Chen",
      email: "m.chen@techcorp.com",
      rating: 4,
      title: "Great Corporate Event Coverage",
      content: "Professional service for our company event. Good quality photos and timely delivery. Would recommend for corporate photography needs.",
      status: "pending",
      featured: false,
      createdAt: "2024-01-08",
      eventType: "Corporate Event"
    },
    {
      id: "4",
      clientName: "Lisa Johnson",
      email: "lisa.j@email.com",
      rating: 5,
      title: "Stunning Portrait Session",
      content: "The portrait session was incredible! The photographer made me feel comfortable and the results were beyond my expectations. Beautiful lighting and composition.",
      status: "approved",
      featured: true,
      createdAt: "2024-01-05",
      eventType: "Portrait"
    },
    {
      id: "5",
      clientName: "David Wilson",
      email: "david.w@email.com",
      rating: 3,
      title: "Good but could be better",
      content: "The photos were good overall, but I felt the editing could have been more polished. Service was professional though.",
      status: "rejected",
      featured: false,
      createdAt: "2024-01-03",
      eventType: "Event"
    }
  ])

  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newReview, setNewReview] = useState({
    clientName: "",
    email: "",
    rating: 5,
    title: "",
    content: "",
    eventType: ""
  })

  const updateReviewStatus = (id: string, newStatus: Review["status"]) => {
    setReviews(reviews.map(review =>
      review.id === id ? { ...review, status: newStatus } : review
    ))
  }

  const toggleFeatured = (id: string) => {
    setReviews(reviews.map(review =>
      review.id === id ? { ...review, featured: !review.featured } : review
    ))
  }

  const deleteReview = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter(review => review.id !== id))
    }
  }

  const addReview = () => {
    const review: Review = {
      id: Date.now().toString(),
      ...newReview,
      status: "approved",
      featured: false,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setReviews([review, ...reviews])
    setNewReview({
      clientName: "",
      email: "",
      rating: 5,
      title: "",
      content: "",
      eventType: ""
    })
    setIsAddDialogOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  const filteredReviews = filterStatus === "all" 
    ? reviews 
    : reviews.filter(review => review.status === filterStatus)

  const stats = {
    total: reviews.length,
    approved: reviews.filter(r => r.status === "approved").length,
    pending: reviews.filter(r => r.status === "pending").length,
    featured: reviews.filter(r => r.featured).length,
    averageRating: reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Review Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage client reviews and testimonials</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">All Reviews</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient">
                <Plus className="w-4 h-4 mr-2" />
                Add Review
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Review</DialogTitle>
                <DialogDescription>Add a testimonial manually</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={newReview.clientName}
                    onChange={(e) => setNewReview({...newReview, clientName: e.target.value})}
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newReview.email}
                    onChange={(e) => setNewReview({...newReview, email: e.target.value})}
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <Label htmlFor="eventType">Event Type</Label>
                  <Input
                    id="eventType"
                    value={newReview.eventType}
                    onChange={(e) => setNewReview({...newReview, eventType: e.target.value})}
                    placeholder="e.g., Wedding, Portrait, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <select
                    id="rating"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newReview.title}
                    onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                    placeholder="Review title"
                  />
                </div>
                <div>
                  <Label htmlFor="content">Review Content</Label>
                  <Textarea
                    id="content"
                    value={newReview.content}
                    onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                    placeholder="Review content"
                    rows={4}
                  />
                </div>
                <Button onClick={addReview} className="w-full">
                  Add Review
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Reviews</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <User className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Featured</p>
                <p className="text-2xl font-bold text-purple-600">{stats.featured}</p>
              </div>
              <Star className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
                <p className="text-2xl font-bold text-orange-600">{stats.averageRating}</p>
              </div>
              <Star className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{review.clientName}</h3>
                    <Badge className={getStatusColor(review.status)}>
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                    </Badge>
                    {review.featured && (
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                      <span className="ml-1 font-medium">{review.rating}/5</span>
                    </div>
                    <span className="text-gray-500">{review.eventType}</span>
                    <span className="text-gray-500">{review.createdAt}</span>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">{review.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{review.content}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedReview(review)}
                  >
                    View
                  </Button>
                  
                  {review.status === "pending" && (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => updateReviewStatus(review.id, "approved")}
                        className="text-xs"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateReviewStatus(review.id, "rejected")}
                        className="text-xs text-red-600"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleFeatured(review.id)}
                    className={review.featured ? "bg-purple-100 dark:bg-purple-900" : ""}
                  >
                    {review.featured ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteReview(review.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Review Details Dialog */}
      <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
            <DialogDescription>Complete review information</DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Client Name</Label>
                  <p className="font-medium">{selectedReview.clientName}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="font-medium">{selectedReview.email}</p>
                </div>
                <div>
                  <Label>Event Type</Label>
                  <p className="font-medium">{selectedReview.eventType}</p>
                </div>
                <div>
                  <Label>Date</Label>
                  <p className="font-medium">{selectedReview.createdAt}</p>
                </div>
              </div>
              
              <div>
                <Label>Rating</Label>
                <div className="flex items-center gap-2">
                  {renderStars(selectedReview.rating)}
                  <span className="font-medium">{selectedReview.rating}/5</span>
                </div>
              </div>
              
              <div>
                <Label>Title</Label>
                <p className="font-medium">{selectedReview.title}</p>
              </div>
              
              <div>
                <Label>Review Content</Label>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedReview.content}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Label>Status</Label>
                <Badge className={getStatusColor(selectedReview.status)}>
                  {selectedReview.status.charAt(0).toUpperCase() + selectedReview.status.slice(1)}
                </Badge>
                {selectedReview.featured && (
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

