"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon, FileText, User, Home, Clock, CheckCircle, Pen, Camera, Upload, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data for available rooms
const availableRooms = [
  { id: 101, type: "Standard", floor: 1, price: 100, status: "Available" },
  { id: 102, type: "Standard", floor: 1, price: 100, status: "Available" },
  { id: 201, type: "Deluxe", floor: 2, price: 150, status: "Available" },
  { id: 202, type: "Deluxe", floor: 2, price: 150, status: "Available" },
  { id: 301, type: "Suite", floor: 3, price: 250, status: "Available" },
  { id: 302, type: "Suite", floor: 3, price: 250, status: "Available" },
  { id: 401, type: "Executive", floor: 4, price: 350, status: "Available" },
  { id: 402, type: "Executive", floor: 4, price: 350, status: "Available" },
  { id: 501, type: "Presidential", floor: 5, price: 500, status: "Available" },
]

// Mock data for countries
const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "India",
  "Brazil",
  "South Africa",
  "Nigeria",
  "Kenya",
  "Ghana",
  "Other",
]

// Mock data for ID types
const idTypes = ["Passport", "National ID Card", "Driver's License", "Residence Permit", "Other"]

// Mock data for payment methods
const paymentMethods = ["Credit Card", "Debit Card", "Cash", "Mobile Money", "Bank Transfer", "PayPal"]

export default function RegistrationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formStep, setFormStep] = useState(1)
  const [formProgress, setFormProgress] = useState(20)
  const [signatureMode, setSignatureMode] = useState<"draw" | "type" | "upload">("draw")
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    // Personal Information
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    // ID Information
    idType: "",
    idNumber: "",
    idExpiryDate: undefined as Date | undefined,

    // Stay Information
    checkInDate: new Date(),
    checkOutDate: undefined as Date | undefined,
    numberOfGuests: "1",
    purpose: "leisure",

    // Room Information
    roomNumber: "",
    roomType: "",
    roomRate: "",

    // Additional Information
    specialRequests: "",
    dietaryRestrictions: "",
    emergencyContactName: "",
    emergencyContactPhone: "",

    // Payment Information
    paymentMethod: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    cardholderName: "",

    // Terms and Consent
    termsAccepted: false,
    privacyAccepted: false,
    marketingConsent: false,

    // Signature
    signature: "",
  })

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // If room number is selected, update room type and rate
    if (name === "roomNumber") {
      const selectedRoom = availableRooms.find((room) => room.id.toString() === value)
      if (selectedRoom) {
        setFormData((prev) => ({
          ...prev,
          roomType: selectedRoom.type,
          roomRate: selectedRoom.price.toString(),
        }))
      }
    }
  }

  // Handle checkbox change
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  // Handle date change
  const handleDateChange = (name: string, date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, [name]: date }))
  }

  // Navigate to next step
  const nextStep = () => {
    const newStep = formStep + 1
    setFormStep(newStep)
    setFormProgress(newStep * 20)
  }

  // Navigate to previous step
  const prevStep = () => {
    const newStep = formStep - 1
    setFormStep(newStep)
    setFormProgress(newStep * 20)
  }

  // Calculate stay duration
  const calculateStayDuration = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0

    const diffTime = formData.checkOutDate.getTime() - formData.checkInDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  // Calculate total cost
  const calculateTotalCost = () => {
    const duration = calculateStayDuration()
    const rate = Number.parseFloat(formData.roomRate) || 0
    return duration * rate
  }

  // Validate current step
  const validateStep = () => {
    switch (formStep) {
      case 1: // Personal Information
        return formData.firstName && formData.lastName && formData.email && formData.phone && formData.country
      case 2: // ID Information
        return formData.idType && formData.idNumber
      case 3: // Stay Information
        return formData.checkInDate && formData.checkOutDate && formData.numberOfGuests && formData.purpose
      case 4: // Room and Payment
        return formData.roomNumber && formData.paymentMethod
      case 5: // Terms and Signature
        return formData.termsAccepted && formData.privacyAccepted && formData.signature
      default:
        return false
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real application, you would send the form data to your backend
    console.log("Form submitted:", formData)

    // Show success dialog
    setShowSuccessDialog(true)

    // Show toast notification
    toast({
      title: "Registration Successful",
      description: `Guest ${formData.firstName} ${formData.lastName} has been registered successfully.`,
    })
  }

  // Handle print registration
  const handlePrintRegistration = () => {
    // In a real application, you would generate a PDF and print it
    window.print()
  }

  // Handle new registration
  const handleNewRegistration = () => {
    // Reset form data and go back to step 1
    setFormData({
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      nationality: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      idType: "",
      idNumber: "",
      idExpiryDate: undefined,
      checkInDate: new Date(),
      checkOutDate: undefined,
      numberOfGuests: "1",
      purpose: "leisure",
      roomNumber: "",
      roomType: "",
      roomRate: "",
      specialRequests: "",
      dietaryRestrictions: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      paymentMethod: "",
      cardNumber: "",
      cardExpiry: "",
      cardCVC: "",
      cardholderName: "",
      termsAccepted: false,
      privacyAccepted: false,
      marketingConsent: false,
      signature: "",
    })
    setFormStep(1)
    setFormProgress(20)
    setShowSuccessDialog(false)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Guest Registration</h1>
        <p className="text-muted-foreground">Register new guests for check-in</p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Registration Progress</span>
          <span className="text-sm font-medium">{formProgress}%</span>
        </div>
        <Progress value={formProgress} className="h-2" />
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {formStep === 1 && "Personal Information"}
                      {formStep === 2 && "Identification"}
                      {formStep === 3 && "Stay Details"}
                      {formStep === 4 && "Room & Payment"}
                      {formStep === 5 && "Terms & Signature"}
                    </CardTitle>
                    <CardDescription>
                      {formStep === 1 && "Enter guest's personal details"}
                      {formStep === 2 && "Verify guest's identity"}
                      {formStep === 3 && "Specify check-in and check-out dates"}
                      {formStep === 4 && "Assign room and collect payment"}
                      {formStep === 5 && "Review terms and sign registration"}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    Step {formStep} of 5
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                {/* Step 1: Personal Information */}
                {formStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Select value={formData.title} onValueChange={(value) => handleSelectChange("title", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mr">Mr.</SelectItem>
                            <SelectItem value="mrs">Mrs.</SelectItem>
                            <SelectItem value="ms">Ms.</SelectItem>
                            <SelectItem value="dr">Dr.</SelectItem>
                            <SelectItem value="prof">Prof.</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="firstName" className="required">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="required">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="required">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="required">
                          Phone Number
                        </Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="nationality">Nationality</Label>
                      <Select
                        value={formData.nationality}
                        onValueChange={(value) => handleSelectChange("nationality", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country.toLowerCase()}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" name="address" value={formData.address} onChange={handleInputChange} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="state">State/Province</Label>
                        <Input id="state" name="state" value={formData.state} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">Zip/Postal Code</Label>
                        <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country" className="required">
                        Country
                      </Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => handleSelectChange("country", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country.toLowerCase()}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 2: Identification */}
                {formStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="idType" className="required">
                        ID Type
                      </Label>
                      <Select
                        value={formData.idType}
                        onValueChange={(value) => handleSelectChange("idType", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                        <SelectContent>
                          {idTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="idNumber" className="required">
                        ID Number
                      </Label>
                      <Input
                        id="idNumber"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="idExpiryDate">ID Expiry Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.idExpiryDate ? format(formData.idExpiryDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.idExpiryDate}
                            onSelect={(date) => handleDateChange("idExpiryDate", date)}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>ID Document Scan</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-md p-4 text-center">
                          <div className="mb-2">Front Side</div>
                          <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                          </div>
                        </div>
                        <div className="border rounded-md p-4 text-center">
                          <div className="mb-2">Back Side</div>
                          <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Accepted formats: JPG, PNG, PDF. Max size: 5MB.</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Take Photo</Label>
                      <div className="border rounded-md p-4 flex flex-col items-center justify-center">
                        <div className="bg-muted rounded-md w-full aspect-video flex items-center justify-center mb-4">
                          <Camera className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <Button variant="outline" type="button">
                          <Camera className="mr-2 h-4 w-4" />
                          Capture Photo
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Stay Details */}
                {formStep === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="checkInDate" className="required">
                          Check-in Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.checkInDate ? format(formData.checkInDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.checkInDate}
                              onSelect={(date) => handleDateChange("checkInDate", date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="checkOutDate" className="required">
                          Check-out Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.checkOutDate ? format(formData.checkOutDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.checkOutDate}
                              onSelect={(date) => handleDateChange("checkOutDate", date)}
                              initialFocus
                              disabled={(date) =>
                                date < new Date() || (formData.checkInDate ? date <= formData.checkInDate : false)
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="numberOfGuests" className="required">
                          Number of Guests
                        </Label>
                        <Select
                          value={formData.numberOfGuests}
                          onValueChange={(value) => handleSelectChange("numberOfGuests", value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Guest</SelectItem>
                            <SelectItem value="2">2 Guests</SelectItem>
                            <SelectItem value="3">3 Guests</SelectItem>
                            <SelectItem value="4">4 Guests</SelectItem>
                            <SelectItem value="5">5 Guests</SelectItem>
                            <SelectItem value="6+">6+ Guests</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="purpose" className="required">
                          Purpose of Stay
                        </Label>
                        <RadioGroup
                          value={formData.purpose}
                          onValueChange={(value) => handleSelectChange("purpose", value)}
                          className="flex space-x-4 pt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="leisure" id="leisure" />
                            <Label htmlFor="leisure" className="cursor-pointer">
                              Leisure
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="business" id="business" />
                            <Label htmlFor="business" className="cursor-pointer">
                              Business
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other" className="cursor-pointer">
                              Other
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        placeholder="Any special requests or preferences"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                      <Textarea
                        id="dietaryRestrictions"
                        name="dietaryRestrictions"
                        value={formData.dietaryRestrictions}
                        onChange={handleInputChange}
                        placeholder="Any dietary restrictions or allergies"
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Emergency Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="emergencyContactName">Name</Label>
                          <Input
                            id="emergencyContactName"
                            name="emergencyContactName"
                            value={formData.emergencyContactName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="emergencyContactPhone">Phone</Label>
                          <Input
                            id="emergencyContactPhone"
                            name="emergencyContactPhone"
                            value={formData.emergencyContactPhone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Room & Payment */}
                {formStep === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Room Assignment</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="roomNumber" className="required">
                            Room Number
                          </Label>
                          <Select
                            value={formData.roomNumber}
                            onValueChange={(value) => handleSelectChange("roomNumber", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select room" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableRooms.map((room) => (
                                <SelectItem key={room.id} value={room.id.toString()}>
                                  Room {room.id} - {room.type} (${room.price}/night)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="roomType">Room Type</Label>
                          <Input
                            id="roomType"
                            name="roomType"
                            value={formData.roomType}
                            onChange={handleInputChange}
                            readOnly
                            disabled
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="roomRate">Room Rate (per night)</Label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="roomRate"
                            name="roomRate"
                            value={formData.roomRate}
                            onChange={handleInputChange}
                            className="pl-7"
                            readOnly
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Payment Information</h3>
                      <div>
                        <Label htmlFor="paymentMethod" className="required">
                          Payment Method
                        </Label>
                        <Select
                          value={formData.paymentMethod}
                          onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            {paymentMethods.map((method) => (
                              <SelectItem key={method} value={method.toLowerCase().replace(/\s+/g, "-")}>
                                {method}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.paymentMethod === "credit-card" || formData.paymentMethod === "debit-card" ? (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="cardholderName">Cardholder Name</Label>
                            <Input
                              id="cardholderName"
                              name="cardholderName"
                              value={formData.cardholderName}
                              onChange={handleInputChange}
                              placeholder="Name as it appears on card"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="•••• •••• •••• ••••"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="cardExpiry">Expiry Date</Label>
                              <Input
                                id="cardExpiry"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cardCVC">CVC</Label>
                              <Input
                                id="cardCVC"
                                name="cardCVC"
                                value={formData.cardCVC}
                                onChange={handleInputChange}
                                placeholder="•••"
                              />
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {formData.paymentMethod === "mobile-money" && (
                        <div>
                          <Label htmlFor="mobileNumber">Mobile Money Number</Label>
                          <Input id="mobileNumber" placeholder="Enter mobile money number" />
                        </div>
                      )}

                      {formData.paymentMethod === "paypal" && (
                        <div className="text-center p-4 border rounded-md">
                          <p>Guest will be redirected to PayPal to complete payment.</p>
                        </div>
                      )}

                      {formData.paymentMethod === "cash" && (
                        <div className="text-center p-4 border rounded-md">
                          <p>Cash payment will be collected at check-in.</p>
                        </div>
                      )}

                      {formData.paymentMethod === "bank-transfer" && (
                        <div className="space-y-2">
                          <p className="text-sm">Bank transfer details:</p>
                          <div className="bg-muted p-3 rounded-md text-sm">
                            <p>Bank: Over Sky Hotel Bank</p>
                            <p>Account Name: Over Sky Hotel Ltd</p>
                            <p>Account Number: 1234567890</p>
                            <p>Sort Code: 12-34-56</p>
                            <p>Reference: Guest name and check-in date</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 5: Terms & Signature */}
                {formStep === 5 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Terms & Conditions</h3>
                      <div className="max-h-60 overflow-y-auto border rounded-md p-4 text-sm">
                        <h4 className="font-semibold mb-2">OVER SKY HOTEL TERMS AND CONDITIONS</h4>
                        <p className="mb-2">
                          These terms and conditions govern your stay at Over Sky Hotel. By signing this registration
                          form, you acknowledge that you have read, understood, and agree to be bound by these terms.
                        </p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>
                            <strong>Check-in and Check-out:</strong> Check-in time is from 3:00 PM, and check-out time
                            is by 11:00 AM. Early check-in and late check-out may be available upon request and may
                            incur additional charges.
                          </li>
                          <li>
                            <strong>Reservation and Cancellation:</strong> Cancellations must be made at least 24 hours
                            prior to the scheduled check-in date to avoid a cancellation fee equivalent to one night's
                            stay.
                          </li>
                          <li>
                            <strong>Payment:</strong> Full payment is required at check-in. We accept credit/debit
                            cards, cash, and mobile money. A valid credit card is required for incidental charges.
                          </li>
                          <li>
                            <strong>Damage to Property:</strong> Guests will be held responsible for any damage to hotel
                            property caused by them or their visitors and will be charged accordingly.
                          </li>
                          <li>
                            <strong>Liability:</strong> The hotel is not responsible for any loss, damage, or theft of
                            guest belongings. Guests are advised to use the in-room safe for valuables.
                          </li>
                          <li>
                            <strong>Noise and Disturbance:</strong> Guests are expected to respect other guests by
                            keeping noise levels to a minimum, especially between 10:00 PM and 7:00 AM.
                          </li>
                          <li>
                            <strong>Smoking Policy:</strong> This is a non-smoking hotel. Smoking is only permitted in
                            designated outdoor areas. A cleaning fee will be charged for smoking in non-designated
                            areas.
                          </li>
                          <li>
                            <strong>Pet Policy:</strong> Pets are not allowed, except for service animals.
                          </li>
                          <li>
                            <strong>Wi-Fi Usage:</strong> Complimentary Wi-Fi is provided for guest use. The hotel
                            reserves the right to terminate access for inappropriate or illegal usage.
                          </li>
                          <li>
                            <strong>Privacy Policy:</strong> Guest information will be handled in accordance with our
                            privacy policy and applicable data protection laws.
                          </li>
                        </ol>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="termsAccepted"
                          checked={formData.termsAccepted}
                          onCheckedChange={(checked) => handleCheckboxChange("termsAccepted", checked as boolean)}
                          required
                        />
                        <Label
                          htmlFor="termsAccepted"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 required"
                        >
                          I agree to the terms and conditions
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="privacyAccepted"
                          checked={formData.privacyAccepted}
                          onCheckedChange={(checked) => handleCheckboxChange("privacyAccepted", checked as boolean)}
                          required
                        />
                        <Label
                          htmlFor="privacyAccepted"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 required"
                        >
                          I agree to the privacy policy
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="marketingConsent"
                          checked={formData.marketingConsent}
                          onCheckedChange={(checked) => handleCheckboxChange("marketingConsent", checked as boolean)}
                        />
                        <Label
                          htmlFor="marketingConsent"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I would like to receive promotional emails and offers
                        </Label>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Signature</h3>
                      <Tabs
                        defaultValue="draw"
                        onValueChange={(value) => setSignatureMode(value as "draw" | "type" | "upload")}
                      >
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="draw">Draw</TabsTrigger>
                          <TabsTrigger value="type">Type</TabsTrigger>
                          <TabsTrigger value="upload">Upload</TabsTrigger>
                        </TabsList>
                        <TabsContent value="draw" className="space-y-4">
                          <div className="border-2 border-dashed rounded-md p-4 h-40 flex items-center justify-center">
                            <div className="text-center">
                              <Pen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground">Draw your signature here</p>
                            </div>
                          </div>
                          <Button variant="outline" type="button" className="w-full">
                            Clear Signature
                          </Button>
                        </TabsContent>
                        <TabsContent value="type" className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="signature">Type your full name</Label>
                            <Input
                              id="signature"
                              name="signature"
                              value={formData.signature}
                              onChange={handleInputChange}
                              placeholder="Type your full legal name"
                              className="font-handwriting text-lg"
                            />
                          </div>
                        </TabsContent>
                        <TabsContent value="upload" className="space-y-4">
                          <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground mb-2">
                              Drag & drop or click to upload signature
                            </p>
                            <Button variant="outline" type="button" size="sm">
                              Choose File
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Accepted formats: JPG, PNG, PDF. Max size: 2MB.
                          </p>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep} disabled={formStep === 1}>
                  Previous
                </Button>
                {formStep < 5 ? (
                  <Button type="button" onClick={nextStep} disabled={!validateStep()}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={!validateStep()}>
                    Complete Registration
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Registration Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Registration Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Guest Information */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Guest Information</h3>
                    <Badge variant={formStep > 1 ? "default" : "outline"} className="text-xs">
                      {formStep > 1 ? "Complete" : "Pending"}
                    </Badge>
                  </div>
                  {formData.firstName && formData.lastName && (
                    <div className="text-sm">
                      {formData.title && `${formData.title.toUpperCase()}. `}
                      {formData.firstName} {formData.lastName}
                    </div>
                  )}
                  {formData.email && <div className="text-sm text-muted-foreground">{formData.email}</div>}
                  {formData.phone && <div className="text-sm text-muted-foreground">{formData.phone}</div>}
                </div>

                {/* ID Information */}
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Identification</h3>
                    <Badge variant={formStep > 2 ? "default" : "outline"} className="text-xs">
                      {formStep > 2 ? "Complete" : "Pending"}
                    </Badge>
                  </div>
                  {formData.idType && formData.idNumber && (
                    <div className="text-sm">
                      {formData.idType.charAt(0).toUpperCase() + formData.idType.slice(1)}: {formData.idNumber}
                    </div>
                  )}
                </div>

                {/* Stay Information */}
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Stay Details</h3>
                    <Badge variant={formStep > 3 ? "default" : "outline"} className="text-xs">
                      {formStep > 3 ? "Complete" : "Pending"}
                    </Badge>
                  </div>
                  {formData.checkInDate && (
                    <div className="flex justify-between text-sm">
                      <span>Check-in:</span>
                      <span>{format(formData.checkInDate, "MMM d, yyyy")}</span>
                    </div>
                  )}
                  {formData.checkOutDate && (
                    <div className="flex justify-between text-sm">
                      <span>Check-out:</span>
                      <span>{format(formData.checkOutDate, "MMM d, yyyy")}</span>
                    </div>
                  )}
                  {formData.checkInDate && formData.checkOutDate && (
                    <div className="flex justify-between text-sm">
                      <span>Duration:</span>
                      <span>{calculateStayDuration()} nights</span>
                    </div>
                  )}
                  {formData.numberOfGuests && (
                    <div className="flex justify-between text-sm">
                      <span>Guests:</span>
                      <span>{formData.numberOfGuests}</span>
                    </div>
                  )}
                </div>

                {/* Room Information */}
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Room & Payment</h3>
                    <Badge variant={formStep > 4 ? "default" : "outline"} className="text-xs">
                      {formStep > 4 ? "Complete" : "Pending"}
                    </Badge>
                  </div>
                  {formData.roomNumber && formData.roomType && (
                    <div className="flex justify-between text-sm">
                      <span>Room:</span>
                      <span>
                        {formData.roomNumber} ({formData.roomType})
                      </span>
                    </div>
                  )}
                  {formData.roomRate && (
                    <div className="flex justify-between text-sm">
                      <span>Rate:</span>
                      <span>${formData.roomRate}/night</span>
                    </div>
                  )}
                  {formData.paymentMethod && (
                    <div className="flex justify-between text-sm">
                      <span>Payment:</span>
                      <span>
                        {formData.paymentMethod.charAt(0).toUpperCase() +
                          formData.paymentMethod.slice(1).replace(/-/g, " ")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Total */}
                {formData.roomRate && formData.checkInDate && formData.checkOutDate && (
                  <>
                    <Separator />
                    <div className="pt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>${calculateTotalCost().toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-muted-foreground text-right mt-1">
                        for {calculateStayDuration()} nights
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" type="button">
                  <FileText className="mr-2 h-4 w-4" />
                  View Registration Form
                </Button>
                <Button variant="outline" className="w-full justify-start" type="button">
                  <User className="mr-2 h-4 w-4" />
                  Search Guest Records
                </Button>
                <Button variant="outline" className="w-full justify-start" type="button">
                  <Home className="mr-2 h-4 w-4" />
                  View Room Availability
                </Button>
                <Button variant="outline" className="w-full justify-start" type="button">
                  <Clock className="mr-2 h-4 w-4" />
                  Check-in/Check-out
                </Button>
              </CardContent>
            </Card>

            {/* Help & Information */}
            <Card>
              <CardHeader>
                <CardTitle>Help & Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Registration Process</AccordionTrigger>
                    <AccordionContent>
                      Complete all 5 steps of the registration form to check in a guest. Required fields are marked with
                      an asterisk (*).
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>ID Requirements</AccordionTrigger>
                    <AccordionContent>
                      All guests must provide a valid government-issued ID. Acceptable forms include passport, driver's
                      license, or national ID card.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Payment Policies</AccordionTrigger>
                    <AccordionContent>
                      Full payment is required at check-in. We accept credit/debit cards, cash, mobile money, and bank
                      transfers.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle className="text-center">Registration Complete</DialogTitle>
            <DialogDescription className="text-center">
              Guest has been successfully registered and checked in.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Guest</p>
                  <p className="font-medium">
                    {formData.firstName} {formData.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Room</p>
                  <p className="font-medium">
                    {formData.roomNumber} ({formData.roomType})
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Check-in</p>
                  <p className="font-medium">
                    {formData.checkInDate ? format(formData.checkInDate, "MMM d, yyyy") : ""}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Check-out</p>
                  <p className="font-medium">
                    {formData.checkOutDate ? format(formData.checkOutDate, "MMM d, yyyy") : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button variant="outline" className="sm:w-auto w-full" onClick={handlePrintRegistration}>
              <Printer className="mr-2 h-4 w-4" />
              Print Registration
            </Button>
            <Button className="sm:w-auto w-full" onClick={handleNewRegistration}>
              <User className="mr-2 h-4 w-4" />
              Register New Guest
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .required::after {
          content: "*";
          color: hsl(var(--destructive));
          margin-left: 2px;
        }
        
        .font-handwriting {
          font-family: 'Caveat', cursive, system-ui;
        }
        
        @media print {
          header, nav, footer, .no-print {
            display: none !important;
          }
          
          body, html {
            background-color: white !important;
          }
          
          .print-only {
            display: block !important;
          }
        }
      `}</style>
    </div>
  )
}
