"use client"

import React from 'react'
import { TrendingUp, TrendingDown, Calendar, DollarSign, Camera, Users, Star, Activity, BarChart3, CheckCircle, Clock, MessageSquare } from 'lucide-react'
import { useDatabase } from '@/lib/database-context'

const cardCls = "bg-white dark:bg-luxury-charcoal-800 rounded-2xl border border-luxury-charcoal-100 dark:border-luxury-charcoal-700/50 shadow-sm"

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="h-1.5 bg-luxury-charcoal-100 dark:bg-luxury-charcoal-700 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export default function LuxuryAnalytics() {
  const { bookings, portfolioItems, messages, reviews, stats, loading, error } = useDatabase()

  // ── Error state ──────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className={`${cardCls} p-6`}>
        <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl p-4">
          <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center flex-shrink-0">
            <Activity className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">Analytics unavailable</p>
            <p className="text-xs text-red-500 dark:text-red-500 mt-0.5">{error}</p>
            <p className="text-xs text-red-400 mt-1">Check your database connection in <code className="font-mono">.env.local</code></p>
          </div>
        </div>
      </div>
    )
  }

  // ── Loading state ────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[1, 2].map(i => (
          <div key={i} className={`${cardCls} p-6 animate-pulse`}>
            <div className="h-4 w-32 bg-luxury-charcoal-100 dark:bg-luxury-charcoal-700 rounded mb-4" />
            <div className="space-y-3">{[1, 2, 3].map(j => <div key={j} className="h-3 bg-luxury-charcoal-100 dark:bg-luxury-charcoal-700 rounded" />)}</div>
          </div>
        ))}
      </div>
    )
  }

  // ── Derived metrics ──────────────────────────────────────────────────────────
  const totalRevenue = bookings.filter(b => b.status === "completed").reduce((s, b) => s + (b.price ? Number(b.price) : 0), 0)
  const pendingBookings = bookings.filter(b => b.status === "pending").length
  const confirmedBookings = bookings.filter(b => b.status === "confirmed").length
  const completedBookings = bookings.filter(b => b.status === "completed").length
  const cancelledBookings = bookings.filter(b => b.status === "cancelled").length
  const unreadMessages = messages.filter(m => m.status === "unread").length
  const highPriorityMessages = messages.filter(m => m.priority === "urgent" || m.priority === "high").length
  const approvedReviews = reviews.filter(r => r.approved).length
  const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : 0
  const featuredPortfolio = portfolioItems.filter(p => p.featured).length

  // Recent 7 days bookings
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000)
  const recentBookings = bookings.filter(b => new Date(b.createdAt) > sevenDaysAgo)

  // Booking status breakdown for chart
  const statusData = [
    { label: "Completed", value: completedBookings, color: "bg-emerald-500", textColor: "text-emerald-600" },
    { label: "Confirmed", value: confirmedBookings, color: "bg-blue-500", textColor: "text-blue-600" },
    { label: "Pending", value: pendingBookings, color: "bg-amber-500", textColor: "text-amber-600" },
    { label: "Cancelled", value: cancelledBookings, color: "bg-red-400", textColor: "text-red-500" },
  ]
  const maxStatus = Math.max(...statusData.map(s => s.value), 1)

  // Recent activity feed from real data
  const recentActivity: { label: string; time: string; type: "booking" | "message" | "review" }[] = [
    ...bookings.slice(0, 3).map(b => ({ label: `${b.clientName} booked ${b.eventType}`, time: new Date(b.createdAt).toLocaleDateString(), type: "booking" as const })),
    ...messages.slice(0, 2).map(m => ({ label: `${m.name} sent a message`, time: new Date(m.createdAt).toLocaleDateString(), type: "message" as const })),
    ...reviews.slice(0, 2).map(r => ({ label: `${r.clientName} left a ${r.rating}★ review`, time: new Date(r.createdAt).toLocaleDateString(), type: "review" as const })),
  ].sort(() => -0.5).slice(0, 6)

  const actIcon = { booking: <Calendar className="w-3.5 h-3.5 text-blue-500" />, message: <MessageSquare className="w-3.5 h-3.5 text-purple-500" />, review: <Star className="w-3.5 h-3.5 text-luxury-gold-500" /> }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Booking Status Breakdown */}
      <div className={`${cardCls} p-5`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-luxury-charcoal-900 dark:text-white">Booking Breakdown</h3>
            <p className="text-xs text-luxury-charcoal-400 mt-0.5">All-time status distribution</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-blue-500" />
          </div>
        </div>
        <div className="space-y-3">
          {statusData.map(({ label, value, color, textColor }) => (
            <div key={label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-luxury-charcoal-600 dark:text-luxury-charcoal-400">{label}</span>
                <span className={`text-xs font-bold ${textColor}`}>{value}</span>
              </div>
              <MiniBar value={value} max={maxStatus} color={color} />
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-luxury-charcoal-50 dark:border-luxury-charcoal-700/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-luxury-charcoal-500">Last 7 days</span>
            <span className="font-bold text-luxury-charcoal-800 dark:text-white">{recentBookings.length} new bookings</span>
          </div>
        </div>
      </div>

      {/* Revenue & Financial */}
      <div className={`${cardCls} p-5`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-luxury-charcoal-900 dark:text-white">Revenue Summary</h3>
            <p className="text-xs text-luxury-charcoal-400 mt-0.5">Completed bookings only</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-luxury-gold-50 dark:bg-luxury-gold-900/20 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-luxury-gold-500" />
          </div>
        </div>
        <div className="mb-4">
          <p className="text-2xl font-bold text-luxury-charcoal-900 dark:text-white">
            Rp {totalRevenue.toLocaleString("id-ID")}
          </p>
          <p className="text-xs text-luxury-charcoal-400 mt-0.5">Total revenue earned</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Avg per Booking", value: completedBookings > 0 ? `Rp ${Math.round(totalRevenue / completedBookings).toLocaleString("id-ID")}` : "—" },
            { label: "Completed Sessions", value: `${completedBookings}` },
            { label: "Pending Value", value: `Rp ${bookings.filter(b => b.status === "pending").reduce((s, b) => s + (b.price ? Number(b.price) : 0), 0).toLocaleString("id-ID")}` },
            { label: "Conversion Rate", value: bookings.length > 0 ? `${Math.round((completedBookings / bookings.length) * 100)}%` : "0%" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-luxury-charcoal-50 dark:bg-luxury-charcoal-700/40 rounded-xl p-3">
              <p className="text-xs text-luxury-charcoal-400 mb-0.5">{label}</p>
              <p className="text-sm font-bold text-luxury-charcoal-800 dark:text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio & Reviews */}
      <div className={`${cardCls} p-5`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-luxury-charcoal-900 dark:text-white">Portfolio & Reviews</h3>
            <p className="text-xs text-luxury-charcoal-400 mt-0.5">Content performance metrics</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center">
            <Camera className="w-4 h-4 text-teal-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: "Total Photos", value: portfolioItems.length, color: "text-luxury-charcoal-900 dark:text-white" },
            { label: "Featured", value: featuredPortfolio, color: "text-luxury-gold-600" },
            { label: "Avg Rating", value: avgRating > 0 ? `★ ${avgRating.toFixed(1)}` : "—", color: "text-luxury-gold-500" },
            { label: "Approved Reviews", value: approvedReviews, color: "text-emerald-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-luxury-charcoal-50 dark:bg-luxury-charcoal-700/40 rounded-xl p-3">
              <p className="text-xs text-luxury-charcoal-400 mb-0.5">{label}</p>
              <p className={`text-xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>
        {reviews.length > 0 && (
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <div key={star} className="flex-1">
                <div className="text-center text-xs text-luxury-charcoal-400 mb-1">{star}★</div>
                <MiniBar value={reviews.filter(r => r.rating === star).length} max={Math.max(...[1,2,3,4,5].map(s => reviews.filter(r => r.rating === s).length), 1)} color="bg-luxury-gold-400" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity Feed */}
      <div className={`${cardCls} p-5`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-luxury-charcoal-900 dark:text-white">Recent Activity</h3>
            <p className="text-xs text-luxury-charcoal-400 mt-0.5">Latest events across your business</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
            <Activity className="w-4 h-4 text-purple-500" />
          </div>
        </div>
        {recentActivity.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-luxury-charcoal-400">
            <Activity className="w-8 h-8 mb-2 opacity-30" />
            <p className="text-xs">No activity yet</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-1.5 border-b border-luxury-charcoal-50 dark:border-luxury-charcoal-700/40 last:border-0">
                <div className="w-7 h-7 rounded-lg bg-luxury-charcoal-50 dark:bg-luxury-charcoal-700/50 flex items-center justify-center flex-shrink-0">
                  {actIcon[item.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-luxury-charcoal-700 dark:text-luxury-charcoal-300 truncate">{item.label}</p>
                  <p className="text-xs text-luxury-charcoal-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 pt-3 border-t border-luxury-charcoal-50 dark:border-luxury-charcoal-700/50">
          <div className="flex items-center gap-3 text-xs text-luxury-charcoal-500">
            <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3 text-red-500" />{unreadMessages} unread</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-500" />{highPriorityMessages} urgent</span>
          </div>
        </div>
      </div>
    </div>
  )
}
