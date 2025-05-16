"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Filter, Plus, Edit, Trash, Coffee, Utensils, AlertCircle, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface MenuItem {
  id: number
  name: string
  category: string
  subcategory: string
  price: string
  description: string
  image: string
  rating: number
  stockRemaining: number
}

export default function RestaurantPage() {
  const [activeTab, setActiveTab] = useState("menu")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Caprese Salad",
      category: "Starters",
      subcategory: "Salads",
      price: "$12",
      description: "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze and olive oil.",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
      stockRemaining: 20,
    },
    {
      id: 2,
      name: "Garlic Bread",
      category: "Starters",
      subcategory: "Bread",
      price: "$8",
      description: "Toasted baguette with garlic butter and herbs.",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.2,
      stockRemaining: 15,
    },
    {
      id: 3,
      name: "Grilled Salmon",
      category: "Main Course",
      subcategory: "Seafood",
      price: "$26",
      description: "Fresh salmon fillet grilled to perfection, served with seasonal vegetables and lemon butter sauce.",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      stockRemaining: 8,
    },
    {
      id: 4,
      name: "Beef Tenderloin",
      category: "Main Course",
      subcategory: "Meat",
      price: "$32",
      description: "Premium beef tenderloin cooked to your preference, served with mashed potatoes and red wine sauce.",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      stockRemaining: 5,
    },
    {
      id: 5,
      name: "Chocolate Lava Cake",
      category: "Dessert",
      subcategory: "Cakes",
      price: "$10",
      description: "Warm chocolate cake with a molten center, served with vanilla ice cream.",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      stockRemaining: 12,
    },
    {
      id: 6,
      name: "Fresh Fruit Platter",
      category: "Dessert",
      subcategory: "Fruits",
      price: "$14",
      description: "Assortment of seasonal fresh fruits, elegantly presented.",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.3,
      stockRemaining: 7,
    },
    {
      id: 7,
      name: "Orange Juice",
      category: "Drinks",
      subcategory: "Non-Alcoholic",
      price: "$6",
      description: "Freshly squeezed orange juice.",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.4,
      stockRemaining: 25,
    },
    {
      id: 8,
      name: "Iced Coffee",
      category: "Drinks",
      subcategory: "Non-Alcoholic",
      price: "$5",
      description: "Cold brewed coffee served over ice with your choice of milk and sweetener.",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      stockRemaining: 18,
    },
  ]

  const filteredMenuItems = menuItems
    .filter((item) => {
      if (selectedCategory === "all") return true
      return item.category === selectedCategory
    })
    .filter((item) => {
      if (!searchTerm) return true
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })

  const handleAddMenuItem = () => {
    toast({
      title: "Menu Item Added",
      description: "New menu item has been successfully added.",
    })
  }

  const handleEditMenuItem = (id: number) => {
    toast({
      title: "Menu Item Updated",
      description: `Menu item #${id} has been successfully updated.`,
    })
  }

  const handleDeleteMenuItem = (id: number) => {
    toast({
      title: "Menu Item Deleted",
      description: `Menu item #${id} has been successfully deleted.`,
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Restaurant Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>
                Enter the details for the new menu item. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-name" className="text-right">
                  Item Name
                </Label>
                <Input id="item-name" placeholder="e.g. Grilled Salmon" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starters">Starters</SelectItem>
                    <SelectItem value="main-course">Main Course</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                    <SelectItem value="drinks">Drinks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subcategory" className="text-right">
                  Subcategory
                </Label>
                <Input id="subcategory" placeholder="e.g. Seafood" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input id="price" placeholder="e.g. $25" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  Description
                </Label>
                <Textarea id="description" placeholder="Item description" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Stock Quantity
                </Label>
                <Input id="stock" type="number" placeholder="e.g. 20" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Item Image
                </Label>
                <Input id="image" type="file" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddMenuItem}>Save Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="menu" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="menu" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            Menu Items
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Coffee className="h-4 w-4" />
            Categories
          </TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search menu items"
                className="pl-10 pr-4 py-2 w-full md:w-[400px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMenuItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <Badge className="flex items-center gap-1 bg-background/80 backdrop-blur-sm">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {item.rating}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription>
                        {item.category} • {item.subcategory}
                      </CardDescription>
                    </div>
                    <Badge>{item.price}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  <div className="mt-2 flex items-center">
                    <p className="text-sm">
                      Stock: <span className="font-medium">{item.stockRemaining}</span>
                    </p>
                    {item.stockRemaining <= 5 && (
                      <Badge variant="destructive" className="ml-2 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> Low Stock
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEditMenuItem(item.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteMenuItem(item.id)}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredMenuItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No menu items found matching your criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-base font-medium">Menu Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="starters">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Utensils className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-left">Starters</p>
                        <p className="text-xs text-muted-foreground text-left">
                          {menuItems.filter((item) => item.category === "Starters").length} items
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-12 space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Salads</p>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Bread</p>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto flex">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Subcategory
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="main-course">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Utensils className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-left">Main Course</p>
                        <p className="text-xs text-muted-foreground text-left">
                          {menuItems.filter((item) => item.category === "Main Course").length} items
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-12 space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Seafood</p>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Meat</p>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto flex">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Subcategory
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="dessert">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center">
                      <div className="bg-pink-100 p-2 rounded-full mr-3">
                        <Utensils className="h-4 w-4 text-pink-600" />
                      </div>
                      <div>
                        <p className="font-medium text-left">Dessert</p>
                        <p className="text-xs text-muted-foreground text-left">
                          {menuItems.filter((item) => item.category === "Dessert").length} items
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-12 space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Cakes</p>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Fruits</p>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto flex">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Subcategory
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="drinks">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        <Coffee className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-left">Drinks</p>
                        <p className="text-xs text-muted-foreground text-left">
                          {menuItems.filter((item) => item.category === "Drinks").length} items
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-12 space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Non-Alcoholic</p>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto flex">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Subcategory
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6">
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Category
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-base font-medium">Stock Management</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock Remaining</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {menuItems
                      .sort((a, b) => a.stockRemaining - b.stockRemaining)
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.stockRemaining}</TableCell>
                          <TableCell>
                            {item.stockRemaining <= 5 ? (
                              <Badge variant="destructive">Low Stock</Badge>
                            ) : item.stockRemaining <= 10 ? (
                              <Badge variant="warning">Medium Stock</Badge>
                            ) : (
                              <Badge variant="success">In Stock</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Update Stock
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
