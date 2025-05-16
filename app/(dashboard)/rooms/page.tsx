"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash,
  MoreHorizontal,
  Wifi,
  Coffee,
  Tv,
  Bath,
  Utensils,
  Wind,
  Check,
  X,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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

interface Room {
  id: number
  name: string
  type: string
  price: string
  capacity: number
  status: "Available" | "Occupied" | "Maintenance" | "Reserved"
  amenities: string[]
  image: string
  description: string
}

export default function RoomsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const rooms: Room[] = [
    {
      id: 1,
      name: "Deluxe King Room",
      type: "Deluxe",
      price: "$250",
      capacity: 2,
      status: "Available",
      amenities: ["WiFi", "TV", "Mini Bar", "Air Conditioning", "Room Service"],
      image: "/placeholder.svg?height=200&width=300",
      description: "Spacious room with a king-sized bed, modern amenities, and a stunning city view.",
    },
    {
      id: 2,
      name: "Queen Suite",
      type: "Suite",
      price: "$350",
      capacity: 4,
      status: "Occupied",
      amenities: ["WiFi", "TV", "Mini Bar", "Air Conditioning", "Room Service", "Jacuzzi"],
      image: "/placeholder.svg?height=200&width=300",
      description: "Luxurious suite with a queen-sized bed, separate living area, and premium amenities.",
    },
    {
      id: 3,
      name: "Standard Twin Room",
      type: "Standard",
      price: "$180",
      capacity: 2,
      status: "Available",
      amenities: ["WiFi", "TV", "Air Conditioning"],
      image: "/placeholder.svg?height=200&width=300",
      description: "Comfortable room with two twin beds, perfect for friends or colleagues traveling together.",
    },
    {
      id: 4,
      name: "Executive Suite",
      type: "Suite",
      price: "$450",
      capacity: 2,
      status: "Reserved",
      amenities: ["WiFi", "TV", "Mini Bar", "Air Conditioning", "Room Service", "Jacuzzi", "Balcony"],
      image: "/placeholder.svg?height=200&width=300",
      description: "Premium suite with a king-sized bed, spacious living area, and exclusive amenities.",
    },
    {
      id: 5,
      name: "Family Room",
      type: "Family",
      price: "$320",
      capacity: 5,
      status: "Available",
      amenities: ["WiFi", "TV", "Mini Bar", "Air Conditioning", "Room Service"],
      image: "/placeholder.svg?height=200&width=300",
      description: "Spacious room designed for families, with multiple beds and family-friendly amenities.",
    },
    {
      id: 6,
      name: "Penthouse Suite",
      type: "Penthouse",
      price: "$800",
      capacity: 4,
      status: "Maintenance",
      amenities: ["WiFi", "TV", "Mini Bar", "Air Conditioning", "Room Service", "Jacuzzi", "Balcony", "Kitchen"],
      image: "/placeholder.svg?height=200&width=300",
      description: "Luxurious top-floor suite with panoramic views, premium amenities, and exclusive services.",
    },
  ]

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "WiFi":
        return <Wifi className="h-4 w-4" />
      case "TV":
        return <Tv className="h-4 w-4" />
      case "Mini Bar":
        return <Coffee className="h-4 w-4" />
      case "Air Conditioning":
        return <Wind className="h-4 w-4" />
      case "Room Service":
        return <Utensils className="h-4 w-4" />
      case "Jacuzzi":
        return <Bath className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: Room["status"]) => {
    switch (status) {
      case "Available":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <Check className="h-3 w-3" /> Available
          </Badge>
        )
      case "Occupied":
        return <Badge className="flex items-center gap-1">Occupied</Badge>
      case "Maintenance":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <X className="h-3 w-3" /> Maintenance
          </Badge>
        )
      case "Reserved":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            Reserved
          </Badge>
        )
      default:
        return null
    }
  }

  const filteredRooms = rooms
    .filter((room) => {
      if (activeTab === "all") return true
      if (activeTab === "available") return room.status === "Available"
      if (activeTab === "occupied") return room.status === "Occupied"
      if (activeTab === "maintenance") return room.status === "Maintenance"
      return true
    })
    .filter((room) => {
      if (!searchTerm) return true
      return (
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })

  const handleAddRoom = () => {
    toast({
      title: "Room Added",
      description: "New room has been successfully added.",
    })
  }

  const handleEditRoom = (id: number) => {
    toast({
      title: "Room Updated",
      description: `Room #${id} has been successfully updated.`,
    })
  }

  const handleDeleteRoom = (id: number) => {
    toast({
      title: "Room Deleted",
      description: `Room #${id} has been successfully deleted.`,
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Room Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add New Room
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>Enter the details for the new room. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room-name" className="text-right">
                  Room Name
                </Label>
                <Input id="room-name" placeholder="e.g. Deluxe King Room" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room-type" className="text-right">
                  Room Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="deluxe">Deluxe</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room-price" className="text-right">
                  Price per Night
                </Label>
                <Input id="room-price" placeholder="e.g. $250" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room-capacity" className="text-right">
                  Capacity
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Person</SelectItem>
                    <SelectItem value="2">2 People</SelectItem>
                    <SelectItem value="3">3 People</SelectItem>
                    <SelectItem value="4">4 People</SelectItem>
                    <SelectItem value="5">5+ People</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room-status" className="text-right">
                  Status
                </Label>
                <Select defaultValue="available">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="room-description" className="text-right pt-2">
                  Description
                </Label>
                <Textarea id="room-description" placeholder="Room description" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room-image" className="text-right">
                  Room Image
                </Label>
                <Input id="room-image" type="file" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddRoom}>Save Room</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search rooms by name or type"
            className="pl-10 pr-4 py-2 w-full md:w-[400px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="all">All Rooms</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="occupied">Occupied</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                      <CardDescription>{room.type} Room</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditRoom(room.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Room
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteRoom(room.id)}>
                          <Trash className="h-4 w-4 mr-2" />
                          Delete Room
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-bold">
                      {room.price}
                      <span className="text-sm font-normal text-muted-foreground">/night</span>
                    </p>
                    {getStatusBadge(room.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{room.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {room.amenities.slice(0, 5).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {getAmenityIcon(amenity)}
                        {amenity}
                      </Badge>
                    ))}
                    {room.amenities.length > 5 && <Badge variant="outline">+{room.amenities.length - 5} more</Badge>}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Capacity: {room.capacity} {room.capacity === 1 ? "Person" : "People"}
                  </p>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredRooms.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No rooms found matching your criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setActiveTab("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
