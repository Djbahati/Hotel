"use client"

import { useState } from "react"
import { Star, Filter, CheckCircle, XCircle, MessageSquare, User, Calendar, BarChart4 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

// Mock data for reviews
const reviews = [
  {
    id: 1,
    name: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    room: "101",
    date: "May 10, 2025",
    rating: 5,
    comment:
      "Excellent service and beautiful rooms. The staff was very attentive and the food at the restaurant was delicious. Will definitely come back!",
    status: "approved",
    isPublic: true,
    categories: {
      room: 5,
      service: 5,
      food: 4,
      cleanliness: 5,
      value: 4,
    },
  },
  {
    id: 2,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    room: "205",
    date: "May 8, 2025",
    rating: 4,
    comment:
      "Very comfortable stay. The room was clean and spacious. The only issue was that the Wi-Fi was a bit slow at times.",
    status: "approved",
    isPublic: true,
    categories: {
      room: 4,
      service: 4,
      food: 4,
      cleanliness: 5,
      value: 4,
    },
  },
  {
    id: 3,
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    room: "310",
    date: "May 7, 2025",
    rating: 2,
    comment:
      "Disappointing experience. The room was not properly cleaned and the AC wasn't working well. The staff tried to help but couldn't resolve the issues.",
    status: "pending",
    isPublic: false,
    categories: {
      room: 2,
      service: 3,
      food: 3,
      cleanliness: 1,
      value: 2,
    },
  },
  {
    id: 4,
    name: "Sophia Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    room: "422",
    date: "May 5, 2025",
    rating: 5,
    comment:
      "Amazing experience from check-in to check-out. The staff went above and beyond to make our stay special. The room was immaculate and the view was breathtaking.",
    status: "approved",
    isPublic: true,
    categories: {
      room: 5,
      service: 5,
      food: 5,
      cleanliness: 5,
      value: 5,
    },
  },
  {
    id: 5,
    name: "Robert Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    room: "118",
    date: "May 3, 2025",
    rating: 3,
    comment:
      "Average stay. The room was okay but nothing special. Breakfast was good but the dinner options were limited. Staff was friendly though.",
    status: "rejected",
    isPublic: false,
    categories: {
      room: 3,
      service: 4,
      food: 2,
      cleanliness: 3,
      value: 3,
    },
  },
]

// Calculate average ratings
const calculateAverages = () => {
  const approvedReviews = reviews.filter((r) => r.status === "approved")
  const totalReviews = approvedReviews.length

  if (totalReviews === 0) return { overall: 0, room: 0, service: 0, food: 0, cleanliness: 0, value: 0 }

  const sum = approvedReviews.reduce(
    (acc, review) => {
      acc.overall += review.rating
      acc.room += review.categories.room
      acc.service += review.categories.service
      acc.food += review.categories.food
      acc.cleanliness += review.categories.cleanliness
      acc.value += review.categories.value
      return acc
    },
    { overall: 0, room: 0, service: 0, food: 0, cleanliness: 0, value: 0 },
  )

  return {
    overall: (sum.overall / totalReviews).toFixed(1),
    room: (sum.room / totalReviews).toFixed(1),
    service: (sum.service / totalReviews).toFixed(1),
    food: (sum.food / totalReviews).toFixed(1),
    cleanliness: (sum.cleanliness / totalReviews).toFixed(1),
    value: (sum.value / totalReviews).toFixed(1),
  }
}

// Calculate rating distribution
const calculateDistribution = () => {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  const approvedReviews = reviews.filter((r) => r.status === "approved")

  approvedReviews.forEach((review) => {
    distribution[review.rating as keyof typeof distribution]++
  })

  const total = approvedReviews.length
  return {
    counts: distribution,
    percentages: {
      5: total ? Math.round((distribution[5] / total) * 100) : 0,
      4: total ? Math.round((distribution[4] / total) * 100) : 0,
      3: total ? Math.round((distribution[3] / total) * 100) : 0,
      2: total ? Math.round((distribution[2] / total) * 100) : 0,
      1: total ? Math.round((distribution[1] / total) * 100) : 0,
    },
  }
}

const averages = calculateAverages()
const distribution = calculateDistribution()

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterRating, setFilterRating] = useState("all")

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter((review) => {
      // Filter by tab
      if (activeTab === "pending" && review.status !== "pending") return false
      if (activeTab === "approved" && review.status !== "approved") return false
      if (activeTab === "rejected" && review.status !== "rejected") return false

      // Filter by search term
      if (
        searchTerm &&
        !review.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !review.comment.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !review.room.includes(searchTerm)
      ) {
        return false
      }

      // Filter by rating
      if (filterRating !== "all" && review.rating !== Number.parseInt(filterRating)) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort by selected option
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortBy === "highest") {
        return b.rating - a.rating
      } else if (sortBy === "lowest") {
        return a.rating - b.rating
      }
      return 0
    })

  // Render stars for ratings
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      ))
  }

  // Handle review status change
  const handleStatusChange = (id: number, status: string) => {
    console.log(`Changing review ${id} status to ${status}`)
    // In a real app, you would update the review status in your database
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Customer Reviews</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <BarChart4 className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Response Templates
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ratings Overview */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Ratings Overview</CardTitle>
            <CardDescription>Summary of customer feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="text-5xl font-bold">{averages.overall}</div>
                <div className="flex justify-center mt-2">
                  {renderStars(Math.round(Number.parseFloat(averages.overall)))}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Based on {reviews.filter((r) => r.status === "approved").length} reviews
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(distribution.percentages)
                .reverse()
                .map(([rating, percentage]) => (
                  <div key={rating} className="flex items-center">
                    <div className="flex items-center w-12">
                      {rating} <Star className="h-3 w-3 ml-1 text-yellow-400 fill-yellow-400" />
                    </div>
                    <Progress value={percentage} className="h-2 flex-1 mx-2" />
                    <div className="w-10 text-right text-sm">{percentage}%</div>
                  </div>
                ))}
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="font-medium">Category Ratings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Room</span>
                    <span className="font-medium">{averages.room}</span>
                  </div>
                  <Progress value={Number.parseFloat(averages.room) * 20} className="h-1 mt-1" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Service</span>
                    <span className="font-medium">{averages.service}</span>
                  </div>
                  <Progress value={Number.parseFloat(averages.service) * 20} className="h-1 mt-1" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Food</span>
                    <span className="font-medium">{averages.food}</span>
                  </div>
                  <Progress value={Number.parseFloat(averages.food) * 20} className="h-1 mt-1" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Cleanliness</span>
                    <span className="font-medium">{averages.cleanliness}</span>
                  </div>
                  <Progress value={Number.parseFloat(averages.cleanliness) * 20} className="h-1 mt-1" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Value</span>
                    <span className="font-medium">{averages.value}</span>
                  </div>
                  <Progress value={Number.parseFloat(averages.value) * 20} className="h-1 mt-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>Manage and respond to guest feedback</CardDescription>
              </div>
              <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <div className="relative flex-1">
                <Input
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger className="w-[130px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="highest">Highest Rated</SelectItem>
                    <SelectItem value="lowest">Lowest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-20rem)]">
              {filteredReviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg">No reviews found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                filteredReviews.map((review) => (
                  <div key={review.id} className="border-b p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                          <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.name}</div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <User className="h-3 w-3 mr-1" />
                            Room {review.room}
                            <span className="mx-2">•</span>
                            <Calendar className="h-3 w-3 mr-1" />
                            {review.date}
                          </div>
                          <div className="flex mt-1">{renderStars(review.rating)}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {review.status === "pending" && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            Pending
                          </Badge>
                        )}
                        {review.status === "approved" && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Approved
                          </Badge>
                        )}
                        {review.status === "rejected" && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Rejected
                          </Badge>
                        )}
                        {review.isPublic && (
                          <Badge variant="outline" className="ml-2">
                            Public
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 text-sm">{review.comment}</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {review.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
                            onClick={() => handleStatusChange(review.id, "approved")}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800"
                            onClick={() => handleStatusChange(review.id, "rejected")}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                      {review.status === "approved" && (
                        <Button size="sm" variant="outline">
                          {review.isPublic ? (
                            <>
                              <XCircle className="h-4 w-4 mr-2" />
                              Make Private
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Make Public
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredReviews.length} of {reviews.length} reviews
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
