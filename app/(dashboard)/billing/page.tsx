"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Plus,
  Download,
  Printer,
  MoreHorizontal,
  CreditCard,
  DollarSign,
  Clock,
  Calendar,
  ArrowUp,
  AlertCircle,
  FileText,
  CheckCircle,
  XCircle,
  BarChart,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import {
  Bar,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function BillingSystemPage() {
  const [activeTab, setActiveTab] = useState("invoices")
  const { toast } = useToast()

  // Sample data for invoices
  const invoices = [
    {
      id: "INV-2023-001",
      guest: "John Smith",
      date: "Aug 2, 2023",
      amount: "$1,250",
      status: "Paid",
      items: [
        { description: "Room Charges (2 nights)", amount: "$800" },
        { description: "Food & Beverages", amount: "$350" },
        { description: "Bar Services", amount: "$100" },
      ],
      paymentMethod: "Credit Card",
    },
    {
      id: "INV-2023-002",
      guest: "Sarah Johnson",
      date: "Aug 1, 2023",
      amount: "$2,500",
      status: "Pending",
      items: [
        { description: "Room Charges (4 nights)", amount: "$1,600" },
        { description: "Food & Beverages", amount: "$600" },
        { description: "Bar Services", amount: "$300" },
      ],
      paymentMethod: "PayPal",
    },
    {
      id: "INV-2023-003",
      guest: "Michael Chen",
      date: "Jul 30, 2023",
      amount: "$950",
      status: "Paid",
      items: [
        { description: "Room Charges (1 night)", amount: "$450" },
        { description: "Food & Beverages", amount: "$300" },
        { description: "Bar Services", amount: "$200" },
      ],
      paymentMethod: "Mobile Money",
    },
    {
      id: "INV-2023-004",
      guest: "Emma Wilson",
      date: "Jul 29, 2023",
      amount: "$1,800",
      status: "Overdue",
      items: [
        { description: "Room Charges (3 nights)", amount: "$1,350" },
        { description: "Food & Beverages", amount: "$250" },
        { description: "Bar Services", amount: "$200" },
      ],
      paymentMethod: "Credit Card",
    },
  ]

  // Sample data for product sales
  const productSales = [
    {
      id: 1,
      room: "301",
      foodType: "Dinner",
      drink: "Wine",
      quantity: 2,
      unitPrice: "$25",
      total: "$50",
      date: "Aug 2, 2023",
      paymentStatus: "Paid",
      stockRemaining: 15,
    },
    {
      id: 2,
      room: "205",
      foodType: "Lunch",
      drink: "Soda",
      quantity: 3,
      unitPrice: "$5",
      total: "$15",
      date: "Aug 2, 2023",
      paymentStatus: "Paid",
      stockRemaining: 42,
    },
    {
      id: 3,
      room: "410",
      foodType: "Breakfast",
      drink: "Coffee",
      quantity: 2,
      unitPrice: "$4",
      total: "$8",
      date: "Aug 2, 2023",
      paymentStatus: "Pending",
      stockRemaining: 3,
    },
    {
      id: 4,
      room: "512",
      foodType: "Dinner",
      drink: "Whiskey",
      quantity: 1,
      unitPrice: "$30",
      total: "$30",
      date: "Aug 1, 2023",
      paymentStatus: "Paid",
      stockRemaining: 8,
    },
    {
      id: 5,
      room: "302",
      foodType: "Room Service",
      drink: "Beer",
      quantity: 4,
      unitPrice: "$8",
      total: "$32",
      date: "Aug 1, 2023",
      paymentStatus: "Paid",
      stockRemaining: 24,
    },
  ]

  // Sample data for charts
  const revenueData = [
    { name: "Mon", room: 1200, food: 400, bar: 200 },
    { name: "Tue", room: 1500, food: 600, bar: 300 },
    { name: "Wed", room: 1300, food: 500, bar: 400 },
    { name: "Thu", room: 1400, food: 550, bar: 250 },
    { name: "Fri", room: 1800, food: 700, bar: 500 },
    { name: "Sat", room: 2200, food: 900, bar: 700 },
    { name: "Sun", room: 1900, food: 800, bar: 600 },
  ]

  const paymentMethodData = [
    { name: "Credit Card", value: 65 },
    { name: "Mobile Money", value: 20 },
    { name: "PayPal", value: 10 },
    { name: "Cash", value: 5 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const handleCreateInvoice = () => {
    toast({
      title: "Invoice Created",
      description: "New invoice has been successfully created.",
    })
  }

  const handlePaymentReceived = (id: string) => {
    toast({
      title: "Payment Received",
      description: `Payment for invoice ${id} has been marked as received.`,
    })
  }

  const handleSendReminder = (id: string) => {
    toast({
      title: "Reminder Sent",
      description: `Payment reminder for invoice ${id} has been sent to the guest.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Billing System</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                New Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription>
                  Create a new invoice for a guest. Fill in all the required details.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="guest" className="text-right">
                    Guest
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select guest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="michael">Michael Chen</SelectItem>
                      <SelectItem value="emma">Emma Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="room" className="text-right">
                    Room
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="301">301 - Deluxe King</SelectItem>
                      <SelectItem value="205">205 - Queen Suite</SelectItem>
                      <SelectItem value="410">410 - Deluxe Twin</SelectItem>
                      <SelectItem value="512">512 - Executive Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input id="date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="payment-method" className="text-right">
                    Payment Method
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="mobile-money">Mobile Money</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right pt-2">Items</Label>
                  <div className="col-span-3 space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <Input placeholder="Description" />
                      <Input placeholder="Quantity" type="number" />
                      <Input placeholder="Amount" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Input placeholder="Description" />
                      <Input placeholder="Quantity" type="number" />
                      <Input placeholder="Amount" />
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="total" className="text-right">
                    Total Amount
                  </Label>
                  <Input id="total" type="text" placeholder="$0.00" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="notes" className="text-right pt-2">
                    Notes
                  </Label>
                  <Textarea id="notes" placeholder="Invoice notes" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateInvoice}>Create Invoice</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-50 p-3 rounded-full mr-4">
              <CreditCard className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <h3 className="text-2xl font-bold">$12,500</h3>
              <p className="text-xs text-green-600">+12% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-50 p-3 rounded-full mr-4">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Paid Invoices</p>
              <h3 className="text-2xl font-bold">$9,850</h3>
              <p className="text-xs text-green-600">78% of total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-amber-50 p-3 rounded-full mr-4">
              <Clock className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Payments</p>
              <h3 className="text-2xl font-bold">$2,650</h3>
              <p className="text-xs text-amber-600">22% of total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="product-sales" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Product Sales
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by invoice ID, guest name or amount"
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
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-base font-medium">Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.guest}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell>
                          {invoice.status === "Paid" ? (
                            <Badge variant="success" className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" /> Paid
                            </Badge>
                          ) : invoice.status === "Pending" ? (
                            <Badge variant="warning" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> Pending
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> Overdue
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>
                                <Printer className="h-4 w-4 mr-2" />
                                Print
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {invoice.status !== "Paid" ? (
                                <DropdownMenuItem onClick={() => handlePaymentReceived(invoice.id)}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark as Paid
                                </DropdownMenuItem>
                              ) : null}
                              {invoice.status !== "Paid" ? (
                                <DropdownMenuItem onClick={() => handleSendReminder(invoice.id)}>
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Send Reminder
                                </DropdownMenuItem>
                              ) : null}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="product-sales" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by room, food type or drink"
                className="pl-10 pr-4 py-2 w-full md:w-[400px]"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
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
              <CardTitle className="text-base font-medium">Income and Product Sales</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room</TableHead>
                      <TableHead>Food Type</TableHead>
                      <TableHead>Drink</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead>Stock Remaining</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell>{sale.room}</TableCell>
                        <TableCell>{sale.foodType}</TableCell>
                        <TableCell>{sale.drink}</TableCell>
                        <TableCell>{sale.quantity}</TableCell>
                        <TableCell>{sale.unitPrice}</TableCell>
                        <TableCell>{sale.total}</TableCell>
                        <TableCell>{sale.date}</TableCell>
                        <TableCell>
                          {sale.paymentStatus === "Paid" ? (
                            <Badge variant="success">Paid</Badge>
                          ) : (
                            <Badge variant="warning">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="mr-2">{sale.stockRemaining}</span>
                            {sale.stockRemaining <= 5 && (
                              <Badge variant="destructive" className="flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> Low Stock
                              </Badge>
                            )}
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

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-base font-medium">Weekly Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="room" stackId="a" fill="#3b82f6" name="Room" />
                      <Bar dataKey="food" stackId="a" fill="#10b981" name="Food" />
                      <Bar dataKey="bar" stackId="a" fill="#f59e0b" name="Bar" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center mt-4 space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">Room</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">Food</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                    <span className="text-sm">Bar</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-base font-medium">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentMethodData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {paymentMethodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center mt-4 gap-4">
                  {paymentMethodData.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-sm">
                        {entry.name}: {entry.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-base font-medium">Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Total Revenue</h3>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold">$45,250</p>
                    <Badge variant="success" className="ml-2 flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      15%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Compared to $39,350 last month</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Total Expenses</h3>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold">$18,100</p>
                    <Badge variant="destructive" className="ml-2 flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      8%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Compared to $16,750 last month</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Net Profit</h3>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold">$27,150</p>
                    <Badge variant="success" className="ml-2 flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      20%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Compared to $22,600 last month</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Top Selling Items</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Executive Suite</span>
                      <span className="text-sm font-medium">$12,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Dinner Service</span>
                      <span className="text-sm font-medium">$8,200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Premium Wine</span>
                      <span className="text-sm font-medium">$5,800</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Deluxe King Room</span>
                      <span className="text-sm font-medium">$4,500</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Low Stock Alerts</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Premium Whiskey</span>
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <XCircle className="h-3 w-3" /> 2 left
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Coffee Beans</span>
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <XCircle className="h-3 w-3" /> 3 left
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Champagne</span>
                      <Badge variant="warning" className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> 5 left
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Imported Beer</span>
                      <Badge variant="warning" className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> 8 left
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
