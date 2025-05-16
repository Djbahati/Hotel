"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, ChevronRight, Crown, Shield, Star, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PremiumPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly")

  // Premium features with icons and descriptions
  const premiumFeatures = [
    {
      title: "Priority Check-in & Check-out",
      description: "Skip the line with expedited processing and enjoy late check-out privileges",
      icon: Zap,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Exclusive Room Upgrades",
      description: "Automatic room upgrades when available and priority booking for premium suites",
      icon: Crown,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Private Dining Experience",
      description: "Access to exclusive dining areas with personalized chef service and premium menu options",
      icon: Star,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Dedicated Concierge",
      description: "Personal concierge available 24/7 to handle all your requests and arrangements",
      icon: Shield,
      color: "bg-green-100 text-green-600",
    },
  ]

  // Detailed feature comparison between free and premium
  const featureComparison = [
    {
      category: "Booking & Reservations",
      features: [
        { name: "Basic Room Booking", free: true, premium: true },
        { name: "Room Availability Calendar", free: true, premium: true },
        { name: "Priority Reservations", free: false, premium: true },
        { name: "Last-minute Booking Guarantee", free: false, premium: true },
        { name: "Flexible Cancellation Policy", free: false, premium: true },
      ],
    },
    {
      category: "Room Experience",
      features: [
        { name: "Standard Room Access", free: true, premium: true },
        { name: "Basic Amenities", free: true, premium: true },
        { name: "Automatic Room Upgrades", free: false, premium: true },
        { name: "Extended Check-out Times", free: false, premium: true },
        { name: "Welcome Gift Package", free: false, premium: true },
      ],
    },
    {
      category: "Dining & Services",
      features: [
        { name: "Restaurant Reservations", free: true, premium: true },
        { name: "Room Service", free: true, premium: true },
        { name: "Private Dining Areas", free: false, premium: true },
        { name: "Chef's Special Menu Access", free: false, premium: true },
        { name: "Complimentary Breakfast", free: false, premium: true },
      ],
    },
    {
      category: "Support & Assistance",
      features: [
        { name: "Basic Customer Support", free: true, premium: true },
        { name: "Standard Response Times", free: true, premium: true },
        { name: "24/7 Dedicated Concierge", free: false, premium: true },
        { name: "Priority Issue Resolution", free: false, premium: true },
        { name: "Personalized Travel Planning", free: false, premium: true },
      ],
    },
  ]

  // Testimonials from premium users
  const testimonials = [
    {
      name: "James Wilson",
      role: "Business Executive",
      comment:
        "The premium membership has completely transformed my business travel experience. The priority check-in and dedicated concierge save me valuable time, and the room upgrades make every stay comfortable and productive.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      name: "Sophia Chen",
      role: "Frequent Traveler",
      comment:
        "As someone who travels monthly, the premium benefits are absolutely worth it. The private dining experience and flexible cancellation policy have been game-changers for my unpredictable schedule.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      name: "Robert Johnson",
      role: "Family Vacationer",
      comment:
        "Our family vacations have been elevated to a whole new level with the premium membership. The room upgrades give us more space, and the concierge helps plan perfect family activities.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4,
    },
  ]

  return (
    <div className="container mx-auto py-8 space-y-16">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 opacity-90" />
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Premium Experience"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 px-8 py-20 md:py-28 flex flex-col items-center text-center text-white">
          <Badge className="bg-white/20 text-white backdrop-blur-sm mb-6 py-1.5 px-4 text-sm">
            Exclusive Premium Experience
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Elevate Your Hotel Experience</h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-10 text-white/90">
            Unlock exclusive benefits, personalized service, and unforgettable moments with our Premium subscription.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-white/90 text-lg px-8 py-6 h-auto font-medium">
              Upgrade Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto font-medium"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="bg-blue-100 text-blue-700 mb-4">Premium Benefits</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Exclusive Benefits Designed for Exceptional Stays</h2>
          <p className="text-lg text-muted-foreground">
            Our premium subscription unlocks a suite of benefits designed to make every aspect of your stay more
            comfortable, convenient, and memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {premiumFeatures.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-blue-200 transition-all duration-300 h-full">
              <CardHeader>
                <div className={`h-14 w-14 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white mt-4" asChild>
            <Link href="#pricing">
              See All Premium Benefits <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="space-y-10 scroll-mt-16">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="bg-purple-100 text-purple-700 mb-4">Pricing</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground">
            Choose the billing period that works best for you. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs
            defaultValue="monthly"
            value={billingPeriod}
            onValueChange={(value) => setBillingPeriod(value as "monthly" | "annually")}
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annually">Annually (Save 20%)</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="monthly" className="mt-0">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Free Plan */}
                <Card className="flex-1 border-2">
                  <CardHeader>
                    <CardTitle>Free Plan</CardTitle>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold">$0</span>
                      <span className="text-muted-foreground ml-1">/month</span>
                    </div>
                    <CardDescription className="mt-2">Basic features for occasional travelers</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Standard room booking</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Basic customer support</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Standard room service</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Regular check-in/check-out</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Current Plan
                    </Button>
                  </CardFooter>
                </Card>

                {/* Premium Plan */}
                <Card className="flex-1 border-2 border-blue-200 relative">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                    RECOMMENDED
                  </div>
                  <CardHeader className="bg-blue-50 rounded-t-lg">
                    <CardTitle>Premium Plan</CardTitle>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold">$99</span>
                      <span className="text-muted-foreground ml-1">/month</span>
                    </div>
                    <CardDescription className="mt-2">Enhanced features for the discerning traveler</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>All Free Plan features</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Priority check-in & check-out</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Room upgrades when available</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Private dining experience</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>24/7 dedicated concierge</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Complimentary welcome package</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Upgrade Now</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="annually" className="mt-0">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Free Plan */}
                <Card className="flex-1 border-2">
                  <CardHeader>
                    <CardTitle>Free Plan</CardTitle>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold">$0</span>
                      <span className="text-muted-foreground ml-1">/year</span>
                    </div>
                    <CardDescription className="mt-2">Basic features for occasional travelers</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Standard room booking</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Basic customer support</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Standard room service</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Regular check-in/check-out</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Current Plan
                    </Button>
                  </CardFooter>
                </Card>

                {/* Premium Plan */}
                <Card className="flex-1 border-2 border-blue-200 relative">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                    BEST VALUE
                  </div>
                  <CardHeader className="bg-blue-50 rounded-t-lg">
                    <CardTitle>Premium Plan</CardTitle>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold">$948</span>
                      <span className="text-muted-foreground ml-1">/year</span>
                    </div>
                    <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">Save $240 per year</Badge>
                    <CardDescription className="mt-2">Enhanced features for the discerning traveler</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>All Free Plan features</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Priority check-in & check-out</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Room upgrades when available</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Private dining experience</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>24/7 dedicated concierge</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Complimentary welcome package</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>2 free room upgrades guaranteed</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Upgrade Now</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Detailed Feature Comparison */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="bg-amber-100 text-amber-700 mb-4">Feature Comparison</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Free vs Premium: See What You Get</h2>
          <p className="text-lg text-muted-foreground">
            Compare our free and premium plans to see which one best fits your needs.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[768px]">
            {featureComparison.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 px-4">{category.category}</h3>
                <div className="bg-white rounded-lg border-2 overflow-hidden">
                  <div className="grid grid-cols-12 bg-gray-50 border-b">
                    <div className="col-span-6 p-4 font-medium">Feature</div>
                    <div className="col-span-3 p-4 text-center font-medium">Free</div>
                    <div className="col-span-3 p-4 text-center font-medium bg-blue-50">Premium</div>
                  </div>
                  {category.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className={`grid grid-cols-12 ${featureIndex !== category.features.length - 1 ? "border-b" : ""}`}
                    >
                      <div className="col-span-6 p-4">{feature.name}</div>
                      <div className="col-span-3 p-4 flex justify-center items-center">
                        {feature.free ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <span className="block w-5 h-0.5 bg-gray-300 rounded-full"></span>
                        )}
                      </div>
                      <div className="col-span-3 p-4 flex justify-center items-center bg-blue-50">
                        {feature.premium ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <span className="block w-5 h-0.5 bg-gray-300 rounded-full"></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Upgrade to Premium
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="bg-green-100 text-green-700 mb-4">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Premium Members Say</h2>
          <p className="text-lg text-muted-foreground">
            Hear from guests who have experienced the difference of our Premium membership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="border-2 hover:border-blue-200 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <CardTitle className="text-xl">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                </div>
                <p className="text-muted-foreground">{testimonial.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="bg-purple-100 text-purple-700 mb-4">FAQ</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our Premium membership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>How do I upgrade to Premium?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You can upgrade to our Premium membership directly from your account dashboard. Simply click on the
                'Upgrade Now' button and follow the payment instructions. The process takes less than 2 minutes.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Can I cancel my Premium subscription?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes, you can cancel your Premium subscription at any time. Your benefits will continue until the end of
                your current billing period. There are no cancellation fees or hidden charges.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Is there a trial period for Premium?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We offer a 7-day trial for new Premium members. You can experience all the benefits before committing to
                a subscription. No credit card is required for the trial period.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How soon can I use Premium benefits?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your Premium benefits become active immediately after your subscription is confirmed. You can start
                enjoying priority service, room upgrades, and all other benefits on your very next stay.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900" />
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <Image src="/placeholder.svg?height=400&width=1200" alt="Premium Experience" fill className="object-cover" />
        </div>
        <div className="relative z-10 px-8 py-16 md:py-20 flex flex-col items-center text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Hotel Experience?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join our Premium membership today and start enjoying exclusive benefits and personalized service on your
            next stay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-white/90 text-lg px-8 py-6 h-auto font-medium">
              Upgrade Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto font-medium"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
