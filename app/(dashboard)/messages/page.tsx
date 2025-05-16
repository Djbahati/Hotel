"use client"

import { useState } from "react"
import { Send, Search, Clock, Info, CheckCircle2, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for conversations
const conversations = [
  {
    id: 1,
    name: "John Smith",
    room: "101",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I need extra towels please.",
    time: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    name: "Emma Wilson",
    room: "205",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Is room service available after 10 PM?",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    name: "Michael Brown",
    room: "310",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The AC in my room isn't working properly.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: 4,
    name: "Sophia Garcia",
    room: "422",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thank you for the wonderful service!",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 5,
    name: "Robert Johnson",
    room: "118",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can I extend my stay for two more nights?",
    time: "3 days ago",
    unread: false,
  },
]

// Mock data for messages in a conversation
const messageHistory = [
  {
    id: 1,
    sender: "guest",
    message: "Hello, I need extra towels for my room please.",
    time: "10:30 AM",
    read: true,
  },
  {
    id: 2,
    sender: "staff",
    message: "Of course, Mr. Smith. How many towels would you like?",
    time: "10:32 AM",
    read: true,
  },
  {
    id: 3,
    sender: "guest",
    message: "Two bath towels would be great, thank you.",
    time: "10:33 AM",
    read: true,
  },
  {
    id: 4,
    sender: "staff",
    message: "No problem. We'll send them to your room right away.",
    time: "10:35 AM",
    read: true,
  },
  {
    id: 5,
    sender: "guest",
    message: "Thank you! Also, what time does the restaurant open for breakfast?",
    time: "10:36 AM",
    read: false,
  },
]

// Quick reply templates
const quickReplies = [
  "Thank you for your message. We'll assist you shortly.",
  "Your request has been received and is being processed.",
  "The housekeeping team will be at your room in 15 minutes.",
  "Room service is available 24/7. Would you like to place an order?",
  "Breakfast is served from 6:30 AM to 10:30 AM in the main restaurant.",
  "Check-out time is at 12:00 PM. Would you like to request a late check-out?",
]

// FAQ items
const faqItems = [
  {
    question: "What are the check-in and check-out times?",
    answer:
      "Check-in time is 3:00 PM and check-out time is 12:00 PM. Early check-in and late check-out may be available upon request, subject to availability.",
  },
  {
    question: "Is breakfast included in the room rate?",
    answer:
      "Breakfast is included in some room rates. Please check your booking confirmation or contact the front desk to confirm.",
  },
  {
    question: "Do you offer airport shuttle service?",
    answer:
      "Yes, we offer airport shuttle service for an additional fee. Please contact the front desk at least 24 hours in advance to arrange transportation.",
  },
  {
    question: "Is there Wi-Fi available in the hotel?",
    answer: "Yes, complimentary high-speed Wi-Fi is available throughout the hotel for all guests.",
  },
  {
    question: "What amenities are available at the hotel?",
    answer:
      "Our hotel features a fitness center, swimming pool, spa, restaurant, bar, business center, and 24-hour room service.",
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.room.includes(searchTerm) ||
      conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return
    // In a real app, you would send this message to your backend
    console.log("Sending message:", newMessage)
    setNewMessage("")
  }

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Message History
          </Button>
          <Button variant="outline" size="sm">
            <Bot className="mr-2 h-4 w-4" />
            Auto-Replies
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
        {/* Conversations List */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Manage guest inquiries and requests</CardDescription>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" className="mt-2" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-22rem)]">
              {filteredConversations
                .filter((conv) => {
                  if (activeTab === "unread") return conv.unread
                  if (activeTab === "resolved") return !conv.unread
                  return true
                })
                .map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-start p-3 hover:bg-accent cursor-pointer ${
                      selectedConversation.id === conversation.id ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                      <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium truncate">{conversation.name}</div>
                        <div className="text-xs text-muted-foreground">{conversation.time}</div>
                      </div>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="mr-2 text-xs">
                          Room {conversation.room}
                        </Badge>
                        {conversation.unread && <Badge className="bg-blue-500 text-xs">New</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">{conversation.lastMessage}</p>
                    </div>
                  </div>
                ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src={selectedConversation.avatar || "/placeholder.svg"}
                    alt={selectedConversation.name}
                  />
                  <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedConversation.name}</CardTitle>
                  <CardDescription>Room {selectedConversation.room}</CardDescription>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Info className="h-4 w-4 mr-2" />
                  Guest Info
                </Button>
                <Button variant="outline" size="sm">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark as Resolved
                </Button>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <Tabs defaultValue="chat">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="chat"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Chat
                </TabsTrigger>
                <TabsTrigger
                  value="quick-replies"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Quick Replies
                </TabsTrigger>
                <TabsTrigger
                  value="faq"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  FAQ
                </TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="p-0 m-0">
                <ScrollArea className="h-[calc(100vh-28rem)] p-4">
                  <div className="space-y-4">
                    {messageHistory.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === "guest" ? "justify-start" : "justify-end"}`}>
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            msg.sender === "guest" ? "bg-accent" : "bg-primary text-primary-foreground"
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <div className="flex items-center justify-end mt-1 text-xs text-muted-foreground">
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="quick-replies" className="p-0 m-0">
                <ScrollArea className="h-[calc(100vh-28rem)] p-4">
                  <div className="grid grid-cols-1 gap-2">
                    {quickReplies.map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start h-auto py-2 px-3 text-left"
                        onClick={() => handleQuickReply(reply)}
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="faq" className="p-0 m-0">
                <ScrollArea className="h-[calc(100vh-28rem)] p-4">
                  <div className="space-y-4">
                    {faqItems.map((item, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">{item.question}</h3>
                        <p className="text-sm text-muted-foreground">{item.answer}</p>
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 h-auto mt-2"
                          onClick={() => handleQuickReply(item.answer)}
                        >
                          Use as reply
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t p-3">
            <div className="flex items-center w-full space-x-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage()
                }}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
