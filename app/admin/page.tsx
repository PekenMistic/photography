"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { EnhancedButton } from "@/components/ui/enhanced-button"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import {
  Camera,
  Users,
  MessageSquare,
  Calendar,
  Settings,
  BarChart3,
  Plus,
  Eye,
  Shield,
  LogOut,
  TrendingUp,
  Star,
  DollarSign,
  Activity,
  Menu,
  BookOpen,
  HelpCircle,
  Upload,
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

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [activeSection, setActiveSection] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loginError, setLoginError] = useState("")
  const { stats } = useDatabase()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    // Use environment variables for credentials - set in .env.local
    const adminUser = process.env.NEXT_PUBLIC_ADMIN_USER || "admin"
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASS || "admin123"

    if (credentials.username === adminUser && credentials.password === adminPass) {
      setIsAuthenticated(true)
    } else {
      setLoginError("Username atau password salah. Silakan coba lagi.")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-luxury-charcoal-900 via-luxury-charcoal-800 to-luxury-charcoal-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-luxury-gold-500/20 rounded-full blur-3xl animate-luxury-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-teal-500/20 rounded-full blur-3xl animate-luxury-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-luxury-gold-500/10 rounded-full blur-2xl animate-luxury-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md px-4"
        >
          <EnhancedCard variant="glass" className="backdrop-blur-xl border-white/20">
            <CardHeader className="text-center pb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-luxury-gold-500 to-luxury-gold-600 rounded-3xl flex items-center justify-center shadow-luxury-lg border border-luxury-gold-400/30"
              >
                <Shield className="w-10 h-10 text-white" />
              </motion.div>
              <CardTitle className="text-2xl font-display font-bold text-white">Admin Portal</CardTitle>
              <CardDescription className="text-gray-300 mt-1">Masuk ke dashboard manajemen</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white font-medium">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 rounded-xl focus:border-luxury-gold-400 focus:ring-luxury-gold-400/20"
                    placeholder="Masukkan username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-medium">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 rounded-xl focus:border-luxury-gold-400 focus:ring-luxury-gold-400/20"
                    placeholder="Masukkan password"
                  />
                </div>
                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 text-red-300 text-sm text-center"
                  >
                    {loginError}
                  </motion.div>
                )}
                <EnhancedButton
                  type="submit"
                  variant="gradient"
                  size="lg"
                  fullWidth
                  icon={<Shield className="w-5 h-5" />}
                  iconPosition="left"
                  glow
                  className="h-12 rounded-xl"
                >
                  Masuk ke Dashboard
                </EnhancedButton>
              </form>
              <div className="mt-5 text-xs text-gray-500 text-center">
                <p>Gunakan credentials yang dikonfigurasi di <span className="font-mono text-luxury-charcoal-400">.env.local</span></p>
              </div>
            </CardContent>
          </EnhancedCard>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-charcoal-50 to-luxury-gold-50 dark:from-luxury-charcoal-900 dark:to-luxury-charcoal-800">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-luxury-gold-500/5 rounded-full blur-3xl animate-luxury-float"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-luxury-teal-500/5 rounded-full blur-3xl animate-luxury-float" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Header - fixed z-index issue */}
      <header className="bg-white/90 dark:bg-luxury-charcoal-800/90 backdrop-blur-xl shadow-luxury border-b border-luxury-charcoal-200/30 dark:border-luxury-charcoal-700/30 sticky top-0 z-40">
        <div className="px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 lg:space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden w-10 h-10 bg-luxury-charcoal-100 dark:bg-luxury-charcoal-700 rounded-xl flex items-center justify-center hover:bg-luxury-charcoal-200 dark:hover:bg-luxury-charcoal-600 transition-colors"
              >
                <Menu className="w-5 h-5 text-luxury-charcoal-700 dark:text-luxury-charcoal-300" />
              </button>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-luxury-gold-500 to-luxury-gold-600 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-luxury border border-luxury-gold-400/30">
                  <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg lg:text-2xl font-display font-bold gradient-text-luxury">
                    Admin Dashboard
                  </h1>
                  <p className="text-xs text-luxury-charcoal-500 dark:text-luxury-charcoal-400 hidden sm:block">
                    Madiun Photography Management
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <EnhancedButton
                variant="outline"
                onClick={() => setIsAuthenticated(false)}
                icon={<LogOut className="w-4 h-4" />}
                iconPosition="left"
                className="text-sm"
              >
                <span className="hidden sm:inline">Logout</span>
              </EnhancedButton>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Sidebar */}
        <aside className={`
          w-64 lg:w-72 bg-white/80 dark:bg-luxury-charcoal-800/80 backdrop-blur-xl shadow-luxury-lg 
          lg:border-r border-luxury-charcoal-200/30 dark:border-luxury-charcoal-700/30 
          min-h-[calc(100vh-65px)] lg:min-h-[calc(100vh-73px)]
          ${sidebarOpen ? 'block absolute z-30 left-0 top-0' : 'hidden lg:block'}
        `}>
          <nav className="p-4 lg:p-6">
            <div className="space-y-1.5">
              {[
                { icon: BarChart3, label: "Overview", value: "overview", color: "text-luxury-gold-600" },
                { icon: Camera, label: "Portfolio", value: "portfolio", color: "text-luxury-teal-600" },
                { icon: Calendar, label: "Bookings", value: "bookings", color: "text-blue-600" },
                { icon: MessageSquare, label: "Messages", value: "messages", color: "text-luxury-gold-500" },
                { icon: Users, label: "Reviews", value: "reviews", color: "text-luxury-teal-500" },
                { icon: BookOpen, label: "Blog", value: "blog", color: "text-purple-500" },
                { icon: HelpCircle, label: "FAQ", value: "faq", color: "text-green-500" },
                { icon: Settings, label: "Settings", value: "settings", color: "text-luxury-charcoal-500" },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.value}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setActiveSection(item.value)
                        setSidebarOpen(false)
                      }}
                      className={`w-full justify-start h-11 text-left transition-all duration-200 group rounded-xl ${
                        activeSection === item.value
                          ? 'bg-gradient-to-r from-luxury-gold-100 to-luxury-teal-50 dark:from-luxury-gold-900/40 dark:to-luxury-teal-900/20 border border-luxury-gold-200 dark:border-luxury-gold-700/50 shadow-sm'
                          : 'hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-700/50'
                      }`}
                    >
                      <IconComponent className={`mr-3 h-4 w-4 ${activeSection === item.value ? item.color : 'text-luxury-charcoal-400'} transition-colors duration-200`} />
                      <span className={`font-medium text-sm ${activeSection === item.value ? 'text-luxury-charcoal-800 dark:text-luxury-charcoal-100' : 'text-luxury-charcoal-600 dark:text-luxury-charcoal-400'}`}>
                        {item.label}
                      </span>
                      {activeSection === item.value && (
                        <div className="ml-auto w-1.5 h-1.5 bg-luxury-gold-500 rounded-full"></div>
                      )}
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 p-4 bg-gradient-to-br from-luxury-gold-50 to-luxury-teal-50 dark:from-luxury-gold-900/20 dark:to-luxury-teal-900/20 rounded-xl border border-luxury-gold-200/30 dark:border-luxury-gold-700/30"
            >
              <h3 className="text-xs font-semibold text-luxury-charcoal-500 dark:text-luxury-charcoal-400 uppercase tracking-wider mb-3">Quick Stats</h3>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-luxury-charcoal-600 dark:text-luxury-charcoal-400">Total Bookings</span>
                  <span className="text-sm font-bold text-luxury-gold-600">{stats?.totalBookings || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-luxury-charcoal-600 dark:text-luxury-charcoal-400">Pesan Belum Dibaca</span>
                  <span className="text-sm font-bold text-luxury-teal-600">{stats?.unreadMessages || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-luxury-charcoal-600 dark:text-luxury-charcoal-400">Item Portfolio</span>
                  <span className="text-sm font-bold text-luxury-charcoal-600">{stats?.totalPortfolioItems || 0}</span>
                </div>
              </div>
            </motion.div>
          </nav>
        </aside>

        {/* Sidebar overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          <div className="space-y-6 max-w-full">
            {activeSection === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl lg:text-3xl font-display font-bold gradient-text-luxury mb-1">Dashboard Overview</h2>
                  <p className="text-luxury-charcoal-500 dark:text-luxury-charcoal-400">Monitor performa bisnis fotografi Anda</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                  {[
                    {
                      title: "Total Revenue",
                      value: `Rp ${(stats?.totalRevenue || 0).toLocaleString('id-ID')}`,
                      change: `${stats?.totalBookings || 0} bookings`,
                      icon: DollarSign,
                      color: "from-luxury-gold-500 to-luxury-gold-600",
                      bg: "bg-luxury-gold-50 dark:bg-luxury-gold-900/20"
                    },
                    {
                      title: "Total Bookings",
                      value: stats?.totalBookings?.toString() || '0',
                      change: "Booking aktif",
                      icon: Calendar,
                      color: "from-luxury-teal-500 to-luxury-teal-600",
                      bg: "bg-luxury-teal-50 dark:bg-luxury-teal-900/20"
                    },
                    {
                      title: "Portfolio",
                      value: stats?.totalPortfolioItems?.toString() || '0',
                      change: "Foto tersimpan",
                      icon: Camera,
                      color: "from-luxury-charcoal-600 to-luxury-charcoal-700",
                      bg: "bg-luxury-charcoal-50 dark:bg-luxury-charcoal-700/30"
                    },
                    {
                      title: "Rating",
                      value: stats?.averageRating ? stats.averageRating.toFixed(1) : "0.0",
                      change: "Rating rata-rata",
                      icon: Star,
                      color: "from-luxury-gold-400 to-luxury-gold-500",
                      bg: "bg-luxury-gold-50 dark:bg-luxury-gold-900/20"
                    }
                  ].map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <EnhancedCard variant="elevated" hover className="group">
                          <CardContent className="p-4 lg:p-5">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-luxury-charcoal-500 dark:text-luxury-charcoal-400 mb-1 truncate">
                                  {stat.title}
                                </p>
                                <p className="text-xl lg:text-2xl font-bold text-luxury-charcoal-900 dark:text-white mb-1 truncate">
                                  {stat.value}
                                </p>
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3 text-green-500 flex-shrink-0" />
                                  <span className="text-xs text-luxury-charcoal-500 truncate">{stat.change}</span>
                                </div>
                              </div>
                              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg flex-shrink-0 ml-2`}>
                                <IconComponent className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                              </div>
                            </div>
                          </CardContent>
                        </EnhancedCard>
                      </motion.div>
                    );
                  })}
                </div>

                <LuxuryAnalytics />
                <LuxuryQuickActions />
              </motion.div>
            )}

            {activeSection === "portfolio" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-luxury-charcoal-900 dark:text-white mb-1">Manajemen Portfolio</h2>
                  <p className="text-luxury-charcoal-500 dark:text-luxury-charcoal-400 text-sm">Kelola koleksi foto terbaik Anda</p>
                </div>
                <PortfolioManager />
              </motion.div>
            )}

            {activeSection === "bookings" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-luxury-charcoal-900 dark:text-white mb-1">Manajemen Booking</h2>
                  <p className="text-luxury-charcoal-500 dark:text-luxury-charcoal-400 text-sm">Lihat dan kelola jadwal booking klien</p>
                </div>
                <BookingManager />
              </motion.div>
            )}

            {activeSection === "messages" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-luxury-charcoal-900 dark:text-white mb-1">Pusat Pesan</h2>
                  <p className="text-luxury-charcoal-500 dark:text-luxury-charcoal-400 text-sm">Komunikasi dengan klien dan kelola pertanyaan</p>
                </div>
                <MessageManager />
              </motion.div>
            )}

            {activeSection === "reviews" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-luxury-charcoal-900 dark:text-white mb-1">Manajemen Ulasan</h2>
                  <p className="text-luxury-charcoal-500 dark:text-luxury-charcoal-400 text-sm">Monitor dan tanggapi ulasan dari klien</p>
                </div>
                <ReviewManager />
              </motion.div>
            )}

            {activeSection === "blog" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-luxury-charcoal-900 dark:text-white mb-1">Manajemen Blog</h2>
                  <p className="text-luxury-charcoal-500 dark:text-luxury-charcoal-400 text-sm">Buat dan kelola konten blog</p>
                </div>
                <BlogManager />
              </motion.div>
            )}

            {activeSection === "faq" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-luxury-charcoal-900 dark:text-white mb-1">Manajemen FAQ</h2>
                  <p className="text-luxury-charcoal-500 dark:text-luxury-charcoal-400 text-sm">Kelola pertanyaan yang sering ditanyakan</p>
                </div>
                <FAQManager />
              </motion.div>
            )}

            {activeSection === "settings" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-luxury-charcoal-900 dark:text-white mb-1">Pengaturan Sistem</h2>
                  <p className="text-luxury-charcoal-500 dark:text-luxury-charcoal-400 text-sm">Konfigurasi preferensi sistem dan akun</p>
                </div>
                <SettingsManager />
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
