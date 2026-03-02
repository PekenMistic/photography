"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

// Types
export interface PortfolioItem {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string
  featured: boolean
  createdAt: string
  tags?: string[]
  likes?: number
}

export interface Booking {
  id: string
  clientName: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  eventTime: string
  location: string
  duration: string
  price: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  notes: string
  createdAt: string
}

export interface Message {
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

export interface Review {
  id: string
  clientName: string
  email: string
  rating: number
  title: string
  content: string
  status: "pending" | "approved" | "rejected"
  featured: boolean
  createdAt: string
  eventType: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  category: string
  readTime: string
  slug: string
  published: boolean
}

// Context
interface DataContextType {
  // Portfolio
  portfolioItems: PortfolioItem[]
  addPortfolioItem: (item: Omit<PortfolioItem, 'id' | 'createdAt'>) => void
  updatePortfolioItem: (id: string, updates: Partial<PortfolioItem>) => void
  deletePortfolioItem: (id: string) => void
  
  // Bookings
  bookings: Booking[]
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void
  updateBooking: (id: string, updates: Partial<Booking>) => void
  deleteBooking: (id: string) => void
  
  // Messages
  messages: Message[]
  addMessage: (message: Omit<Message, 'id' | 'createdAt'>) => void
  updateMessage: (id: string, updates: Partial<Message>) => void
  deleteMessage: (id: string) => void
  
  // Reviews
  reviews: Review[]
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void
  updateReview: (id: string, updates: Partial<Review>) => void
  deleteReview: (id: string) => void
  
  // Blog Posts
  blogPosts: BlogPost[]
  addBlogPost: (post: Omit<BlogPost, 'id' | 'createdAt'>) => void
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => void
  deleteBlogPost: (id: string) => void
  
  // Stats
  getStats: () => {
    totalBookings: number
    totalRevenue: number
    totalPortfolioItems: number
    averageRating: number
    unreadMessages: number
    pendingReviews: number
  }
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  // State
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedPortfolio = localStorage.getItem('photography-portfolio')
        const savedBookings = localStorage.getItem('photography-bookings')
        const savedMessages = localStorage.getItem('photography-messages')
        const savedReviews = localStorage.getItem('photography-reviews')
        const savedBlogPosts = localStorage.getItem('photography-blog-posts')

        if (savedPortfolio) setPortfolioItems(JSON.parse(savedPortfolio))
        if (savedBookings) setBookings(JSON.parse(savedBookings))
        if (savedMessages) setMessages(JSON.parse(savedMessages))
        if (savedReviews) setReviews(JSON.parse(savedReviews))
        if (savedBlogPosts) setBlogPosts(JSON.parse(savedBlogPosts))
      } catch (error) {
        console.error('Error loading data from localStorage:', error)
      }
    }

    loadData()
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('photography-portfolio', JSON.stringify(portfolioItems))
  }, [portfolioItems])

  useEffect(() => {
    localStorage.setItem('photography-bookings', JSON.stringify(bookings))
  }, [bookings])

  useEffect(() => {
    localStorage.setItem('photography-messages', JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    localStorage.setItem('photography-reviews', JSON.stringify(reviews))
  }, [reviews])

  useEffect(() => {
    localStorage.setItem('photography-blog-posts', JSON.stringify(blogPosts))
  }, [blogPosts])

  // Helper function to generate IDs
  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9)

  // Portfolio functions
  const addPortfolioItem = (item: Omit<PortfolioItem, 'id' | 'createdAt'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    setPortfolioItems(prev => [newItem, ...prev])
  }

  const updatePortfolioItem = (id: string, updates: Partial<PortfolioItem>) => {
    setPortfolioItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ))
  }

  const deletePortfolioItem = (id: string) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== id))
  }

  // Booking functions
  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    setBookings(prev => [newBooking, ...prev])
  }

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, ...updates } : booking
    ))
  }

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== id))
  }

  // Message functions
  const addMessage = (message: Omit<Message, 'id' | 'createdAt'>) => {
    const newMessage: Message = {
      ...message,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    setMessages(prev => [newMessage, ...prev])
  }

  const updateMessage = (id: string, updates: Partial<Message>) => {
    setMessages(prev => prev.map(message => 
      message.id === id ? { ...message, ...updates } : message
    ))
  }

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(message => message.id !== id))
  }

  // Review functions
  const addReview = (review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    setReviews(prev => [newReview, ...prev])
  }

  const updateReview = (id: string, updates: Partial<Review>) => {
    setReviews(prev => prev.map(review => 
      review.id === id ? { ...review, ...updates } : review
    ))
  }

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(review => review.id !== id))
  }

  // Blog functions
  const addBlogPost = (post: Omit<BlogPost, 'id' | 'createdAt'>) => {
    const newPost: BlogPost = {
      ...post,
      id: generateId(),
      createdAt: new Date().toISOString(),
    }
    setBlogPosts(prev => [newPost, ...prev])
  }

  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updates } : post
    ))
  }

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id))
  }

  // Stats function
  const getStats = () => {
    const totalBookings = bookings.length
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.price, 0)
    const totalPortfolioItems = portfolioItems.length
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0
    const unreadMessages = messages.filter(msg => msg.status === 'unread').length
    const pendingReviews = reviews.filter(review => review.status === 'pending').length

    return {
      totalBookings,
      totalRevenue,
      totalPortfolioItems,
      averageRating,
      unreadMessages,
      pendingReviews
    }
  }

  const value: DataContextType = {
    portfolioItems,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    bookings,
    addBooking,
    updateBooking,
    deleteBooking,
    messages,
    addMessage,
    updateMessage,
    deleteMessage,
    reviews,
    addReview,
    updateReview,
    deleteReview,
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    getStats
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
