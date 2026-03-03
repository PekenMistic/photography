"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Camera, Users, MessageSquare, Calendar, Settings, BarChart3,
  Shield, LogOut, TrendingUp, Star, DollarSign, Menu, BookOpen,
  HelpCircle, X, ChevronRight
} from "lucide-react"
import PortfolioManager from "@/components/admin/PortfolioManager"
import BookingManager from "@/components/admin/BookingManager"
import MessageManager from "@/components/admin/MessageManager"
import ReviewManager from "@/components/admin/ReviewManager"
import SettingsManager from "@/components/admin/SettingsManager"
import BlogManager from "@/components/admin/BlogManager"
import FAQManager from "@/components/admin/FAQManager"
import LuxuryAnalytics from "@/components/admin/LuxuryAnalytics"
import LuxuryQuickActions from "@/components/admin/LuxuryQuickActions"
import { useDatabase } from "@/lib/database-context"

const cardCls = "bg-white dark:bg-luxury-charcoal-800 rounded-2xl border border-luxury-charcoal-100 dark:border-luxury-charcoal-700/50 shadow-sm"

const NAV_ITEMS = [
  { icon: BarChart3, label: "Overview", value: "overview", color: "text-luxury-gold-600", badge: null },
  { icon: Camera, label: "Portfolio", value: "portfolio", color: "text-teal-600", badge: "portfolioItems" },
  { icon: Calendar, label: "Bookings", value: "bookings", color: "text-blue-600", badge: "totalBookings" },
  { icon: MessageSquare, label: "Messages", value: "messages", color: "text-purple-600", badge: "unreadMessages" },
  { icon: Users, label: "Reviews", value: "reviews", color: "text-rose-600", badge: null },
  { icon: BookOpen, label: "Blog", value: "blog", color: "text-indigo-600", badge: null },
  { icon: HelpCircle, label: "FAQ", value: "faq", color: "text-emerald-600", badge: null },
  { icon: Settings, label: "Settings", value: "settings", color: "text-luxury-charcoal-500", badge: null },
]

const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  overview: { title: "Dashboard Overview", subtitle: "Monitor your photography business performance" },
  portfolio: { title: "Portfolio", subtitle: "Manage your photo gallery and showcase" },
  bookings: { title: "Bookings", subtitle: "View and manage client bookings and appointments" },
  messages: { title: "Messages", subtitle: "Communicate with clients and manage inquiries" },
  reviews: { title: "Reviews", subtitle: "Monitor and respond to client reviews" },
  blog: { title: "Blog", subtitle: "Create and manage your photography blog content" },
  faq: { title: "FAQ", subtitle: "Manage frequently asked questions" },
  settings: { title: "Settings", subtitle: "Configure system preferences and account settings" },
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [activeSection, setActiveSection] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loginError, setLoginError] = useState("")
  const { stats, portfolioItems, bookings, messages, error } = useDatabase()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    const adminUser = process.env.NEXT_PUBLIC_ADMIN_USER || "admin"
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASS || "admin123"
    if (credentials.username === adminUser && credentials.password === adminPass) {
      setIsAuthenticated(true)
    } else {
      setLoginError("Invalid credentials. Please try again.")
    }
  }

  const getBadgeValue = (badge: string | null) => {
    if (!badge) return null
    if (badge === "portfolioItems") return portfolioItems.length || null
    if (badge === "totalBookings") return stats?.totalBookings || null
    if (badge === "unreadMessages") return stats?.unreadMessages || null
    return null
  }

  // ── Login Screen ────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-luxury-charcoal-900 via-luxury-charcoal-800 to-luxury-charcoal-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-luxury-gold-500/15 rounded-full blur-3xl animate-luxury-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-teal-500/10 rounded-full blur-3xl animate-luxury-float" style={{ animationDelay: "2s" }} />
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="relative z-10 w-full max-w-md px-4">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-luxury-gold-400 to-luxury-gold-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
              <p className="text-white/60 text-sm mt-1">Madiun Photography Management</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Username</label>
                <input type="text" value={credentials.username}
                  onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full h-11 px-4 bg-white/10 border border-white/15 text-white placeholder:text-white/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold-400/50 focus:border-luxury-gold-400/50 transition-all"
                  placeholder="Enter username" required />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Password</label>
                <input type="password" value={credentials.password}
                  onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full h-11 px-4 bg-white/10 border border-white/15 text-white placeholder:text-white/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold-400/50 focus:border-luxury-gold-400/50 transition-all"
                  placeholder="Enter password" required />
              </div>
              {loginError && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
                  {loginError}
                </motion.p>
              )}
              <button type="submit"
                className="w-full h-12 bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-600 hover:from-luxury-gold-600 hover:to-luxury-gold-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2 mt-2">
                <Shield className="w-4 h-4" />Sign In to Dashboard
              </button>
            </form>
            <p className="text-center text-xs text-white/30 mt-6">
              Default: admin / admin123 — configure in <span className="font-mono">.env.local</span>
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  const currentMeta = PAGE_META[activeSection]

  // ── Dashboard ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-luxury-charcoal-50 dark:bg-luxury-charcoal-900 flex flex-col">
      {/* Top Header */}
      <header className="h-16 bg-white dark:bg-luxury-charcoal-800 border-b border-luxury-charcoal-100 dark:border-luxury-charcoal-700/50 flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-40 shadow-sm">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-luxury-charcoal-100 dark:hover:bg-luxury-charcoal-700 text-luxury-charcoal-500 transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-luxury-gold-400 to-luxury-gold-600 rounded-xl flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-luxury-charcoal-900 dark:text-white leading-tight">Admin Dashboard</h1>
            <p className="text-[10px] text-luxury-charcoal-400 hidden sm:block">Madiun Photography</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-luxury-charcoal-600 dark:text-luxury-charcoal-400 hover:bg-luxury-charcoal-100 dark:hover:bg-luxury-charcoal-700 rounded-lg transition-colors">
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className={`
          w-60 bg-white dark:bg-luxury-charcoal-800 border-r border-luxury-charcoal-100 dark:border-luxury-charcoal-700/50
          flex-shrink-0 flex flex-col
          lg:sticky lg:top-16 lg:h-[calc(100vh-64px)]
          fixed top-16 left-0 h-[calc(100vh-64px)] z-30 transition-transform duration-200
          ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
        `}>
          <nav className="flex-1 p-3 overflow-y-auto">
            <div className="space-y-0.5">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const badgeVal = getBadgeValue(item.badge)
                const isActive = activeSection === item.value
                return (
                  <button key={item.value} onClick={() => { setActiveSection(item.value); setSidebarOpen(false) }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left group
                      ${isActive ? "bg-luxury-charcoal-900 dark:bg-luxury-gold-500/20 text-white dark:text-luxury-gold-300 shadow-sm" : "text-luxury-charcoal-600 dark:text-luxury-charcoal-400 hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-700/50 hover:text-luxury-charcoal-900 dark:hover:text-white"}`}>
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white dark:text-luxury-gold-400" : item.color} transition-colors`} />
                    <span className="flex-1 truncate">{item.label}</span>
                    {badgeVal ? (
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-luxury-charcoal-100 dark:bg-luxury-charcoal-700 text-luxury-charcoal-600 dark:text-luxury-charcoal-300"}`}>
                        {badgeVal}
                      </span>
                    ) : isActive ? <ChevronRight className="w-3 h-3 opacity-60" /> : null}
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Sidebar Footer Stats */}
          <div className="p-3 border-t border-luxury-charcoal-100 dark:border-luxury-charcoal-700/50">
            <div className="bg-luxury-charcoal-50 dark:bg-luxury-charcoal-700/50 rounded-xl p-3 space-y-2">
              {[
                { label: "Bookings", value: stats?.totalBookings || 0 },
                { label: "Unread", value: stats?.unreadMessages || 0 },
                { label: "Portfolio", value: portfolioItems.length },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-xs text-luxury-charcoal-500 dark:text-luxury-charcoal-400">{label}</span>
                  <span className="text-xs font-bold text-luxury-charcoal-700 dark:text-luxury-charcoal-200">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 lg:p-6 overflow-x-hidden">
          {/* Page Header */}
          <motion.div key={activeSection} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-luxury-charcoal-900 dark:text-white">{currentMeta.title}</h2>
            <p className="text-sm text-luxury-charcoal-500 dark:text-luxury-charcoal-400 mt-0.5">{currentMeta.subtitle}</p>
          </motion.div>

          {/* Page Content */}
          <AnimatePresence mode="wait">
            <motion.div key={activeSection} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}>
              {activeSection === "overview" && (
                <div className="space-y-6">
                  {/* DB Error Banner */}
                  {error && (
                    <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl px-5 py-4">
                      <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-500 text-base">⚠</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-red-700 dark:text-red-400">Database not connected</p>
                        <p className="text-xs text-red-500 mt-0.5">Add <code className="font-mono bg-red-100 dark:bg-red-900/40 px-1 rounded">DATABASE_URL</code> to your <code className="font-mono bg-red-100 dark:bg-red-900/40 px-1 rounded">.env.local</code> file to enable data persistence. Stats below show 0 until connected.</p>
                      </div>
                    </div>
                  )}
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                    {[
                      { title: "Total Revenue", value: `Rp ${(stats?.totalRevenue || 0).toLocaleString("id-ID")}`, sub: `${stats?.totalBookings || 0} bookings`, icon: DollarSign, grad: "from-luxury-gold-400 to-luxury-gold-600" },
                      { title: "Total Bookings", value: stats?.totalBookings?.toString() || "0", sub: `${stats?.pendingBookings || 0} pending`, icon: Calendar, grad: "from-blue-400 to-blue-600" },
                      { title: "Portfolio", value: portfolioItems.length?.toString() || "0", sub: "Photos saved", icon: Camera, grad: "from-teal-400 to-teal-600" },
                      { title: "Avg Rating", value: stats?.averageRating ? stats.averageRating.toFixed(1) : "—", sub: `${stats?.totalReviews || 0} reviews`, icon: Star, grad: "from-amber-400 to-amber-600" },
                    ].map((stat, i) => {
                      const Icon = stat.icon
                      return (
                        <motion.div key={stat.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                          <div className={`${cardCls} p-4 lg:p-5`}>
                            <div className="flex items-start justify-between">
                              <div className="min-w-0">
                                <p className="text-xs font-semibold text-luxury-charcoal-500 dark:text-luxury-charcoal-400 uppercase tracking-wider truncate">{stat.title}</p>
                                <p className="text-xl lg:text-2xl font-bold text-luxury-charcoal-900 dark:text-white mt-1 truncate">{stat.value}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <TrendingUp className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                                  <span className="text-xs text-luxury-charcoal-400 truncate">{stat.sub}</span>
                                </div>
                              </div>
                              <div className={`w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-gradient-to-br ${stat.grad} flex items-center justify-center shadow-sm flex-shrink-0 ml-2`}>
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                  <LuxuryAnalytics />
                  <LuxuryQuickActions />
                </div>
              )}
              {activeSection === "portfolio" && <PortfolioManager />}
              {activeSection === "bookings" && <BookingManager />}
              {activeSection === "messages" && <MessageManager />}
              {activeSection === "reviews" && <ReviewManager />}
              {activeSection === "blog" && <BlogManager />}
              {activeSection === "faq" && <FAQManager />}
              {activeSection === "settings" && <SettingsManager />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
