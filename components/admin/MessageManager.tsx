"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mail, Phone, Reply, Archive, Trash2, Clock, Star } from "lucide-react"

interface Message {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: "unread" | "read" | "replied" | "archived"
  priority: "low" | "medium" | "high"
  createdAt: string
  repliedAt?: string
}

export default function MessageManager() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      subject: "Wedding Photography Inquiry",
      message: "Hi! I'm interested in booking your services for my wedding on June 15th, 2024. Could you please send me your packages and pricing information?",
      status: "unread",
      priority: "high",
      createdAt: "2024-01-20T10:30:00Z"
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "m.chen@techcorp.com",
      phone: "+1 (555) 987-6543",
      subject: "Corporate Event Photography",
      message: "We need a photographer for our annual company retreat. The event is scheduled for March 10-12, 2024. Please let me know your availability and rates.",
      status: "read",
      priority: "medium",
      createdAt: "2024-01-19T14:15:00Z"
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      subject: "Family Portrait Session",
      message: "I would like to schedule a family portrait session for 6 people including grandparents. What are your available dates in February?",
      status: "replied",
      priority: "low",
      createdAt: "2024-01-18T09:45:00Z",
      repliedAt: "2024-01-18T16:20:00Z"
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david.wilson@email.com",
      phone: "+1 (555) 456-7890",
      subject: "Portfolio Collaboration",
      message: "I'm a makeup artist and would love to collaborate on some creative portrait sessions. Are you interested in doing some test shoots?",
      status: "archived",
      priority: "medium",
      createdAt: "2024-01-17T11:20:00Z"
    }
  ])

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [replyText, setReplyText] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const updateMessageStatus = (id: string, newStatus: Message["status"]) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, status: newStatus } : msg
    ))
  }

  const deleteMessage = (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.filter(msg => msg.id !== id))
    }
  }

  const sendReply = () => {
    if (!selectedMessage || !replyText.trim()) return
    
    updateMessageStatus(selectedMessage.id, "replied")
    setReplyText("")
    setSelectedMessage(null)
    // In a real app, this would send the actual email
    alert("Reply sent successfully!")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "read":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "replied":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const filteredMessages = filterStatus === "all" 
    ? messages 
    : messages.filter(msg => msg.status === filterStatus)

  const stats = {
    total: messages.length,
    unread: messages.filter(m => m.status === "unread").length,
    read: messages.filter(m => m.status === "read").length,
    replied: messages.filter(m => m.status === "replied").length,
    archived: messages.filter(m => m.status === "archived").length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Message Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage client inquiries and communications</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
                <p className="text-2xl font-bold text-red-600">{stats.unread}</p>
              </div>
              <Mail className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Read</p>
                <p className="text-2xl font-bold text-blue-600">{stats.read}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Replied</p>
                <p className="text-2xl font-bold text-green-600">{stats.replied}</p>
              </div>
              <Reply className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Archived</p>
                <p className="text-2xl font-bold text-gray-600">{stats.archived}</p>
              </div>
              <Archive className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <Card key={message.id} className={`hover:shadow-lg transition-shadow ${message.status === 'unread' ? 'border-l-4 border-l-red-500' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{message.name}</h3>
                    <Badge className={getStatusColor(message.status)}>
                      {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                    </Badge>
                    <Star className={`w-4 h-4 ${getPriorityColor(message.priority)}`} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{message.email}</span>
                    </div>
                    {message.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{message.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">{message.subject}</h4>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{message.message}</p>
                  </div>

                  {message.repliedAt && (
                    <div className="text-sm text-green-600 dark:text-green-400">
                      Replied on {new Date(message.repliedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedMessage(message)}
                  >
                    View
                  </Button>
                  
                  {message.status === "unread" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateMessageStatus(message.id, "read")}
                    >
                      Mark Read
                    </Button>
                  )}
                  
                  {(message.status === "read" || message.status === "unread") && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedMessage(message)}
                    >
                      Reply
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateMessageStatus(message.id, "archived")}
                  >
                    Archive
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteMessage(message.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Message Details/Reply Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>View and reply to client message</DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>From</Label>
                  <p className="font-medium">{selectedMessage.name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="font-medium">{selectedMessage.email}</p>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <Label>Phone</Label>
                    <p className="font-medium">{selectedMessage.phone}</p>
                  </div>
                )}
                <div>
                  <Label>Date</Label>
                  <p className="font-medium">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                </div>
              </div>
              
              <div>
                <Label>Subject</Label>
                <p className="font-medium">{selectedMessage.subject}</p>
              </div>
              
              <div>
                <Label>Message</Label>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {(selectedMessage.status === "read" || selectedMessage.status === "unread") && (
                <div>
                  <Label htmlFor="reply">Reply</Label>
                  <Textarea
                    id="reply"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                    rows={4}
                  />
                  <div className="flex gap-2 mt-2">
                    <Button onClick={sendReply} disabled={!replyText.trim()}>
                      Send Reply
                    </Button>
                    <Button variant="outline" onClick={() => setReplyText("")}>
                      Clear
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

