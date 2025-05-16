"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Search,
  Plus,
  Edit,
  Trash,
  Wine,
  Beer,
  Coffee,
  AlertCircle,
  Star,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { Checkbox } from "@/components/ui/checkbox"

interface DrinkItem {
  id: number
  name: string
  category: "Alcoholic" | "Non-Alcoholic"
  type: string
  price: string
  description: string
  image: string
  rating: number
  stockRemaining: number
  alcoholPercentage?: string
}

export default function BarPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "price" | "rating" | "stock">("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const { toast } = useToast()

  const drinkItems: DrinkItem[] = [
    {
      id: 1,
      name: "Red Wine",
      category: "Alcoholic",
      type: "Wine",
      price: "$12",
      description: "Premium red wine with rich flavor and smooth finish.",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      stockRemaining: 25,
      alcoholPercentage: "13%",
    },
    {
      id: 2,
      name: "White Wine",
      category: "Alcoholic",
      type: "Wine",
      price: "$10",
      description: "Crisp and refreshing white wine with fruity notes.",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
      stockRemaining: 18,
      alcoholPercentage: "12%",
    },
    {
      id: 3,
      name: "Whiskey",
      category: "Alcoholic",
      type: "Spirits",
      price: "$15",
      description: "Aged whiskey with a smooth, smoky flavor profile.",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      stockRemaining: 12,
      alcoholPercentage: "40%",
    },
    {
      id: 4,
      name: "Vodka",
      category: "Alcoholic",
      type: "Spirits",
      price: "$14",
      description: "Premium distilled vodka, perfect for cocktails or straight.",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      stockRemaining: 15,
      alcoholPercentage: "37.5%",
    },
    {
      id: 5,
      name: "Beer",
      category: "Alcoholic",
      type: "Beer",
      price: "$8",
      description: "Craft beer with a balanced hop profile and smooth finish.",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.4,
      stockRemaining: 30,
      alcoholPercentage: "5%",
    },
    {
      id: 6,
      name: "Soda",
      category: "Non-Alcoholic",
      type: "Soft Drinks",
      price: "$4",
      description: "Refreshing carbonated beverage with a variety of flavors.",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.2,
      stockRemaining: 45,
    },
    {
      id: 7,
      name: "Mocktail",
      category: "Non-Alcoholic",
      type: "Mocktails",
      price: "$7",
      description: "Delicious non-alcoholic cocktail with fresh fruits and juices.",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
      stockRemaining: 20,
    },
    {
      id: 8,
      name: "Iced Tea",
      category: "Non-Alcoholic",
      type: "Tea",
      price: "$5",
      description: "Refreshing iced tea with a hint of lemon and mint.",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.3,
      stockRemaining: 35,
    },
  ]

  const filteredDrinkItems = drinkItems
    .filter((item) => {
      if (activeTab === "all") return true
      if (activeTab === "alcoholic") return item.category === "Alcoholic"
      if (activeTab === "non-alcoholic") return item.category === "Non-Alcoholic"
      return true
    })
    .filter((item) => {
      if (selectedCategory === "all") return true
      return item.type === selectedCategory
    })
    .filter((item) => {
      if (!searchTerm) return true
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortBy === "price") {
        const aPrice = Number.parseFloat(a.price.replace("$", ""))
        const bPrice = Number.parseFloat(b.price.replace("$", ""))
        return sortOrder === "asc" ? aPrice - bPrice : bPrice - aPrice
      } else if (sortBy === "rating") {
        return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
      } else if (sortBy === "stock") {
        return sortOrder === "asc" ? a.stockRemaining - b.stockRemaining : b.stockRemaining - a.stockRemaining
      }
      return 0
    })

  const handleAddDrink = () => {
    toast({
      title: "Drink Added",
      description: "New drink has been successfully added.",
    })
  }

  const handleEditDrink = (id: number) => {
    toast({
      title: "Drink Updated",
      description: `Drink #${id} has been successfully updated.`,
    })
  }

  const handleDeleteDrink = (id: number) => {
    toast({
      title: "Drink Deleted",
      description: `Drink #${id} has been successfully deleted.`,
      variant: "destructive",
    })
  }

  const toggleSort = (column: "name" | "price" | "rating" | "stock") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  const getDrinkIcon = (type: string) => {
    switch (type) {
      case "Wine":
        return <Wine className="h-4 w-4" />
      case "Beer":
        return <Beer className="h-4 w-4" />
      case "Spirits":
        return <Wine className="h-4 w-4" />
      default:
        return <Coffee className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Bar Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add Drink
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Drink</DialogTitle>
              <DialogDescription>Enter the details for the new drink. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="drink-name" className="text-right">
                  Drink Name
                </Label>
                <Input id="drink-name" placeholder="e.g. Red Wine" className="col-span-3" />
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
                    <SelectItem value="alcoholic">Alcoholic</SelectItem>
                    <SelectItem value="non-alcoholic">Non-Alcoholic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wine">Wine</SelectItem>
                    <SelectItem value="beer">Beer</SelectItem>
                    <SelectItem value="spirits">Spirits</SelectItem>
                    <SelectItem value="soft-drinks">Soft Drinks</SelectItem>
                    <SelectItem value="mocktails">Mocktails</SelectItem>
                    <SelectItem value="tea">Tea</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input id="price" placeholder="e.g. $12" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="alcohol-percentage" className="text-right">
                  Alcohol %
                </Label>
                <Input id="alcohol-percentage" placeholder="e.g. 13%" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  Description
                </Label>
                <Textarea id="description" placeholder="Drink description" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Stock Quantity
                </Label>
                <Input id="stock" type="number" placeholder="e.g. 20" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Drink Image
                </Label>
                <Input id="image" type="file" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddDrink}>Save Drink</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all">All Drinks</TabsTrigger>
          <TabsTrigger value="alcoholic" className="flex items-center gap-2">
            <Wine className="h-4 w-4" />
            Alcoholic
          </TabsTrigger>
          <TabsTrigger value="non-alcoholic" className="flex items-center gap-2">
            <Coffee className="h-4 w-4" />
            Non-Alcoholic
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search drinks"
              className="pl-10 pr-4 py-2 w-full md:w-[400px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Wine">Wine</SelectItem>
                <SelectItem value="Beer">Beer</SelectItem>
                <SelectItem value="Spirits">Spirits</SelectItem>
                <SelectItem value="Soft Drinks">Soft Drinks</SelectItem>
                <SelectItem value="Mocktails">Mocktails</SelectItem>
                <SelectItem value="Tea">Tea</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Sort by <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => toggleSort("name")}>
                  Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleSort("price")}>
                  Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleSort("rating")}>
                  Rating {sortBy === "rating" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleSort("stock")}>
                  Stock {sortBy === "stock" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDrinkItems.map((item) => (
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
                      <CardDescription className="flex items-center gap-1">
                        {getDrinkIcon(item.type)} {item.type}
                        {item.alcoholPercentage && (
                          <Badge variant="outline" className="ml-2">
                            {item.alcoholPercentage}
                          </Badge>
                        )}
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
                  <Button variant="outline" size="sm" onClick={() => handleEditDrink(item.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteDrink(item.id)}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredDrinkItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No drinks found matching your criteria</p>
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
      </Tabs>

      <Card>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-base font-medium">Inventory Management</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("name")}>
                    <div className="flex items-center">
                      Drink Name
                      {sortBy === "name" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </div>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("price")}>
                    <div className="flex items-center">
                      Price
                      {sortBy === "price" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("stock")}>
                    <div className="flex items-center">
                      Stock
                      {sortBy === "stock" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drinkItems
                  .sort((a, b) => {
                    if (sortBy === "stock") {
                      return sortOrder === "asc"
                        ? a.stockRemaining - b.stockRemaining
                        : b.stockRemaining - a.stockRemaining
                    }
                    return 0
                  })
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.price}</TableCell>
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              Update Stock
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Update Stock</DialogTitle>
                              <DialogDescription>Update the stock quantity for {item.name}.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="current-stock" className="text-right">
                                  Current Stock
                                </Label>
                                <Input id="current-stock" value={item.stockRemaining} className="col-span-3" readOnly />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="new-stock" className="text-right">
                                  New Stock
                                </Label>
                                <Input id="new-stock" type="number" className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <div className="col-span-4">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="reorder" />
                                    <Label htmlFor="reorder">Place reorder for this item</Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={() => handleEditDrink(item.id)}>Update Stock</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
