"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Users, Check, Info, ChevronRight, BedDouble, Utensils, Wifi, Tv, Bath } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock data for room types
const roomTypes = [
  {
    id: 1,
    name: "Standard Room",
    description: "Comfortable room with basic amenities",
    price: 100,
    capacity: 2,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["Free Wi-Fi", "TV", "Air Conditioning", "Private Bathroom"],
    available: 5,
  },
  {
    id: 2,
    name: "Deluxe Room",
    description: "Spacious room with premium amenities and city view",
    price: 150,
    capacity: 2,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["Free Wi-Fi", "TV", "Air Conditioning", "Private Bathroom", "Mini Bar", "Work Desk"],
    available: 3,
  },
  {
    id: 3,
    name: "Executive Suite",
    description: "Luxurious suite with separate living area and premium amenities",
    price: 250,
    capacity: 3,
    image: "/placeholder.svg?height=200&width=300",
    amenities: [
      "Free Wi-Fi",
      "TV",
      "Air Conditioning",
      "Private Bathroom",
      "Mini Bar",
      "Work Desk",
      "Lounge Area",
      "Coffee Machine",
    ],
    available: 2,
  },
  {
    id: 4,
    name: "Family Room",
    description: "Spacious room designed for families with children",
    price: 200,
    capacity: 4,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["Free Wi-Fi", "TV", "Air Conditioning", "Private Bathroom", "Mini Bar", "Extra Beds"],
    available: 4,
  },
  {
    id: 5,
    name: "Presidential Suite",
    description: "Our most luxurious accommodation with panoramic views",
    price: 500,
    capacity: 4,
    image: "/placeholder.svg?height=200&width=300",
    amenities: [
      "Free Wi-Fi",
      "TV",
      "Air Conditioning",
      "Private Bathroom",
      "Mini Bar",
      "Work Desk",
      "Lounge Area",
      "Coffee Machine",
      "Jacuzzi",
      "Private Terrace",
    ],
    available: 1,
  },
]

// Mock data for special offers
const specialOffers = [
  {
    id: 1,
    title: "Weekend Getaway",
    description: "15% off on weekend stays",
    discount: 15,
    code: "WEEKEND15",
  },
  {
    id: 2,
    title: "Extended Stay",
    description: "20% off for stays longer than 5 nights",
    discount: 20,
    code: "EXTENDED20",
  },
  {
    id: 3,
    title: "Early Bird",
    description: "10% off when booking 30 days in advance",
    discount: 10,
    code: "EARLY10",
  },
]

export default function BookingPage() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [selectedRoomType, setSelectedRoomType] = useState<number | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "credit-card"
  });

  // Calculate number of nights
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateNights();

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedRoomType || nights === 0) return 0;
    
    const room = roomTypes.find(r => r.id === selectedRoomType);
    if (!room) return 0;
    
    let total = room.price * nights;
    
    // Apply discount if promo code is valid
    if (appliedPromo) {
      total = total * (1 - appliedPromo.discount / 100);
    }
    
    return total;
  };

  // Handle promo code application
  const applyPromoCode = () => {
    const offer = specialOffers.find(
      offer => offer.code.toLowerCase() === promoCode.toLowerCase()
    );
    
    if (offer) {
      setAppliedPromo({
        code: offer.code,
        discount: offer.discount
      });
    } else {
      // Show error or notification that promo code is invalid
      console.log("Invalid promo code");
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (value: string) => {
    setBookingDetails(prev => ({
      ...prev,
      paymentMethod: value
    }));
  };

  // Check if search form is valid
  const isSearchValid = checkInDate && checkOutDate && nights > 0;

  // Check if booking form is valid
  const isBookingFormValid = () => {
    const { firstName, lastName, email, phone } = bookingDetails;
    return firstName && lastName && email && phone;
  };

  // Handle booking submission
  const handleBookingSubmit = () => {
    // In a real app, you would send the booking data to your backend
    console.log("Booking submitted:", {
      checkInDate,
      checkOutDate,
      nights,
      adults,
      children,
      roomType: roomTypes.find(r => r.id === selectedRoomType),
      promoCode: appliedPromo,
      total: calculateTotal(),
      ...bookingDetails
    });
    
    // Move to confirmation step
    setCurrentStep(3);
  };

  // Render room amenities icons
  const renderAmenityIcon = (amenity: string) => {
    if (amenity.includes("Wi-Fi")) return <Wifi className="h-4 w-4" />;
    if (amenity.includes("TV")) return <Tv className="h-4 w-4" />;
    if (amenity.includes("Bathroom")) return <Bath className="h-4 w-4" />;
    if (amenity.includes("Mini Bar") || amenity.includes("Coffee")) return <Utensils className="h-4 w-4" />;
    return <BedDouble className="h-4 w-4" />;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Room Booking</h1>
        <p className="text-muted-foreground">Reserve your stay at Over Sky Hotel</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Step Indicator */}
          <div className="mb-6">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                1
              </div>
              <div className={`h-1 flex-1 mx-2 ${
                currentStep > 1 ? "bg-primary" : "bg-muted"
              }`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                2
              </div>
              <div className={`h-1 flex-1 mx-2 ${
                currentStep > 2 ? "bg-primary" : "bg-muted"
              }`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                3
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>Search</span>
              <span>Details</span>
              <span>Confirmation</span>
            </div>
          </div>

          {/* Step 1: Search and Room Selection */}
          {currentStep === 1 && (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Search for Availability</CardTitle>
                  <CardDescription>Select your dates and room preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="check-in">Check-in Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkInDate ? (
                              format(checkInDate, "PPP")
                            ) : (
                              <span>Select date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkInDate}
                            onSelect={setCheckInDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="check-out">Check-out Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOutDate ? (
                              format(checkOutDate, "PPP")
                            ) : (
                              <span>Select date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkOutDate}
                            onSelect={setCheckOutDate}
                            initialFocus
                            disabled={(date) => 
                              date < new Date() || 
                              (checkInDate ? date <= checkInDate : false)
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="adults">Adults</Label>
                      <Select value={adults} onValueChange={setAdults}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of adults" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Adult</SelectItem>
                          <SelectItem value="2">2 Adults</SelectItem>
                          <SelectItem value="3">3 Adults</SelectItem>
                          <SelectItem value="4">4 Adults</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="children">Children</Label>
                      <Select value={children} onValueChange={setChildren}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of children" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">No Children</SelectItem>
                          <SelectItem value="1">1 Child</SelectItem>
                          <SelectItem value="2">2 Children</SelectItem>
                          <SelectItem value="3">3 Children</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    {nights > 0 ? (
                      <span>Stay duration: {nights} night{nights > 1 ? "s" : ""}</span>
                    ) : (
                      <span>Select check-in and check-out dates</span>
                    )}
                  </div>
                  <Button disabled={!isSearchValid}>
                    Search Availability
                  </Button>
                </CardFooter>
              </Card>

              {isSearchValid && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Available Rooms</h2>
                  
                  {roomTypes.map((room) => (
                    <Card 
                      key={room.id} 
                      className={cn(
                        "overflow-hidden transition-all",
                        selectedRoomType === room.id && "ring-2 ring-primary"
                      )}
                    >
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <img
                            src={room.image || "/placeholder.svg"}
                            alt={room.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-4 md:w-2/3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{room.name}</h3>
                            <Badge variant={room.available > 2 ? "outline" : "secondary"}>
                              {room.available} left
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mt-1">{room.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mt-3">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Users className="h-3 w-3"  className="flex items-center gap-1">
                              <Users className="h-3 w-3" /> {room.capacity} guests
                            </Badge>
                            {room.amenities.slice(0, 4).map((amenity, index) => (
                              <Badge key={index} variant="outline" className="flex items-center gap-1">
                                {renderAmenityIcon(amenity)} {amenity}
                              </Badge>
                            ))}
                            {room.amenities.length > 4 && (
                              <Badge variant="outline">+{room.amenities.length - 4} more</Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div>
                              <span className="text-2xl font-bold">${room.price}</span>
                              <span className="text-muted-foreground"> / night</span>
                            </div>
                            <Button 
                              onClick={() => setSelectedRoomType(room.id)}
                              variant={selectedRoomType === room.id ? "default" : "outline"}
                            >
                              {selectedRoomType === room.id ? "Selected" : "Select Room"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {selectedRoomType && (
                    <div className="flex justify-end mt-6">
                      <Button onClick={() => setCurrentStep(2)}>
                        Continue to Booking Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Step 2: Booking Details */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>Enter your information to complete the booking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        value={bookingDetails.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        value={bookingDetails.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={bookingDetails.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={bookingDetails.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                    <Input 
                      id="specialRequests" 
                      name="specialRequests" 
                      value={bookingDetails.specialRequests}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Payment Method</h3>
                    <Tabs 
                      defaultValue="credit-card" 
                      value={bookingDetails.paymentMethod}
                      onValueChange={handlePaymentMethodChange}
                    >
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                        <TabsTrigger value="mobile-money">Mobile Money</TabsTrigger>
                      </TabsList>
                      <TabsContent value="credit-card" className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input id="expiryDate" placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="paypal" className="mt-4">
                        <div className="text-center p-4 border rounded-md">
                          <p>You will be redirected to PayPal to complete your payment after confirming the booking.</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="mobile-money" className="mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="mobileNumber">Mobile Number</Label>
                          <Input id="mobileNumber" placeholder="Enter your mobile money number" />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button 
                  onClick={handleBookingSubmit}
                  disabled={!isBookingFormValid()}
                >
                  Complete Booking
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
                <CardDescription>
                  Your reservation has been successfully processed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-lg bg-muted p-6 text-left">
                    <h3 className="font-medium mb-4">Booking Summary</h3>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Check-in</p>
                        <p className="font-medium">{checkInDate ? format(checkInDate, "PPP") : ""}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Check-out</p>
                        <p className="font-medium">{checkOutDate ? format(checkOutDate, "PPP") : ""}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Room Type</p>
                        <p className="font-medium">
                          {selectedRoomType ? roomTypes.find(r => r.id === selectedRoomType)?.name : ""}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Guests</p>
                        <p className="font-medium">{adults} Adults, {children} Children</p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Room Rate (per night)</span>
                        <span>
                          ${selectedRoomType ? roomTypes.find(r => r.id === selectedRoomType)?.price : 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Number of Nights</span>
                        <span>{nights}</span>
                      </div>
                      {appliedPromo && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({appliedPromo.code})</span>
                          <span>-{appliedPromo.discount}%</span>
                        </div>
                      )}
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4 flex items-center">
                    <Info className="h-5 w-5 mr-2 text-blue-500" />
                    <p className="text-sm">
                      A confirmation email has been sent to {bookingDetails.email}. 
                      You can use your booking reference for check-in.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Button className="mr-2">
                  Download Receipt
                </Button>
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Book Another Room
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80">
          {/* Booking Summary */}
          {(currentStep === 1 || currentStep === 2) && selectedRoomType && (
            <Card className="mb-6 sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Check-in</span>
                    <span>{checkInDate ? format(checkInDate, "MMM d, yyyy") : ""}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Check-out</span>
                    <span>{checkOutDate ? format(checkOutDate, "MMM d, yyyy") : ""}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Nights</span>
                    <span>{nights}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Guests</span>
                    <span>{adults} Adults, {children} Children</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">
                      {roomTypes.find(r => r.id === selectedRoomType)?.name}
                    </span>
                    <span>
                      ${roomTypes.find(r => r.id === selectedRoomType)?.price} / night
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      ${roomTypes.find(r => r.id === selectedRoomType)?.price} x {nights} nights
                    </span>
                    <span>
                      ${(roomTypes.find(r => r.id === selectedRoomType)?.price || 0) * nights}
                    </span>
                  </div>
                  
                  {appliedPromo && (
                    <div className="flex justify-between text-sm text-green-600 mt-2">
                      <span>Discount ({appliedPromo.code})</span>
                      <span>
                        -${(
                          (roomTypes.find(r => r.id === selectedRoomType)?.price || 0) * 
                          nights * 
                          (appliedPromo.discount / 100)
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                
                {currentStep === 1 && (
                  <div className="pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="promoCode">Promo Code</Label>
                      <div className="flex space-x-2">
                        <Input 
                          id="promoCode" 
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter code"
                          className="flex-1"
                        />
                        <Button 
                          variant="outline" 
                          onClick={applyPromoCode}
                          disabled={!promoCode}
                        >
                          Apply
                        </Button>
                      </div>
                      {appliedPromo && (
                        <div className="flex items-center text-sm text-green-600">
                          <Check className="h-4 w-4 mr-1" />
                          {appliedPromo.code} applied ({appliedPromo.discount}% off)
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Special Offers */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Special Offers</CardTitle>
                <CardDescription>Exclusive deals for your stay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {specialOffers.map((offer) => (
                  <div key={offer.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{offer.title}</h3>
                      <Badge>{offer.discount}% OFF</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{offer.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <code className="bg-muted px-2 py-1 rounded text-sm">{offer.code}</code>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setPromoCode(offer.code);
                          applyPromoCode();
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
