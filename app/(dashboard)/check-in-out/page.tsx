"use client"

import { useState } from "react"

import { Search, Filter, Plus, CheckSquare, LogOut, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

export default function CheckInOutPage() {
  const [activeTab, setActiveTab] = useState("check-in")
  const { toast } = useToast()

  const checkInData = [
    {
      id: 1,
      name: "John Smith",
      bookingId: "BK12345",
      roomNumber: "301",
      roomType: "Deluxe King",
      checkInDate: "Aug 2, 2023",
      checkOutDate: "Aug 4, 2023",
      status: "Confirmed",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      bookingId: "BK12346",
      roomNumber: "205",
      roomType: "Queen Suite",
      checkInDate: "Aug 2, 2023",
      checkOutDate: "Aug 6, 2023",
      status: "Checked In",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      name: "Michael Chen",
      bookingId: "BK12347",
      roomNumber: "410",
      roomType: "Deluxe Twin",
      checkInDate: "Aug 2, 2023",
      checkOutDate: "Aug 3, 2023",
      status: "Pending",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      name: "Emma Wilson",
      bookingId: "BK12348",
      roomNumber: "512",
      roomType: "Executive Suite",
      checkInDate: "Aug 2, 2023",
      checkOutDate: "Aug 5, 2023",
      status: "Confirmed",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const checkOutData = [
    {
      id: 1,
      name: "David Brown",
      bookingId: "BK12340",
      roomNumber: "302",
      roomType: "Deluxe King",
      checkInDate: "Jul 30, 2023",
      checkOutDate: "Aug 2, 2023",
      status: "Checked In",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      name: "Lisa Garcia",
      bookingId: "BK12341",
      roomNumber: "207",
      roomType: "Queen Suite",
      checkInDate: "Jul 31, 2023",
      checkOutDate: "Aug 2, 2023",
      status: "Checked In",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      name: "Robert Taylor",
      bookingId: "BK12342",
      roomNumber: "415",
      roomType: "Deluxe Twin",
      checkInDate: "Jul 29, 2023",
      checkOutDate: "Aug 2, 2023",
      status: "Checked In",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const handleCheckIn = (id: number) => {
    toast({
      title: "Guest Checked In",
      description: `Guest has been successfully checked in.`,
    })
  }

  const handleCheckOut = (id: number) => {
    toast({
      title: "Guest Checked Out",
      description: `Guest has been successfully checked out.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Check-In / Check-Out</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            New Booking
          </Button>
        </div>
      </div>

      <Tabs defaultValue="check-in" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="check-in" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Check-In
          </TabsTrigger>
          <TabsTrigger value="check-out" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Check-Out
          </TabsTrigger>
        </TabsList>

        <TabsContent value="check-in" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, booking ID or room number"
                className="pl-10 pr-4 py-2 w-full md:w-[400px]"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="today">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base font-medium">
                Today&apos;s Check-Ins{" "}
                <span className="text-xs font-normal text-muted-foreground">({checkInData.length} Guests)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap">GUEST</TableHead>
                      <TableHead className="whitespace-nowrap">BOOKING ID</TableHead>
                      <TableHead className="whitespace-nowrap">ROOM</TableHead>
                      <TableHead className="whitespace-nowrap">CHECK-IN</TableHead>
                      <TableHead className="whitespace-nowrap">CHECK-OUT</TableHead>
                      <TableHead className="whitespace-nowrap">STATUS</TableHead>
                      <TableHead className="whitespace-nowrap">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {checkInData.map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarImage src={guest.avatar || "/placeholder.svg"} alt={guest.name} />
                              <AvatarFallback>
                                {guest.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{guest.name}</p>
                              <p className="text-xs text-muted-foreground">{guest.roomType}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{guest.bookingId}</TableCell>
                        <TableCell>{guest.roomNumber}</TableCell>
                        <TableCell>{guest.checkInDate}</TableCell>
                        <TableCell>{guest.checkOutDate}</TableCell>
                        <TableCell>
                          {guest.status === "Confirmed" ? (
                            <Badge variant="outline">Confirmed</Badge>
                          ) : guest.status === "Checked In" ? (
                            <Badge variant="success">Checked In</Badge>
                          ) : (
                            <Badge variant="warning">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="default" size="sm" disabled={guest.status === "Checked In"}>
                                  Check In
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Check In Guest</DialogTitle>
                                  <DialogDescription>Complete the check-in process for {guest.name}.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                      Guest Name
                                    </Label>
                                    <Input id="name" value={guest.name} className="col-span-3" readOnly />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="room" className="text-right">
                                      Room Number
                                    </Label>
                                    <Input id="room" value={guest.roomNumber} className="col-span-3" readOnly />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="id-proof" className="text-right">
                                      ID Proof
                                    </Label>
                                    <Select defaultValue="passport">
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select ID type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="passport">Passport</SelectItem>
                                        <SelectItem value="driving-license">Driving License</SelectItem>
                                        <SelectItem value="national-id">National ID</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="id-number" className="text-right">
                                      ID Number
                                    </Label>
                                    <Input id="id-number" placeholder="Enter ID number" className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="payment" className="text-right">
                                      Payment Method
                                    </Label>
                                    <Select defaultValue="credit-card">
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select payment method" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="credit-card">Credit Card</SelectItem>
                                        <SelectItem value="debit-card">Debit Card</SelectItem>
                                        <SelectItem value="cash">Cash</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="notes" className="text-right pt-2">
                                      Notes
                                    </Label>
                                    <Textarea
                                      id="notes"
                                      placeholder="Any special requests or notes"
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <div className="col-span-4">
                                      <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" />
                                        <Label htmlFor="terms">Guest has agreed to hotel terms and conditions</Label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button onClick={() => handleCheckIn(guest.id)}>Complete Check-In</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                                <DropdownMenuItem>Cancel Booking</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="check-out" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, booking ID or room number"
                className="pl-10 pr-4 py-2 w-full md:w-[400px]"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="today">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base font-medium">
                Today&apos;s Check-Outs{" "}
                <span className="text-xs font-normal text-muted-foreground">({checkOutData.length} Guests)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap">GUEST</TableHead>
                      <TableHead className="whitespace-nowrap">BOOKING ID</TableHead>
                      <TableHead className="whitespace-nowrap">ROOM</TableHead>
                      <TableHead className="whitespace-nowrap">CHECK-IN</TableHead>
                      <TableHead className="whitespace-nowrap">CHECK-OUT</TableHead>
                      <TableHead className="whitespace-nowrap">STATUS</TableHead>
                      <TableHead className="whitespace-nowrap">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {checkOutData.map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarImage src={guest.avatar || "/placeholder.svg"} alt={guest.name} />
                              <AvatarFallback>
                                {guest.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{guest.name}</p>
                              <p className="text-xs text-muted-foreground">{guest.roomType}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{guest.bookingId}</TableCell>
                        <TableCell>{guest.roomNumber}</TableCell>
                        <TableCell>{guest.checkInDate}</TableCell>
                        <TableCell>{guest.checkOutDate}</TableCell>
                        <TableCell>
                          <Badge variant="success">Checked In</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="default" size="sm">
                                  Check Out
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Check Out Guest</DialogTitle>
                                  <DialogDescription>
                                    Complete the check-out process for {guest.name}.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                      Guest Name
                                    </Label>
                                    <Input id="name" value={guest.name} className="col-span-3" readOnly />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="room" className="text-right">
                                      Room Number
                                    </Label>
                                    <Input id="room" value={guest.roomNumber} className="col-span-3" readOnly />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="outstanding" className="text-right">
                                      Outstanding Amount
                                    </Label>
                                    <Input id="outstanding" value="$0.00" className="col-span-3" readOnly />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="room-status" className="text-right">
                                      Room Status
                                    </Label>
                                    <Select defaultValue="inspected">
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select room status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="inspected">Inspected</SelectItem>
                                        <SelectItem value="needs-cleaning">Needs Cleaning</SelectItem>
                                        <SelectItem value="damaged">Damaged</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="notes" className="text-right pt-2">
                                      Notes
                                    </Label>
                                    <Textarea
                                      id="notes"
                                      placeholder="Any notes about the check-out"
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <div className="col-span-4">
                                      <div className="flex items-center space-x-2">
                                        <Checkbox id="keys" />
                                        <Label htmlFor="keys">Room keys returned</Label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button onClick={() => handleCheckOut(guest.id)}>Complete Check-Out</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>View Bill</DropdownMenuItem>
                                <DropdownMenuItem>Extend Stay</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
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
