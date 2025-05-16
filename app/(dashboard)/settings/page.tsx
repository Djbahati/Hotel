"use client"

import { useState } from "react"
import {
  Hotel,
  BedDouble,
  CreditCard,
  Bell,
  Users,
  Wrench,
  Save,
  RotateCcw,
  Upload,
  CheckCircle,
  AlertCircle,
  Info,
  Plus,
  Trash2,
  Edit,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [hotelLogo, setHotelLogo] = useState("/placeholder.svg?height=100&width=200")
  const [showAddRoomDialog, setShowAddRoomDialog] = useState(false)
  const [showAddUserDialog, setShowAddUserDialog] = useState(false)

  // Sample room types data
  const [roomTypes, setRoomTypes] = useState([
    { id: 1, name: "Standard Single", basePrice: 99, capacity: 1, amenities: ["Wi-Fi", "TV", "Air Conditioning"] },
    {
      id: 2,
      name: "Standard Double",
      basePrice: 129,
      capacity: 2,
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar"],
    },
    {
      id: 3,
      name: "Deluxe Suite",
      basePrice: 199,
      capacity: 2,
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Jacuzzi", "Ocean View"],
    },
    {
      id: 4,
      name: "Family Room",
      basePrice: 249,
      capacity: 4,
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Connecting Rooms"],
    },
  ])

  // Sample users data
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Manager", status: "Active" },
    { id: 3, name: "Robert Johnson", email: "robert.j@example.com", role: "Staff", status: "Active" },
    { id: 4, name: "Emily Davis", email: "emily.d@example.com", role: "Staff", status: "Inactive" },
  ])

  // Sample payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: "Credit Card", enabled: true, fee: 2.5 },
    { id: 2, name: "PayPal", enabled: true, fee: 3.0 },
    { id: 3, name: "Mobile Money", enabled: true, fee: 1.5 },
    { id: 4, name: "Bank Transfer", enabled: false, fee: 0 },
  ])

  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    hotelName: "OVER SKY HOTEL BAR & RESTAURANT",
    address: "123 Ocean Drive, Beachside, FL 33139",
    phone: "+1 (555) 123-4567",
    email: "info@overskyhotel.com",
    website: "www.overskyhotel.com",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    timezone: "America/New_York",
    currency: "USD",
  })

  // Payment settings state
  const [paymentSettings, setPaymentSettings] = useState({
    taxRate: 8.5,
    depositPercentage: 20,
    allowPartialPayments: true,
    sendPaymentReminders: true,
    reminderDays: 3,
    invoicePrefix: "INV-",
    invoiceFooter: "Thank you for choosing OVER SKY HOTEL BAR & RESTAURANT. We look forward to your visit!",
  })

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    sendBookingConfirmations: true,
    sendCheckInReminders: true,
    sendCheckOutReminders: true,
    sendReviewRequests: true,
    sendMarketingEmails: false,
    emailSender: "notifications@overskyhotel.com",
    smsEnabled: true,
    smsProvider: "Twilio",
  })

  // Advanced settings state
  const [advancedSettings, setAdvancedSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    autoBackup: true,
    backupFrequency: "daily",
    dataRetentionDays: 90,
    sessionTimeout: 30,
  })

  // Handle input changes for general settings
  const handleGeneralInputChange = (e) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
    setUnsavedChanges(true)
  }

  // Handle payment settings changes
  const handlePaymentSettingChange = (name, value) => {
    setPaymentSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
    setUnsavedChanges(true)
  }

  // Handle notification settings changes
  const handleNotificationSettingChange = (name, value) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
    setUnsavedChanges(true)
  }

  // Handle advanced settings changes
  const handleAdvancedSettingChange = (name, value) => {
    setAdvancedSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
    setUnsavedChanges(true)
  }

  // Handle payment method toggle
  const handlePaymentMethodToggle = (id, enabled) => {
    setPaymentMethods((prev) => prev.map((method) => (method.id === id ? { ...method, enabled } : method)))
    setUnsavedChanges(true)
  }

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setHotelLogo(event.target.result)
        setUnsavedChanges(true)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle save settings
  const handleSaveSettings = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setUnsavedChanges(false)

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1500)
  }

  // Handle reset settings
  const handleResetSettings = () => {
    if (window.confirm("Are you sure you want to reset all changes? This cannot be undone.")) {
      // Reset logic would go here
      setUnsavedChanges(false)
    }
  }

  // Handle tab change
  const handleTabChange = (value) => {
    if (unsavedChanges) {
      if (window.confirm("You have unsaved changes. Are you sure you want to leave this tab?")) {
        setActiveTab(value)
      }
    } else {
      setActiveTab(value)
    }
  }

  // Add new room type
  const handleAddRoomType = (newRoom) => {
    setRoomTypes((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...newRoom,
      },
    ])
    setShowAddRoomDialog(false)
    setUnsavedChanges(true)
  }

  // Delete room type
  const handleDeleteRoomType = (id) => {
    if (window.confirm("Are you sure you want to delete this room type? This cannot be undone.")) {
      setRoomTypes((prev) => prev.filter((room) => room.id !== id))
      setUnsavedChanges(true)
    }
  }

  // Add new user
  const handleAddUser = (newUser) => {
    setUsers((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...newUser,
        status: "Active",
      },
    ])
    setShowAddUserDialog(false)
    setUnsavedChanges(true)
  }

  // Delete user
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user? This cannot be undone.")) {
      setUsers((prev) => prev.filter((user) => user.id !== id))
      setUnsavedChanges(true)
    }
  }

  // Toggle user status
  const handleToggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user,
      ),
    )
    setUnsavedChanges(true)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Configure and manage your hotel system settings</p>
        </div>
        <div className="flex items-center gap-4">
          {unsavedChanges && <span className="text-sm text-amber-600">You have unsaved changes</span>}
          <Button variant="outline" onClick={handleResetSettings} disabled={isSaving || !unsavedChanges}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleSaveSettings} disabled={isSaving || !unsavedChanges}>
            {isSaving ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-600">Success</AlertTitle>
          <AlertDescription>Your settings have been saved successfully.</AlertDescription>
        </Alert>
      )}

      <div className="bg-white rounded-lg shadow">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <div className="flex overflow-x-auto">
              <TabsTrigger
                value="general"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Hotel className="mr-2 h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger
                value="rooms"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <BedDouble className="mr-2 h-4 w-4" />
                Rooms
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Payments
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Users className="mr-2 h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Wrench className="mr-2 h-4 w-4" />
                Advanced
              </TabsTrigger>
            </div>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general" className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Hotel Information</CardTitle>
                    <CardDescription>Basic information about your hotel</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hotelName">Hotel Name</Label>
                      <Input
                        id="hotelName"
                        name="hotelName"
                        value={generalSettings.hotelName}
                        onChange={handleGeneralInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={generalSettings.address}
                        onChange={handleGeneralInputChange}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={generalSettings.phone}
                          onChange={handleGeneralInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={generalSettings.email}
                          onChange={handleGeneralInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        value={generalSettings.website}
                        onChange={handleGeneralInputChange}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hotel Logo</CardTitle>
                    <CardDescription>Upload your hotel logo</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-center p-4 border-2 border-dashed rounded-lg">
                      <div className="text-center">
                        <img
                          src={hotelLogo || "/placeholder.svg"}
                          alt="Hotel Logo"
                          className="mx-auto h-32 object-contain mb-4"
                        />
                        <div className="space-y-2">
                          <Button variant="outline" onClick={() => document.getElementById("logo-upload").click()}>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Logo
                          </Button>
                          <input
                            id="logo-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleLogoUpload}
                          />
                          <p className="text-xs text-muted-foreground mt-2">
                            Recommended size: 200x100 pixels. Max file size: 2MB.
                            <br />
                            Supported formats: PNG, JPG, SVG
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Check-in & Check-out</CardTitle>
                  <CardDescription>Configure default check-in and check-out times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="checkInTime">Default Check-in Time</Label>
                      <Input
                        id="checkInTime"
                        name="checkInTime"
                        type="time"
                        value={generalSettings.checkInTime}
                        onChange={handleGeneralInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="checkOutTime">Default Check-out Time</Label>
                      <Input
                        id="checkOutTime"
                        name="checkOutTime"
                        type="time"
                        value={generalSettings.checkOutTime}
                        onChange={handleGeneralInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Settings</CardTitle>
                  <CardDescription>Configure timezone and currency settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={generalSettings.timezone}
                        onValueChange={(value) => {
                          setGeneralSettings((prev) => ({ ...prev, timezone: value }))
                          setUnsavedChanges(true)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                          <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                          <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={generalSettings.currency}
                        onValueChange={(value) => {
                          setGeneralSettings((prev) => ({ ...prev, currency: value }))
                          setUnsavedChanges(true)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">US Dollar ($)</SelectItem>
                          <SelectItem value="EUR">Euro (€)</SelectItem>
                          <SelectItem value="GBP">British Pound (£)</SelectItem>
                          <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                          <SelectItem value="CAD">Canadian Dollar (C$)</SelectItem>
                          <SelectItem value="AUD">Australian Dollar (A$)</SelectItem>
                          <SelectItem value="CNY">Chinese Yuan (¥)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Rooms Tab */}
          <TabsContent value="rooms" className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Room Types</h3>
                <Button onClick={() => setShowAddRoomDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Room Type
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Room Type</TableHead>
                        <TableHead>Base Price</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Amenities</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {roomTypes.map((room) => (
                        <TableRow key={room.id}>
                          <TableCell className="font-medium">{room.name}</TableCell>
                          <TableCell>${room.basePrice}</TableCell>
                          <TableCell>
                            {room.capacity} {room.capacity === 1 ? "person" : "people"}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {room.amenities.slice(0, 3).map((amenity, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                              {room.amenities.length > 3 && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Badge variant="outline" className="text-xs">
                                        +{room.amenities.length - 3} more
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <div className="space-y-1">
                                        {room.amenities.slice(3).map((amenity, index) => (
                                          <div key={index}>{amenity}</div>
                                        ))}
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteRoomType(room.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Room Pricing Rules</CardTitle>
                  <CardDescription>Configure dynamic pricing rules for rooms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="weekendPricing">Weekend Price Adjustment</Label>
                      <span className="text-sm font-medium">+15%</span>
                    </div>
                    <Slider defaultValue={[15]} max={50} step={5} onValueChange={(value) => setUnsavedChanges(true)} />
                    <p className="text-sm text-muted-foreground">
                      Increase room prices on weekends (Friday and Saturday nights)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="seasonalPricing">High Season Price Adjustment</Label>
                      <span className="text-sm font-medium">+25%</span>
                    </div>
                    <Slider defaultValue={[25]} max={100} step={5} onValueChange={(value) => setUnsavedChanges(true)} />
                    <p className="text-sm text-muted-foreground">Increase room prices during high season periods</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Last-Minute Discount</Label>
                      <span className="text-sm font-medium">-10%</span>
                    </div>
                    <Slider defaultValue={[10]} max={30} step={5} onValueChange={(value) => setUnsavedChanges(true)} />
                    <p className="text-sm text-muted-foreground">
                      Discount for bookings made within 48 hours of check-in
                    </p>
                  </div>

                  <Separator />

                  <div className="flex items-center space-x-2">
                    <Checkbox id="enableDynamicPricing" defaultChecked />
                    <Label htmlFor="enableDynamicPricing">Enable dynamic pricing</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Room Availability</CardTitle>
                  <CardDescription>Configure room availability settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="enableBufferTime" defaultChecked />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="enableBufferTime">Enable buffer time between bookings</Label>
                      <p className="text-sm text-muted-foreground">
                        Add a buffer period between guest check-out and new check-in for cleaning
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pl-6">
                    <Label htmlFor="bufferHours">Buffer Hours</Label>
                    <Select defaultValue="3">
                      <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Select hours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="5">5 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center space-x-2">
                    <Checkbox id="enableMinStay" defaultChecked />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="enableMinStay">Enable minimum stay requirement</Label>
                      <p className="text-sm text-muted-foreground">Require guests to book a minimum number of nights</p>
                    </div>
                  </div>

                  <div className="space-y-2 pl-6">
                    <Label htmlFor="minStayNights">Minimum Nights</Label>
                    <Select defaultValue="2">
                      <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Select nights" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 night</SelectItem>
                        <SelectItem value="2">2 nights</SelectItem>
                        <SelectItem value="3">3 nights</SelectItem>
                        <SelectItem value="4">4 nights</SelectItem>
                        <SelectItem value="5">5 nights</SelectItem>
                        <SelectItem value="7">7 nights</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Add Room Type Dialog */}
            <Dialog open={showAddRoomDialog} onOpenChange={setShowAddRoomDialog}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Room Type</DialogTitle>
                  <DialogDescription>Create a new room type with pricing and amenities</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="newRoomName">Room Type Name</Label>
                    <Input id="newRoomName" placeholder="e.g. Deluxe King" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newRoomPrice">Base Price ($)</Label>
                      <Input id="newRoomPrice" type="number" placeholder="149" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newRoomCapacity">Capacity</Label>
                      <Select defaultValue="2">
                        <SelectTrigger>
                          <SelectValue placeholder="Select capacity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 person</SelectItem>
                          <SelectItem value="2">2 people</SelectItem>
                          <SelectItem value="3">3 people</SelectItem>
                          <SelectItem value="4">4 people</SelectItem>
                          <SelectItem value="5">5 people</SelectItem>
                          <SelectItem value="6">6+ people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Amenities</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="amenity-wifi" defaultChecked />
                        <Label htmlFor="amenity-wifi">Wi-Fi</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="amenity-tv" defaultChecked />
                        <Label htmlFor="amenity-tv">TV</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="amenity-ac" defaultChecked />
                        <Label htmlFor="amenity-ac">Air Conditioning</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="amenity-minibar" />
                        <Label htmlFor="amenity-minibar">Mini Bar</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="amenity-safe" />
                        <Label htmlFor="amenity-safe">Safe</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="amenity-balcony" />
                        <Label htmlFor="amenity-balcony">Balcony</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="amenity-jacuzzi" />
                        <Label htmlFor="amenity-jacuzzi">Jacuzzi</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="amenity-oceanview" />
                        <Label htmlFor="amenity-oceanview">Ocean View</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newRoomDescription">Description</Label>
                    <Textarea id="newRoomDescription" placeholder="Enter room description..." rows={3} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddRoomDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() =>
                      handleAddRoomType({
                        name: "Deluxe King",
                        basePrice: 179,
                        capacity: 2,
                        amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Safe"],
                      })
                    }
                  >
                    Add Room Type
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="p-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Configure accepted payment methods and processing fees</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Processing Fee</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentMethods.map((method) => (
                        <TableRow key={method.id}>
                          <TableCell className="font-medium">{method.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={method.enabled}
                                onCheckedChange={(checked) => handlePaymentMethodToggle(method.id, checked)}
                              />
                              <span className={method.enabled ? "text-green-600" : "text-gray-400"}>
                                {method.enabled ? "Enabled" : "Disabled"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{method.fee}%</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Configure
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tax & Fees</CardTitle>
                  <CardDescription>Configure tax rates and additional fees</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="taxRate">Tax Rate (%)</Label>
                      <Input
                        id="taxRate"
                        type="number"
                        value={paymentSettings.taxRate}
                        onChange={(e) => handlePaymentSettingChange("taxRate", Number.parseFloat(e.target.value))}
                      />
                      <p className="text-sm text-muted-foreground">Applied to all bookings and services</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="depositPercentage">Deposit Percentage (%)</Label>
                      <Input
                        id="depositPercentage"
                        type="number"
                        value={paymentSettings.depositPercentage}
                        onChange={(e) =>
                          handlePaymentSettingChange("depositPercentage", Number.parseInt(e.target.value))
                        }
                      />
                      <p className="text-sm text-muted-foreground">Required deposit amount for reservations</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allowPartialPayments"
                      checked={paymentSettings.allowPartialPayments}
                      onCheckedChange={(checked) => handlePaymentSettingChange("allowPartialPayments", checked)}
                    />
                    <Label htmlFor="allowPartialPayments">Allow partial payments</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Invoice Settings</CardTitle>
                  <CardDescription>Configure invoice generation and reminders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="invoicePrefix">Invoice Number Prefix</Label>
                      <Input
                        id="invoicePrefix"
                        value={paymentSettings.invoicePrefix}
                        onChange={(e) => handlePaymentSettingChange("invoicePrefix", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sendPaymentReminders"
                          checked={paymentSettings.sendPaymentReminders}
                          onCheckedChange={(checked) => handlePaymentSettingChange("sendPaymentReminders", checked)}
                        />
                        <Label htmlFor="sendPaymentReminders">Send payment reminders</Label>
                      </div>

                      {paymentSettings.sendPaymentReminders && (
                        <div className="pt-2">
                          <Label htmlFor="reminderDays">Days before due date</Label>
                          <Select
                            value={paymentSettings.reminderDays.toString()}
                            onValueChange={(value) =>
                              handlePaymentSettingChange("reminderDays", Number.parseInt(value))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select days" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 day</SelectItem>
                              <SelectItem value="2">2 days</SelectItem>
                              <SelectItem value="3">3 days</SelectItem>
                              <SelectItem value="5">5 days</SelectItem>
                              <SelectItem value="7">7 days</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="invoiceFooter">Invoice Footer Text</Label>
                    <Textarea
                      id="invoiceFooter"
                      value={paymentSettings.invoiceFooter}
                      onChange={(e) => handlePaymentSettingChange("invoiceFooter", e.target.value)}
                      rows={3}
                    />
                    <p className="text-sm text-muted-foreground">This text will appear at the bottom of all invoices</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="p-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Configure automated email notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sendBookingConfirmations">Booking Confirmations</Label>
                        <p className="text-sm text-muted-foreground">Send confirmation emails when bookings are made</p>
                      </div>
                      <Switch
                        id="sendBookingConfirmations"
                        checked={notificationSettings.sendBookingConfirmations}
                        onCheckedChange={(checked) =>
                          handleNotificationSettingChange("sendBookingConfirmations", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sendCheckInReminders">Check-in Reminders</Label>
                        <p className="text-sm text-muted-foreground">Send reminder emails before guest check-in</p>
                      </div>
                      <Switch
                        id="sendCheckInReminders"
                        checked={notificationSettings.sendCheckInReminders}
                        onCheckedChange={(checked) => handleNotificationSettingChange("sendCheckInReminders", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sendCheckOutReminders">Check-out Reminders</Label>
                        <p className="text-sm text-muted-foreground">Send reminder emails before guest check-out</p>
                      </div>
                      <Switch
                        id="sendCheckOutReminders"
                        checked={notificationSettings.sendCheckOutReminders}
                        onCheckedChange={(checked) => handleNotificationSettingChange("sendCheckOutReminders", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sendReviewRequests">Review Requests</Label>
                        <p className="text-sm text-muted-foreground">Send emails requesting reviews after check-out</p>
                      </div>
                      <Switch
                        id="sendReviewRequests"
                        checked={notificationSettings.sendReviewRequests}
                        onCheckedChange={(checked) => handleNotificationSettingChange("sendReviewRequests", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sendMarketingEmails">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Send promotional emails and special offers</p>
                      </div>
                      <Switch
                        id="sendMarketingEmails"
                        checked={notificationSettings.sendMarketingEmails}
                        onCheckedChange={(checked) => handleNotificationSettingChange("sendMarketingEmails", checked)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="emailSender">Email Sender Address</Label>
                    <Input
                      id="emailSender"
                      value={notificationSettings.emailSender}
                      onChange={(e) => handleNotificationSettingChange("emailSender", e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      This email address will be used as the sender for all notifications
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SMS Notifications</CardTitle>
                  <CardDescription>Configure SMS text message notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="smsEnabled">Enable SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send notifications via text message</p>
                    </div>
                    <Switch
                      id="smsEnabled"
                      checked={notificationSettings.smsEnabled}
                      onCheckedChange={(checked) => handleNotificationSettingChange("smsEnabled", checked)}
                    />
                  </div>

                  {notificationSettings.smsEnabled && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="smsProvider">SMS Provider</Label>
                        <Select
                          value={notificationSettings.smsProvider}
                          onValueChange={(value) => handleNotificationSettingChange("smsProvider", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Twilio">Twilio</SelectItem>
                            <SelectItem value="Nexmo">Nexmo</SelectItem>
                            <SelectItem value="MessageBird">MessageBird</SelectItem>
                            <SelectItem value="AWS SNS">AWS SNS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Alert variant="outline" className="bg-blue-50 border-blue-200">
                        <Info className="h-4 w-4 text-blue-600" />
                        <AlertTitle className="text-blue-600">API Configuration Required</AlertTitle>
                        <AlertDescription>
                          You need to configure your SMS provider API credentials in the Integrations section.
                        </AlertDescription>
                      </Alert>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Templates</CardTitle>
                  <CardDescription>Customize email and SMS notification templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Select defaultValue="booking_confirmation">
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booking_confirmation">Booking Confirmation</SelectItem>
                        <SelectItem value="checkin_reminder">Check-in Reminder</SelectItem>
                        <SelectItem value="checkout_reminder">Check-out Reminder</SelectItem>
                        <SelectItem value="payment_receipt">Payment Receipt</SelectItem>
                        <SelectItem value="review_request">Review Request</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="space-y-2">
                      <Label htmlFor="templateSubject">Email Subject</Label>
                      <Input id="templateSubject" defaultValue="Your Booking Confirmation - OVER SKY HOTEL" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="templateContent">Email Content</Label>
                      <Textarea
                        id="templateContent"
                        rows={8}
                        defaultValue={`Dear {{guest_name}},

Thank you for booking with OVER SKY HOTEL BAR & RESTAURANT. Your reservation has been confirmed.

Booking Details:
- Confirmation Number: {{booking_id}}
- Check-in Date: {{checkin_date}}
- Check-out Date: {{checkout_date}}
- Room Type: {{room_type}}
- Number of Guests: {{guest_count}}

If you have any questions or special requests, please don't hesitate to contact us.

We look forward to welcoming you!

Best regards,
The OVER SKY HOTEL Team`}
                      />
                      <p className="text-sm text-muted-foreground">Use {`{{variable_name}}`} for dynamic content</p>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Reset to Default</Button>
                      <Button>Save Template</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">User Management</h3>
                <Button onClick={() => setShowAddUserDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.role === "Admin" ? "default" : user.role === "Manager" ? "secondary" : "outline"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={user.status === "Active" ? "outline" : "secondary"}
                              className={user.status === "Active" ? "bg-green-50 text-green-600 border-green-200" : ""}
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleToggleUserStatus(user.id)}>
                                {user.status === "Active" ? (
                                  <Lock className="h-4 w-4" />
                                ) : (
                                  <CheckCircle className="h-4 w-4" />
                                )}
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Roles & Permissions</CardTitle>
                  <CardDescription>Configure access levels and permissions for different user roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="admin">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="admin">Admin</TabsTrigger>
                      <TabsTrigger value="manager">Manager</TabsTrigger>
                      <TabsTrigger value="staff">Staff</TabsTrigger>
                    </TabsList>
                    <TabsContent value="admin" className="space-y-4 pt-4">
                      <p className="text-sm text-muted-foreground">
                        Administrators have full access to all system features and settings.
                      </p>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {["Dashboard", "Rooms", "Bookings", "Guests", "Billing", "Reports", "Settings", "Users"].map(
                            (module) => (
                              <div key={module} className="flex items-center justify-between border p-3 rounded-lg">
                                <span>{module}</span>
                                <Badge>Full Access</Badge>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="manager" className="space-y-4 pt-4">
                      <p className="text-sm text-muted-foreground">
                        Managers have access to most operational features but limited access to system settings.
                      </p>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { name: "Dashboard", access: "Full Access" },
                            { name: "Rooms", access: "Full Access" },
                            { name: "Bookings", access: "Full Access" },
                            { name: "Guests", access: "Full Access" },
                            { name: "Billing", access: "Full Access" },
                            { name: "Reports", access: "View Only" },
                            { name: "Settings", access: "Limited" },
                            { name: "Users", access: "No Access" },
                          ].map((module) => (
                            <div key={module.name} className="flex items-center justify-between border p-3 rounded-lg">
                              <span>{module.name}</span>
                              <Badge
                                variant={
                                  module.access === "Full Access"
                                    ? "default"
                                    : module.access === "View Only"
                                      ? "secondary"
                                      : module.access === "Limited"
                                        ? "outline"
                                        : "secondary"
                                }
                                className={module.access === "No Access" ? "bg-red-50 text-red-600 border-red-200" : ""}
                              >
                                {module.access}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="staff" className="space-y-4 pt-4">
                      <p className="text-sm text-muted-foreground">
                        Staff members have limited access focused on day-to-day operations.
                      </p>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { name: "Dashboard", access: "Limited" },
                            { name: "Rooms", access: "View Only" },
                            { name: "Bookings", access: "Limited" },
                            { name: "Guests", access: "Limited" },
                            { name: "Billing", access: "Limited" },
                            { name: "Reports", access: "No Access" },
                            { name: "Settings", access: "No Access" },
                            { name: "Users", access: "No Access" },
                          ].map((module) => (
                            <div key={module.name} className="flex items-center justify-between border p-3 rounded-lg">
                              <span>{module.name}</span>
                              <Badge
                                variant={
                                  module.access === "Full Access"
                                    ? "default"
                                    : module.access === "View Only"
                                      ? "secondary"
                                      : module.access === "Limited"
                                        ? "outline"
                                        : "secondary"
                                }
                                className={module.access === "No Access" ? "bg-red-50 text-red-600 border-red-200" : ""}
                              >
                                {module.access}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure security policies for user accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require all users to set up 2FA for their accounts
                      </p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>

                  <div className="space-y-2">
                    <Label>Password Policy</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="policy-length" defaultChecked />
                        <Label htmlFor="policy-length">Minimum 8 characters</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="policy-uppercase" defaultChecked />
                        <Label htmlFor="policy-uppercase">Require uppercase letters</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="policy-number" defaultChecked />
                        <Label htmlFor="policy-number">Require numbers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="policy-special" defaultChecked />
                        <Label htmlFor="policy-special">Require special characters</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Password Expiry</Label>
                    <Select defaultValue="90">
                      <SelectTrigger>
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Never</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loginAttempts">Failed Login Attempts Before Lockout</Label>
                    <Select defaultValue="5">
                      <SelectTrigger>
                        <SelectValue placeholder="Select attempts" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                        <SelectItem value="10">10 attempts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Add User Dialog */}
            <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Create a new user account with role and permissions</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newUserFirstName">First Name</Label>
                      <Input id="newUserFirstName" placeholder="John" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newUserLastName">Last Name</Label>
                      <Input id="newUserLastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newUserEmail">Email Address</Label>
                    <Input id="newUserEmail" type="email" placeholder="john.doe@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newUserRole">Role</Label>
                    <Select defaultValue="staff">
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="newUserPassword">Temporary Password</Label>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                        Generate
                      </Button>
                    </div>
                    <Input id="newUserPassword" type="password" />
                    <p className="text-sm text-muted-foreground">
                      User will be prompted to change password on first login
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="sendWelcomeEmail" defaultChecked />
                    <Label htmlFor="sendWelcomeEmail">Send welcome email with login instructions</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() =>
                      handleAddUser({
                        name: "New User",
                        email: "new.user@example.com",
                        role: "Staff",
                      })
                    }
                  >
                    Add User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="p-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Maintenance</CardTitle>
                  <CardDescription>Configure system maintenance and backup settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Put the system in maintenance mode (only admins can access)
                      </p>
                    </div>
                    <Switch
                      id="maintenanceMode"
                      checked={advancedSettings.maintenanceMode}
                      onCheckedChange={(checked) => handleAdvancedSettingChange("maintenanceMode", checked)}
                    />
                  </div>

                  {advancedSettings.maintenanceMode && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>
                        Maintenance mode will prevent all non-admin users from accessing the system.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoBackup">Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">Automatically backup system data</p>
                    </div>
                    <Switch
                      id="autoBackup"
                      checked={advancedSettings.autoBackup}
                      onCheckedChange={(checked) => handleAdvancedSettingChange("autoBackup", checked)}
                    />
                  </div>

                  {advancedSettings.autoBackup && (
                    <div className="space-y-2 pl-6">
                      <Label htmlFor="backupFrequency">Backup Frequency</Label>
                      <Select
                        value={advancedSettings.backupFrequency}
                        onValueChange={(value) => handleAdvancedSettingChange("backupFrequency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap gap-2">
                    <Button variant="outline">Backup Now</Button>
                    <Button variant="outline">Restore from Backup</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Configure data retention and cleanup settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dataRetentionDays">Data Retention Period (days)</Label>
                    <Input
                      id="dataRetentionDays"
                      type="number"
                      value={advancedSettings.dataRetentionDays}
                      onChange={(e) =>
                        handleAdvancedSettingChange("dataRetentionDays", Number.parseInt(e.target.value))
                      }
                    />
                    <p className="text-sm text-muted-foreground">
                      Automatically delete logs and temporary data older than this many days
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button variant="outline">Clear Cache</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Integration</CardTitle>
                  <CardDescription>Configure third-party service integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border p-3 rounded-lg">
                      <div>
                        <h4 className="font-medium">Payment Gateway</h4>
                        <p className="text-sm text-muted-foreground">Stripe</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        Connected
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between border p-3 rounded-lg">
                      <div>
                        <h4 className="font-medium">Email Service</h4>
                        <p className="text-sm text-muted-foreground">SendGrid</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        Connected
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between border p-3 rounded-lg">
                      <div>
                        <h4 className="font-medium">SMS Provider</h4>
                        <p className="text-sm text-muted-foreground">Twilio</p>
                      </div>
                      <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                        Needs Configuration
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between border p-3 rounded-lg">
                      <div>
                        <h4 className="font-medium">Booking Channel</h4>
                        <p className="text-sm text-muted-foreground">Booking.com</p>
                      </div>
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                        Disconnected
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button>Manage Integrations</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>Additional system configuration options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="debugMode">Debug Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable detailed error logging for troubleshooting</p>
                    </div>
                    <Switch
                      id="debugMode"
                      checked={advancedSettings.debugMode}
                      onCheckedChange={(checked) => handleAdvancedSettingChange("debugMode", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={advancedSettings.sessionTimeout}
                      onChange={(e) => handleAdvancedSettingChange("sessionTimeout", Number.parseInt(e.target.value))}
                    />
                    <p className="text-sm text-muted-foreground">
                      Automatically log out inactive users after this many minutes
                    </p>
                  </div>

                  <Alert variant="outline" className="bg-amber-50 border-amber-200">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-600">Advanced Settings</AlertTitle>
                    <AlertDescription className="text-amber-600">
                      These settings should only be modified by system administrators. Incorrect configuration may
                      affect system performance.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
