"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// API Types matching database schema
export interface PortfolioItem {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string
  featured: boolean
  tags?: string[]
  createdAt: string
  updatedAt?: string
}

export interface Booking {
  id: string
  clientName: string
  email: string
  phone?: string
  eventType: string
  eventDate: string
  eventTime?: string
  location?: string
  duration?: string
  price?: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  serviceId?: string
  createdAt: string
  updatedAt?: string
}

export interface Message {
  id: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  status: 'unread' | 'read' | 'replied'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  createdAt: string
  updatedAt?: string
}

export interface Review {
  id: string
  clientName: string
  email?: string
  rating: number
  title?: string
  content: string
  serviceType?: string
  location?: string
  imageUrl?: string
  videoUrl?: string
  featured: boolean
  approved: boolean
  bookingId?: string
  createdAt: string
  updatedAt?: string
}

export interface Service {
  id: string
  name: string
  description?: string
  priceFrom?: number
  duration?: string
  features?: string[]
  category?: string
  imageUrl?: string
  popular: boolean
  active: boolean
  createdAt: string
  updatedAt?: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
  image: string
  featured: boolean
  published: boolean
  views: number
  likes: number
  createdAt: string
  updatedAt?: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
  active: boolean
  createdAt: string
  updatedAt?: string
}

export interface Setting {
  id: string
  key: string
  value: string
  description?: string
  updatedAt?: string
}

export interface Stats {
  totalPortfolioItems: number
  totalBookings: number
  totalMessages: number
  totalReviews: number
  unreadMessages: number
  pendingBookings: number
  totalRevenue: number
  averageRating: number
  recentBookings: Booking[]
  bookingStatusStats: { status: string; count: number }[]
  monthlyRevenue: { month: string; revenue: number }[]
}

// Context interface
interface DatabaseContextType {
  // Portfolio
  portfolioItems: PortfolioItem[]
  addPortfolioItem: (item: Omit<PortfolioItem, 'id' | 'createdAt'>) => Promise<void>
  updatePortfolioItem: (id: string, updates: Partial<PortfolioItem>) => Promise<void>
  deletePortfolioItem: (id: string) => Promise<void>
  
  // Bookings
  bookings: Booking[]
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Promise<void>
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<void>
  deleteBooking: (id: string) => Promise<void>
  
  // Messages
  messages: Message[]
  addMessage: (message: Omit<Message, 'id' | 'createdAt'>) => Promise<void>
  updateMessage: (id: string, updates: Partial<Message>) => Promise<void>
  deleteMessage: (id: string) => Promise<void>
  
  // Reviews
  reviews: Review[]
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => Promise<void>
  updateReview: (id: string, updates: Partial<Review>) => Promise<void>
  deleteReview: (id: string) => Promise<void>

  // Services
  services: Service[]
  addService: (service: Omit<Service, 'id' | 'createdAt'>) => Promise<void>
  updateService: (id: string, updates: Partial<Service>) => Promise<void>
  deleteService: (id: string) => Promise<void>

  // Blog Posts
  blogPosts: BlogPost[]
  addBlogPost: (post: Omit<BlogPost, 'id' | 'createdAt'>) => Promise<void>
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => Promise<void>
  deleteBlogPost: (id: string) => Promise<void>

  // FAQs
  faqs: FAQ[]
  addFAQ: (faq: Omit<FAQ, 'id' | 'createdAt'>) => Promise<void>
  updateFAQ: (id: string, updates: Partial<FAQ>) => Promise<void>
  deleteFAQ: (id: string) => Promise<void>

  // Settings
  settings: Setting[]
  updateSetting: (key: string, value: string) => Promise<void>
  
  // Stats
  stats: Stats | null
  
  // Loading states
  loading: boolean
  error: string | null
  
  // Refresh functions
  refreshPortfolio: () => Promise<void>
  refreshBookings: () => Promise<void>
  refreshMessages: () => Promise<void>
  refreshReviews: () => Promise<void>
  refreshServices: () => Promise<void>
  refreshBlogPosts: () => Promise<void>
  refreshFaqs: () => Promise<void>
  refreshSettings: () => Promise<void>
  refreshStats: () => Promise<void>
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined)

// API helper functions
const apiCall = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`)
  }
  
  return response.json()
}

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [settings, setSettings] = useState<Setting[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Portfolio functions
  const refreshPortfolio = async () => {
    try {
      const response = await apiCall('/api/portfolio')
      setPortfolioItems(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolio')
    }
  }

  const addPortfolioItem = async (item: Omit<PortfolioItem, 'id' | 'createdAt'>) => {
    try {
      const response = await apiCall('/api/portfolio', {
        method: 'POST',
        body: JSON.stringify(item),
      })
      setPortfolioItems(prev => [response.data, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add portfolio item')
      throw err
    }
  }

  const updatePortfolioItem = async (id: string, updates: Partial<PortfolioItem>) => {
    try {
      const response = await apiCall(`/api/portfolio/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      })
      setPortfolioItems(prev => prev.map(item => 
        item.id === id ? response.data : item
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update portfolio item')
      throw err
    }
  }

  const deletePortfolioItem = async (id: string) => {
    try {
      await apiCall(`/api/portfolio/${id}`, { method: 'DELETE' })
      setPortfolioItems(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete portfolio item')
      throw err
    }
  }

  // Booking functions
  const refreshBookings = async () => {
    try {
      const response = await apiCall('/api/bookings')
      setBookings(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings')
    }
  }

  const addBooking = async (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    try {
      const response = await apiCall('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(booking),
      })
      setBookings(prev => [response.data, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add booking')
      throw err
    }
  }

  const updateBooking = async (id: string, updates: Partial<Booking>) => {
    try {
      const response = await apiCall(`/api/bookings/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      })
      setBookings(prev => prev.map(booking => 
        booking.id === id ? response.data : booking
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update booking')
      throw err
    }
  }

  const deleteBooking = async (id: string) => {
    try {
      await apiCall(`/api/bookings/${id}`, { method: 'DELETE' })
      setBookings(prev => prev.filter(booking => booking.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete booking')
      throw err
    }
  }

  // Message functions
  const refreshMessages = async () => {
    try {
      const response = await apiCall('/api/messages')
      setMessages(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch messages')
    }
  }

  const addMessage = async (message: Omit<Message, 'id' | 'createdAt'>) => {
    try {
      const response = await apiCall('/api/messages', {
        method: 'POST',
        body: JSON.stringify(message),
      })
      setMessages(prev => [response.data, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add message')
      throw err
    }
  }

  const updateMessage = async (id: string, updates: Partial<Message>) => {
    try {
      const response = await apiCall(`/api/messages/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      })
      setMessages(prev => prev.map(message => 
        message.id === id ? response.data : message
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update message')
      throw err
    }
  }

  const deleteMessage = async (id: string) => {
    try {
      await apiCall(`/api/messages/${id}`, { method: 'DELETE' })
      setMessages(prev => prev.filter(message => message.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete message')
      throw err
    }
  }

  // Review functions
  const refreshReviews = async () => {
    try {
      const response = await apiCall('/api/reviews')
      setReviews(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews')
    }
  }

  const addReview = async (review: Omit<Review, 'id' | 'createdAt'>) => {
    try {
      const response = await apiCall('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(review),
      })
      setReviews(prev => [response.data, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add review')
      throw err
    }
  }

  const updateReview = async (id: string, updates: Partial<Review>) => {
    try {
      const response = await apiCall(`/api/reviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      })
      setReviews(prev => prev.map(review => 
        review.id === id ? response.data : review
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update review')
      throw err
    }
  }

  const deleteReview = async (id: string) => {
    try {
      await apiCall(`/api/reviews/${id}`, { method: 'DELETE' })
      setReviews(prev => prev.filter(review => review.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete review')
      throw err
    }
  }

  // Service functions
  const refreshServices = async () => {
    try {
      const response = await apiCall('/api/services?active=true')
      setServices(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services')
    }
  }

  const addService = async (service: Omit<Service, 'id' | 'createdAt'>) => {
    try {
      const response = await apiCall('/api/services', {
        method: 'POST',
        body: JSON.stringify(service),
      })
      setServices(prev => [response.data, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add service')
      throw err
    }
  }

  const updateService = async (id: string, updates: Partial<Service>) => {
    try {
      const response = await apiCall(`/api/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      })
      setServices(prev => prev.map(service =>
        service.id === id ? response.data : service
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update service')
      throw err
    }
  }

  const deleteService = async (id: string) => {
    try {
      await apiCall(`/api/services/${id}`, { method: 'DELETE' })
      setServices(prev => prev.filter(service => service.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete service')
      throw err
    }
  }

  // Blog functions
  const refreshBlogPosts = async () => {
    try {
      const response = await apiCall('/api/blog')
      setBlogPosts(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blog posts')
    }
  }

  const addBlogPost = async (post: Omit<BlogPost, 'id' | 'createdAt'>) => {
    try {
      const response = await apiCall('/api/blog', {
        method: 'POST',
        body: JSON.stringify(post),
      })
      setBlogPosts(prev => [response.data, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add blog post')
      throw err
    }
  }

  const updateBlogPost = async (id: string, updates: Partial<BlogPost>) => {
    try {
      const response = await apiCall(`/api/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      })
      setBlogPosts(prev => prev.map(post =>
        post.id === id ? response.data : post
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update blog post')
      throw err
    }
  }

  const deleteBlogPost = async (id: string) => {
    try {
      await apiCall(`/api/blog/${id}`, { method: 'DELETE' })
      setBlogPosts(prev => prev.filter(post => post.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete blog post')
      throw err
    }
  }

  // FAQ functions
  const refreshFaqs = async () => {
    try {
      const response = await apiCall('/api/faqs')
      setFaqs(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch FAQs')
    }
  }

  const addFAQ = async (faq: Omit<FAQ, 'id' | 'createdAt'>) => {
    try {
      const response = await apiCall('/api/faqs', {
        method: 'POST',
        body: JSON.stringify(faq),
      })
      setFaqs(prev => [response.data, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add FAQ')
      throw err
    }
  }

  const updateFAQ = async (id: string, updates: Partial<FAQ>) => {
    try {
      const response = await apiCall(`/api/faqs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      })
      setFaqs(prev => prev.map(faq =>
        faq.id === id ? response.data : faq
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update FAQ')
      throw err
    }
  }

  const deleteFAQ = async (id: string) => {
    try {
      await apiCall(`/api/faqs/${id}`, { method: 'DELETE' })
      setFaqs(prev => prev.filter(faq => faq.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete FAQ')
      throw err
    }
  }

  // Settings functions
  const refreshSettings = async () => {
    try {
      const response = await apiCall('/api/settings')
      setSettings(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch settings')
    }
  }

  const updateSetting = async (key: string, value: string) => {
    try {
      const response = await apiCall(`/api/settings/${key}`, {
        method: 'PUT',
        body: JSON.stringify({ value }),
      })
      setSettings(prev => prev.map(setting =>
        setting.key === key ? response.data : setting
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update setting')
      throw err
    }
  }

  // Stats functions
  const refreshStats = async () => {
    try {
      const response = await apiCall('/api/stats')
      setStats(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats')
    }
  }

  // Initial data loading
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        await Promise.all([
          refreshPortfolio(),
          refreshBookings(),
          refreshMessages(),
          refreshReviews(),
          refreshServices(),
          refreshBlogPosts(),
          refreshFaqs(),
          refreshSettings(),
          refreshStats(),
        ])
      } catch (err) {
        console.error('Failed to load initial data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  const value: DatabaseContextType = {
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
    services,
    addService,
    updateService,
    deleteService,
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    faqs,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    settings,
    updateSetting,
    stats,
    loading,
    error,
    refreshPortfolio,
    refreshBookings,
    refreshMessages,
    refreshReviews,
    refreshServices,
    refreshBlogPosts,
    refreshFaqs,
    refreshSettings,
    refreshStats,
  }

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  )
}

export function useDatabase() {
  const context = useContext(DatabaseContext)
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider')
  }
  return context
}
