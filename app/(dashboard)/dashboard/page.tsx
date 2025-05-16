"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Edit,
  Trash,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Calendar,
  Users,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("stays")

  // Sample data for charts
  const revenueData = [
    { name: "Sun", value: 8 },
    { name: "Mon", value: 10 },
    { name: "Tue", value: 12 },
    { name: "Wed", value: 11 },
    { name: "Thu", value: 9 },
    { name: "Fri", value: 11 },
    { name: "Sat", value: 12 },
  ]

  const guestsData = [
    { name: "Sun", value: 8000 },
    { name: "Mon", value: 10000 },
    { name: "Tue", value: 12000 },
    { name: "Wed", value: 9000 },
    { name: "Thu", value: 6000 },
    { name: "Fri", value: 8000 },
  ]

  const roomsData = [
    { name: "Sun", occupied: 15, booked: 10, available: 25 },
    { name: "Mon", occupied: 20, booked: 12, available: 18 },
    { name: "Tue", occupied: 18, booked: 15, available: 17 },
    { name: "Wed", occupied: 22, booked: 10, available: 18 },
    { name: "Thu", occupied: 20, booked: 15, available: 15 },
    { name: "Fri", occupied: 18, booked: 12, available: 20 },
    { name: "Sat", occupied: 15, booked: 10, available: 25 },
  ]

  const foodOrdersData = [
    { name: "Breakfast", value: 35 },
    { name: "Lunch", value: 45 },
    { name: "Dinner", value: 55 },
    { name: "Room Service", value: 25 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const bookingData = [
    {
      id: 1,
      name: "John Smith",
      phone: "555-123-4567",
      bookingId: "BK12345",
      nights: 2,
      roomType: "Deluxe King",
      guests: 2,
      paid: "Partial",
      cost: "$350",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      phone: "555-987-6543",
      bookingId: "BK12346",
      nights: 4,
      roomType: ["Queen Suite", "Standard Twin"],
      guests: 5,
      paid: "Paid",
      cost: "$1,200",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      name: "Michael Chen",
      phone: "555-456-7890",
      bookingId: "BK12347",
      nights: 1,
      roomType: ["Deluxe King", "Deluxe Twin"],
      guests: 3,
      paid: "Pending",
      cost: "$275",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      name: "Emma Wilson",
      phone: "555-789-0123",
      bookingId: "BK12348",
      nights: 3,
      roomType: ["Executive Suite", "Deluxe King"],
      guests: 2,
      paid: "Partial",
      cost: "$850",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const calendarEvents = [
    { date: 2, guest: "John Smith", nights: 2, guests: 2 },
    { date: 9, guest: "Sarah Johnson", nights: 3, guests: 4 },
    { date: 24, guest: "Michael Chen", nights: 1, guests: 2 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">Last updated: 5 minutes ago</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Arrivals <span className="text-xs">(Today)</span>
              </p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold mr-2">12</h3>
                <Badge variant="success" className="flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  24%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Previous day: 8</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-amber-100 p-3 rounded-full mr-4">
              <Calendar className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Departures <span className="text-xs">(Today)</span>
              </p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold mr-2">8</h3>
                <Badge variant="destructive" className="flex items-center">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  12%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Previous day: 10</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-cyan-100 p-3 rounded-full mr-4">
              <Calendar className="h-6 w-6 text-cyan-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Bookings <span className="text-xs">(This week)</span>
              </p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold mr-2">42</h3>
                <Badge variant="success" className="flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  31%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Previous week: 32</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-2">Today's Overview</p>
            <div className="flex justify-between mb-2">
              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-1">
                  <span>15</span>
                </div>
                <p className="text-xs">
                  Rooms
                  <br />
                  Available
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-1">
                  <span>25</span>
                </div>
                <p className="text-xs">
                  Rooms
                  <br />
                  Occupied
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-1">
                  <span>42</span>
                </div>
                <p className="text-xs">Guests</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground">Today's Revenue</p>
              <div className="flex items-center">
                <p className="text-lg font-bold">$3,250</p>
                <Badge variant="success" className="ml-2 flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  15%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-base font-medium">Revenue</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  This Week <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>This Month</DropdownMenuItem>
                <DropdownMenuItem>This Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide={true} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background p-2 border rounded shadow-sm">
                            <p className="text-xs">{`$${payload[0].value}K`}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-base font-medium">Guests</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  This Week <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>This Month</DropdownMenuItem>
                <DropdownMenuItem>This Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={guestsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide={true} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background p-2 border rounded shadow-sm">
                            <p className="text-xs">{`${payload[0].value}`}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "white", stroke: "#3b82f6", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-base font-medium">Rooms</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  This Week <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>This Month</DropdownMenuItem>
                <DropdownMenuItem>This Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xs mb-2">
              <div className="flex items-center justify-between">
                <p>Total 50 Rooms</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    <span>Occupied</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Booked</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                    <span>Available</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={roomsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide={true} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background p-2 border rounded shadow-sm">
                            <p className="text-xs">{`Occupied: ${payload[0].value}`}</p>
                            <p className="text-xs">{`Booked: ${payload[1].value}`}</p>
                            <p className="text-xs">{`Available: ${payload[2].value}`}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="occupied" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="booked" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="available" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Table */}
      <Card>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-base font-medium">
            Today&apos;s Bookings <span className="text-xs font-normal text-muted-foreground">(8 Guests today)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Tabs defaultValue="stays" className="w-full">
            <TabsList className="mb-4 border-b w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger
                value="stays"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                onClick={() => setActiveTab("stays")}
              >
                Stays
              </TabsTrigger>
              <TabsTrigger
                value="arrivals"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                onClick={() => setActiveTab("arrivals")}
              >
                Arrivals
              </TabsTrigger>
              <TabsTrigger
                value="departure"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                onClick={() => setActiveTab("departure")}
              >
                Departures
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search guest by name, phone or booking ID"
                  className="pl-10 pr-4 py-2 w-full md:w-[400px]"
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Booking
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">
                      <div className="flex items-center">
                        NAME <ChevronDown className="h-4 w-4 ml-1" />
                      </div>
                    </TableHead>
                    <TableHead className="whitespace-nowrap">BOOKING ID</TableHead>
                    <TableHead className="whitespace-nowrap">NIGHTS</TableHead>
                    <TableHead className="whitespace-nowrap">ROOM TYPE</TableHead>
                    <TableHead className="whitespace-nowrap">GUESTS</TableHead>
                    <TableHead className="whitespace-nowrap">PAID</TableHead>
                    <TableHead className="whitespace-nowrap">COST</TableHead>
                    <TableHead className="whitespace-nowrap">ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingData.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src={booking.avatar || "/placeholder.svg"} alt={booking.name} />
                            <AvatarFallback>
                              {booking.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{booking.name}</p>
                            <p className="text-xs text-muted-foreground">{booking.phone}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{booking.bookingId}</TableCell>
                      <TableCell>{booking.nights}</TableCell>
                      <TableCell>
                        {Array.isArray(booking.roomType) ? (
                          <div>
                            {booking.roomType.map((type, index) => (
                              <p key={index}>{type}</p>
                            ))}
                          </div>
                        ) : (
                          booking.roomType
                        )}
                      </TableCell>
                      <TableCell>{booking.guests} Guests</TableCell>
                      <TableCell>
                        {booking.paid === "Paid" ? (
                          <Badge variant="success">Paid</Badge>
                        ) : booking.paid === "Pending" ? (
                          <Badge variant="warning">Pending</Badge>
                        ) : (
                          <Badge>Partial</Badge>
                        )}
                      </TableCell>
                      <TableCell>{booking.cost}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" className="flex items-center">
                View All Bookings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Calendar and Rating */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-base font-medium">Calendar</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-sm font-medium">August 2023</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              <div className="py-1 font-medium">SU</div>
              <div className="py-1 font-medium">MO</div>
              <div className="py-1 font-medium">TU</div>
              <div className="py-1 font-medium">WE</div>
              <div className="py-1 font-medium">TH</div>
              <div className="py-1 font-medium">FR</div>
              <div className="py-1 font-medium">SA</div>

              <div className="py-1 text-muted-foreground">31</div>
              <div className="py-1">1</div>
              <div className="py-1 relative">
                2
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
              </div>
              <div className="py-1">3</div>
              <div className="py-1">4</div>
              <div className="py-1">5</div>
              <div className="py-1">6</div>

              <div className="py-1">7</div>
              <div className="py-1">8</div>
              <div className="py-1 relative">
                9
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
              </div>
              <div className="py-1">10</div>
              <div className="py-1">11</div>
              <div className="py-1">12</div>
              <div className="py-1">13</div>

              <div className="py-1">14</div>
              <div className="py-1">15</div>
              <div className="py-1">16</div>
              <div className="py-1">17</div>
              <div className="py-1">18</div>
              <div className="py-1">19</div>
              <div className="py-1">20</div>

              <div className="py-1">21</div>
              <div className="py-1">22</div>
              <div className="py-1">23</div>
              <div className="py-1 relative">
                24
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
              </div>
              <div className="py-1">25</div>
              <div className="py-1">26</div>
              <div className="py-1">27</div>

              <div className="py-1">28</div>
              <div className="py-1">29</div>
              <div className="py-1">30</div>
              <div className="py-1">31</div>
              <div className="py-1 text-muted-foreground">1</div>
              <div className="py-1 text-muted-foreground">2</div>
              <div className="py-1 text-muted-foreground">3</div>
            </div>

            <div className="mt-6 border rounded-md p-3">
              <h4 className="text-sm font-medium mb-2">August 02, 2023 Booking Lists</h4>
              <p className="text-xs text-muted-foreground mb-3">(3 Bookings)</p>

              <div className="space-y-3">
                {calendarEvents.map((event, index) => (
                  <div key={index} className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={event.guest} />
                      <AvatarFallback>
                        {event.guest
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{event.guest}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.nights} Nights | {event.guests} Guests
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-0">
            <CardTitle className="text-base font-medium">Overall Rating</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  This Week <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>This Month</DropdownMenuItem>
                <DropdownMenuItem>This Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-24">
                <svg viewBox="0 0 100 50" className="w-full h-full">
                  <path d="M 0 50 A 50 50 0 0 1 100 50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <path d="M 0 50 A 50 50 0 0 1 90 50" fill="none" stroke="#3b82f6" strokeWidth="10" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm font-medium">Rating</p>
                    <p className="text-2xl font-bold">4.5/5</p>
                    <Badge variant="success" className="flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      8%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Cleanliness</span>
                <div className="flex items-center gap-2">
                  <Progress value={90} className="h-2 w-32" />
                  <span className="text-sm">4.5</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Facilities</span>
                <div className="flex items-center gap-2">
                  <Progress value={90} className="h-2 w-32" />
                  <span className="text-sm">4.5</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Location</span>
                <div className="flex items-center gap-2">
                  <Progress value={80} className="h-2 w-32" />
                  <span className="text-sm">4.0</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Room Comfort</span>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="h-2 w-32" />
                  <span className="text-sm">4.2</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Service</span>
                <div className="flex items-center gap-2">
                  <Progress value={95} className="h-2 w-32" />
                  <span className="text-sm">4.8</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Value for money</span>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="h-2 w-32" />
                  <span className="text-sm">4.2</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
