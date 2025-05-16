"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Search,
  Filter,
  Plus,
  ShoppingCart,
  Utensils,
  Clock,
  MapPin,
  CheckCircle,
  ChevronRight,
  Truck,
  X,
  MoreHorizontal,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

interface FoodItem {
  id: number
  name: string
  category: string
  price: string
  description: string
  image: string
}

interface Order {
  id: string
  guest: string
  room: string
  items: string[]
  total: string
  status: "Preparing" | "On the way" | "Delivered"
  time: string
  estimatedDelivery?: string
  deliveryPerson?: string
}

export default function FoodDeliveryPage() {
  const [activeTab, setActiveTab] = useState("menu")
  const [cartItems, setCartItems] = useState<FoodItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { toast } = useToast()

  const foodItems: FoodItem[] = [
    {
      id: 1,
      name: "Grilled Salmon",
      category: "Main Course",
      price: "$24",
      description: "Fresh salmon fillet grilled to perfection, served with seasonal vegetables and lemon butter sauce.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Caesar Salad",
      category: "Starters",
      price: "$12",
      description: "Crisp romaine lettuce, croutons, parmesan cheese, and our signature Caesar dressing.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Chocolate Lava Cake",
      category: "Dessert",
      price: "$10",
      description: "Warm chocolate cake with a molten center, served with vanilla ice cream.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Margherita Pizza",
      category: "Main Course",
      price: "$18",
      description: "Classic pizza with tomato sauce, fresh mozzarella, and basil on a thin crust.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      name: "Fresh Fruit Juice",
      category: "Drinks",
      price: "$8",
      description: "Freshly squeezed seasonal fruits, choice of orange, apple, or mixed berries.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      name: "Club Sandwich",
      category: "Main Course",
      price: "$16",
      description: "Triple-decker sandwich with chicken, bacon, lettuce, tomato, and mayo, served with fries.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 7,
      name: "Tiramisu",
      category: "Dessert",
      price: "$9",
      description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 8,
      name: "Iced Coffee",
      category: "Drinks",
      price: "$6",
      description: "Cold brewed coffee served over ice with your choice of milk and sweetener.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const activeOrders: Order[] = [
    {
      id: "FO-1234",
      guest: "John Smith",
      room: "301",
      items: ["Grilled Salmon", "Caesar Salad", "Iced Coffee"],
      total: "$42",
      status: "Preparing",
      time: "12:30 PM",
      estimatedDelivery: "12:50 PM",
      deliveryPerson: "Michael",
    },
    {
      id: "FO-1235",
      guest: "Sarah Johnson",
      room: "205",
      items: ["Margherita Pizza", "Fresh Fruit Juice"],
      total: "$26",
      status: "On the way",
      time: "1:15 PM",
      estimatedDelivery: "1:25 PM",
      deliveryPerson: "David",
    },
    {
      id: "FO-1236",
      guest: "Michael Chen",
      room: "410",
      items: ["Club Sandwich", "Chocolate Lava Cake", "Iced Coffee"],
      total: "$35",
      status: "Delivered",
      time: "11:45 AM",
      deliveryPerson: "Lisa",
    },
  ]

  const orderHistory: Order[] = [
    {
      id: "FO-1230",
      guest: "Emma Wilson",
      room: "512",
      items: ["Caesar Salad", "Tiramisu", "Fresh Fruit Juice"],
      total: "$31",
      status: "Delivered",
      time: "Yesterday, 7:30 PM",
    },
    {
      id: "FO-1229",
      guest: "David Brown",
      room: "302",
      items: ["Grilled Salmon", "Chocolate Lava Cake"],
      total: "$34",
      status: "Delivered",
      time: "Yesterday, 6:15 PM",
    },
    {
      id: "FO-1228",
      guest: "Lisa Garcia",
      room: "207",
      items: ["Club Sandwich", "Iced Coffee"],
      total: "$22",
      status: "Delivered",
      time: "Yesterday, 1:45 PM",
    },
  ]

  const filteredFoodItems = foodItems.filter((item) => {
    if (selectedCategory === "all") return true
    return item.category === selectedCategory
  })

  const addToCart = (item: FoodItem) => {
    setCartItems([...cartItems, item])
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const removeFromCart = (id: number) => {
    const index = cartItems.findIndex((item) => item.id === id)
    if (index !== -1) {
      const newCartItems = [...cartItems]
      newCartItems.splice(index, 1)
      setCartItems(newCartItems)
      toast({
        title: "Removed from Cart",
        description: "Item has been removed from your cart.",
      })
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("$", ""))
      return total + price
    }, 0)
  }

  const placeOrder = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Order Placed",
      description: "Your order has been placed successfully.",
    })
    setCartItems([])
  }

  const confirmDelivery = (id: string) => {
    toast({
      title: "Delivery Confirmed",
      description: `Order ${id} has been marked as delivered.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Food Delivery</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-1"
            onClick={() => {
              setActiveTab("menu")
            }}
          >
            <Plus className="h-4 w-4" />
            New Order
          </Button>
        </div>
      </div>

      <Tabs defaultValue="menu" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="menu" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            Menu
          </TabsTrigger>
          <TabsTrigger value="active-orders" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Active Orders
          </TabsTrigger>
          <TabsTrigger value="order-history" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Order History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Menu Section */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="text" placeholder="Search menu items" className="pl-10 pr-4 py-2 w-full md:w-[400px]" />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Starters">Starters</SelectItem>
                      <SelectItem value="Main Course">Main Course</SelectItem>
                      <SelectItem value="Dessert">Dessert</SelectItem>
                      <SelectItem value="Drinks">Drinks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFoodItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative h-40 w-full">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <CardDescription>{item.category}</CardDescription>
                        </div>
                        <Badge>{item.price}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full" onClick={() => addToCart(item)}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cart Section */}
            <div className="w-full md:w-80 lg:w-96">
              <Card className="sticky top-4">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Your Cart
                    {cartItems.length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {cartItems.length}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Your cart is empty</p>
                      <p className="text-xs text-muted-foreground mt-1">Add items from the menu to get started</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {cartItems.map((item) => (
                          <div key={`${item.id}-${Math.random()}`} className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="mr-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div>
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-xs text-muted-foreground">{item.price}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Subtotal</span>
                          <span className="text-sm font-medium">${calculateTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Delivery Fee</span>
                          <span className="text-sm font-medium">$2.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Tax</span>
                          <span className="text-sm font-medium">${(calculateTotal() * 0.1).toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-base font-medium">Total</span>
                          <span className="text-base font-bold">
                            ${(calculateTotal() + 2 + calculateTotal() * 0.1).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="room">Room Number</Label>
                        <Select>
                          <SelectTrigger id="room">
                            <SelectValue placeholder="Select your room" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="301">301 - Deluxe King</SelectItem>
                            <SelectItem value="205">205 - Queen Suite</SelectItem>
                            <SelectItem value="410">410 - Deluxe Twin</SelectItem>
                            <SelectItem value="512">512 - Executive Suite</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Special Instructions</Label>
                        <Textarea id="notes" placeholder="Any special requests or dietary restrictions" />
                      </div>

                      <Button className="w-full" onClick={placeOrder}>
                        Place Order
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="active-orders" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by order ID or guest name"
                className="pl-10 pr-4 py-2 w-full md:w-[400px]"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="on-the-way">On the way</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        Order {order.id}
                        {order.status === "Preparing" ? (
                          <Badge variant="warning" className="ml-2">
                            Preparing
                          </Badge>
                        ) : order.status === "On the way" ? (
                          <Badge className="ml-2">On the way</Badge>
                        ) : (
                          <Badge variant="success" className="ml-2">
                            Delivered
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        Room {order.room} • {order.time}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Contact Guest</DropdownMenuItem>
                        {order.status !== "Delivered" && (
                          <DropdownMenuItem onClick={() => confirmDelivery(order.id)}>
                            Mark as Delivered
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Items:</p>
                      <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                        {order.items.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total:</span>
                      <span className="text-sm font-bold">{order.total}</span>
                    </div>

                    {order.status !== "Delivered" && (
                      <div className="bg-muted p-3 rounded-md">
                        <div className="flex items-center mb-2">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <p className="text-sm">
                            Estimated delivery: <span className="font-medium">{order.estimatedDelivery}</span>
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                          <p className="text-sm">
                            Delivery person: <span className="font-medium">{order.deliveryPerson}</span>
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Google Maps Integration Placeholder */}
                    {order.status === "On the way" && (
                      <div className="relative h-32 w-full bg-muted rounded-md overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <MapPin className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground ml-2">Live tracking available</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  {order.status === "Delivered" ? (
                    <Button variant="outline" className="w-full" disabled>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Delivered
                    </Button>
                  ) : (
                    <Button
                      variant={order.status === "On the way" ? "default" : "outline"}
                      className="w-full"
                      onClick={() => confirmDelivery(order.id)}
                    >
                      {order.status === "On the way" ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />I Received My Order
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 mr-2" />
                          Preparing Your Order
                        </>
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="order-history" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by order ID or guest name"
                className="pl-10 pr-4 py-2 w-full md:w-[400px]"
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
            </div>
          </div>

          <Card>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-base font-medium">Order History</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...activeOrders, ...orderHistory].map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.guest}</TableCell>
                        <TableCell>{order.room}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            {order.items.map((item, index) => (
                              <span key={index} className="text-xs">
                                {item}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell>{order.time}</TableCell>
                        <TableCell>
                          {order.status === "Preparing" ? (
                            <Badge variant="warning">Preparing</Badge>
                          ) : order.status === "On the way" ? (
                            <Badge>On the way</Badge>
                          ) : (
                            <Badge variant="success">Delivered</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8">
                            View Details
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
