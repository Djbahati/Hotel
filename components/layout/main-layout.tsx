"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  BarChart,
  Home,
  MessageSquare,
  Star,
  CreditCard,
  Utensils,
  Award,
  Bell,
  LogOut,
  Settings,
  User,
  Menu,
  CheckSquare,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const pathname = usePathname()
  const { toast } = useToast()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearInterval(timer)
    }
  }, [])

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
  }

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
    return date.toLocaleTimeString("en-US", options)
  }

  const navigationItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart },
    { name: "Check In-Out", href: "/check-in-out", icon: CheckSquare },
    { name: "Rooms", href: "/rooms", icon: Home },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Customer Reviews", href: "/reviews", icon: Star },
    { name: "Billing System", href: "/billing", icon: CreditCard },
    { name: "Food Delivery", href: "/food-delivery", icon: Utensils },
    { name: "Bookings", href: "/bookings", icon: BookOpen },
    { name: "Try Premium", href: "/premium", icon: Award },
  ]

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    })
    // In a real app, you would handle the actual logout logic here
    // and redirect to the login page
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image src="/placeholder.svg?height=32&width=32" alt="OVER SKY HOTEL" fill className="object-contain" />
          </div>
          <h1 className="text-xl font-bold text-primary">OVER SKY HOTEL</h1>
        </Link>
      </div>
      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "text-primary bg-primary/10 border-l-4 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-10">
        <div className="flex flex-col flex-grow border-r bg-card">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 shadow-lg"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-card border-b flex items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-foreground">
              {pathname === "/dashboard"
                ? "Dashboard"
                : pathname === "/check-in-out"
                  ? "Check In-Out"
                  : pathname === "/rooms"
                    ? "Rooms"
                    : pathname === "/messages"
                      ? "Messages"
                      : pathname === "/reviews"
                        ? "Customer Reviews"
                        : pathname === "/billing"
                          ? "Billing System"
                          : pathname === "/food-delivery"
                            ? "Food Delivery"
                            : pathname === "/bookings"
                              ? "Bookings"
                              : pathname === "/premium"
                                ? "Premium Version"
                                : pathname === "/notifications"
                                  ? "Notifications"
                                  : pathname === "/register"
                                    ? "Registration"
                                    : "OVER SKY HOTEL"}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-sm text-muted-foreground">
              <div>{formatDate(currentTime)}</div>
              <div className="text-right">{formatTime(currentTime)}</div>
            </div>

            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full"></span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>OS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">{children}</main>
      </div>
    </div>
  )
}
