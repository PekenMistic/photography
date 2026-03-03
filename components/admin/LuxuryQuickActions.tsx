"use client"

import React from 'react'
import { Upload, Plus, MessageSquare, Eye, Calendar, Camera, BookOpen, HelpCircle } from 'lucide-react'
import { useDatabase } from '@/lib/database-context'

const cardCls = "bg-white dark:bg-luxury-charcoal-800 rounded-2xl border border-luxury-charcoal-100 dark:border-luxury-charcoal-700/50 shadow-sm"

interface QuickAction {
  title: string
  description: string
  icon: React.FC<{ className?: string }>
  grad: string
  bg: string
  href?: string
  onClick?: () => void
}

export default function LuxuryQuickActions() {
  const { bookings, messages, portfolioItems, stats } = useDatabase()

  const pendingBookings = bookings.filter(b => b.status === "pending").length
  const unreadMessages = messages.filter(m => m.status === "unread").length

  const actions: QuickAction[] = [
    { title: "View Live Site", description: "Preview your public website", icon: Eye, grad: "from-teal-400 to-teal-600", bg: "bg-teal-50 dark:bg-teal-900/20", href: "/" },
    { title: "Go to Portfolio", description: `${portfolioItems.length} photos managed`, icon: Camera, grad: "from-blue-400 to-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", href: "/portfolio" },
    { title: "View Blog", description: "Check published articles", icon: BookOpen, grad: "from-indigo-400 to-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20", href: "/blog" },
    { title: "See All FAQs", description: "View public FAQ page", icon: HelpCircle, grad: "from-emerald-400 to-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20", href: "/" },
  ]

  const highlights = [
    { label: "Pending Bookings", value: pendingBookings, color: pendingBookings > 0 ? "text-amber-600" : "text-luxury-charcoal-400", icon: <Calendar className="w-4 h-4" /> },
    { label: "Unread Messages", value: unreadMessages, color: unreadMessages > 0 ? "text-blue-600" : "text-luxury-charcoal-400", icon: <MessageSquare className="w-4 h-4" /> },
    { label: "Total Photos", value: portfolioItems.length, color: "text-luxury-charcoal-700 dark:text-luxury-charcoal-200", icon: <Camera className="w-4 h-4" /> },
    { label: "Total Bookings", value: stats?.totalBookings || 0, color: "text-luxury-charcoal-700 dark:text-luxury-charcoal-200", icon: <Plus className="w-4 h-4" /> },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Quick Links */}
      <div className={`${cardCls} p-5 lg:col-span-2`}>
        <h3 className="text-sm font-bold text-luxury-charcoal-900 dark:text-white mb-1">Quick Links</h3>
        <p className="text-xs text-luxury-charcoal-400 mb-4">Navigate to key areas of your website</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {actions.map(action => {
            const Icon = action.icon
            return (
              <a key={action.title} href={action.href || "#"} target={action.href?.startsWith("/") ? "_blank" : undefined} rel="noreferrer"
                className={`${action.bg} rounded-xl p-3 flex flex-col items-center text-center gap-2 hover:scale-105 transition-transform duration-200 cursor-pointer group`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.grad} flex items-center justify-center shadow-sm`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-luxury-charcoal-800 dark:text-luxury-charcoal-100 leading-tight">{action.title}</p>
                  <p className="text-[10px] text-luxury-charcoal-400 mt-0.5 leading-tight">{action.description}</p>
                </div>
              </a>
            )
          })}
        </div>
      </div>

      {/* Highlights */}
      <div className={`${cardCls} p-5`}>
        <h3 className="text-sm font-bold text-luxury-charcoal-900 dark:text-white mb-1">Attention Needed</h3>
        <p className="text-xs text-luxury-charcoal-400 mb-4">Items requiring your review</p>
        <div className="space-y-3">
          {highlights.map(({ label, value, color, icon }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-luxury-charcoal-50 dark:border-luxury-charcoal-700/50 last:border-0">
              <div className="flex items-center gap-2 text-luxury-charcoal-500 dark:text-luxury-charcoal-400">
                {icon}
                <span className="text-xs font-medium">{label}</span>
              </div>
              <span className={`text-sm font-bold ${color}`}>{value}</span>
            </div>
          ))}
        </div>
        {(pendingBookings > 0 || unreadMessages > 0) && (
          <div className="mt-3 pt-3 border-t border-luxury-charcoal-50 dark:border-luxury-charcoal-700/50">
            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-3 py-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse flex-shrink-0" />
              <span>You have items needing attention</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
