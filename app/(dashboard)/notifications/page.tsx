"use client"

import { useState } from "react"
import {
  Bell,
  Calendar,
  CreditCard,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  X,
  Filter,
  CheckCheck,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Notification {
  id: number
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  time: string
  read: boolean
  category: "system" | "booking" | "payment" | "message"
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const notifications: Notification[] = [
    {
      id: 1,
      title: "New Booking",
      message: "John Smith has made a new booking for Deluxe King Room from Aug 10-12, 2023.",
      type: "info",
      time: "5 minutes ago",
      read: false,
      category: "booking",
    },
    {
      id: 2,
      title: "Payment Received",
      message: "Payment of $350 received from Sarah Johnson for booking #BK12346.",
      type: "success",
      time: "1 hour ago",
      read: false,
      category: "payment",
    },
    {
      id: 3,
      title: "System Maintenance",
      message: "System maintenance scheduled for tonight at 2:00 AM. Service may be temporarily unavailable.",
      type: "warning",
      time: "3 hours ago",
      read: true,
      category: "system",
    },
    {
      id: 4,
      title: "New Message",
      message: "You have a new message from Michael Chen regarding his upcoming stay.",
      type: "info",
      time: "5 hours ago",
      read: false,
      category: "message",
    },
    {
      id: 5,
      title: "Booking Cancelled",
      message: "Emma Wilson has cancelled her booking #BK12349 for Aug 15-18, 2023.",
      type: "error",
      time: "Yesterday",
      read: true,
      category: "booking",
    },
    {
      id: 6,
      title: "Room Maintenance Complete",
      message: "Maintenance for Room 512 has been completed and the room is now available.",
      type: "success",
      time: "Yesterday",
      read: true,
      category: "system",
    },
    {
      id: 7,
      title: "Payment Failed",
      message: "Payment attempt for booking #BK12350 has failed. Please contact the guest.",
      type: "error",
      time: "2 days ago",
      read: true,
      category: "payment",
    },
    {
      id: 8,
      title: "New Review",
      message: "John Smith has left a 5-star review for his recent stay.",
      type: "success",
      time: "2 days ago",
      read: true,
      category: "system",
    },
  ]

  const getNotificationIcon = (type: Notification["type"], category: Notification["category"]) => {
    if (category === "booking") return <Calendar className="h-5 w-5" />
    if (category === "payment") return <CreditCard className="h-5 w-5" />
    if (category === "message") return <MessageSquare className="h-5 w-5" />
    if (category === "system") {
      if (type === "success") return <CheckCircle className="h-5 w-5" />
      if (type === "warning") return <AlertCircle className="h-5 w-5" />
      if (type === "error") return <AlertCircle className="h-5 w-5" />
      return <Info className="h-5 w-5" />
    }
    return <Bell className="h-5 w-5" />
  }

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-600"
      case "success":
        return "bg-green-100 text-green-600"
      case "warning":
        return "bg-amber-100 text-amber-600"
      case "error":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const filteredNotifications = notifications
    .filter((notification) => {
      if (activeTab === "all") return true
      if (activeTab === "unread") return !notification.read
      if (activeTab === "booking") return notification.category === "booking"
      if (activeTab === "payment") return notification.category === "payment"
      if (activeTab === "system") return notification.category === "system"
      if (activeTab === "message") return notification.category === "message"
      return true
    })
    .filter((notification) => {
      if (!searchTerm) return true
      return (
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })

  const markAsRead = (id: number) => {
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    })
  }

  const markAllAsRead = () => {
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    })
  }

  const deleteNotification = (id: number) => {
    toast({
      title: "Notification deleted",
      description: "The notification has been deleted.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <Button variant="outline" className="flex items-center gap-1" onClick={markAllAsRead}>
          <CheckCheck className="h-4 w-4" />
          Mark All as Read
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search notifications"
            className="w-full md:w-[400px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-6">
          <TabsTrigger value="all">
            All
            <Badge variant="secondary" className="ml-2">
              {notifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            <Badge variant="secondary" className="ml-2">
              {notifications.filter((n) => !n.read).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="booking">Bookings</TabsTrigger>
          <TabsTrigger value="payment">Payments</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="message">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card key={notification.id} className={notification.read ? "opacity-75" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                        {getNotificationIcon(notification.type, notification.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{notification.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {notification.time}
                            </div>
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {!notification.read && (
                          <Badge variant="secondary" className="mt-2">
                            Unread
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No notifications found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm
                  ? "No notifications match your search criteria"
                  : "You're all caught up! There are no notifications in this category."}
              </p>
              {searchTerm && (
                <Button variant="outline" onClick={() => setSearchTerm("")}>
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
