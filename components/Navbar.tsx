"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/ModeToggle"
import { Menu, Camera, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  const routes = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]

  // Close menu when route changes
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-luxury-charcoal-900/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-luxury-charcoal-900/80 shadow-sm border-luxury-charcoal-200/20 dark:border-luxury-charcoal-800/30">
      <div className="max-w-7xl mx-auto flex h-16 lg:h-20 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
          <div className="relative">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-luxury-charcoal-900 to-luxury-charcoal-700 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-luxury group-hover:shadow-luxury-lg transition-all duration-300 group-hover:scale-105 border border-luxury-gold-400/20">
              <Camera className="w-5 h-5 lg:w-6 lg:h-6 text-luxury-gold-400" />
            </div>
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-luxury-gold-500 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-[8px]">✨</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base lg:text-xl gradient-text-luxury leading-tight">
              Madiun Photography
            </span>
            <span className="text-[10px] lg:text-xs text-luxury-charcoal-400 dark:text-luxury-charcoal-500 font-medium hidden sm:block">
              Luxury Visual Stories
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-1 bg-luxury-charcoal-50/80 dark:bg-luxury-charcoal-800/60 rounded-full px-2 py-1.5 border border-luxury-charcoal-100 dark:border-luxury-charcoal-700/50 shadow-inner">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                pathname === route.href
                  ? "bg-white dark:bg-luxury-charcoal-700 text-luxury-charcoal-900 dark:text-white shadow-luxury font-semibold"
                  : "text-luxury-charcoal-600 dark:text-luxury-charcoal-300 hover:text-luxury-charcoal-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-luxury-charcoal-700/60"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 lg:gap-3">
          <ModeToggle />
          
          <Link
            href="/book"
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-luxury-charcoal-900 to-luxury-charcoal-800 hover:from-luxury-gold-600 hover:to-luxury-gold-500 text-white px-4 py-2 lg:px-5 lg:py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-luxury hover:shadow-glow"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden w-10 h-10 flex items-center justify-center bg-luxury-charcoal-100 dark:bg-luxury-charcoal-800 rounded-xl text-luxury-charcoal-700 dark:text-luxury-charcoal-300 hover:bg-luxury-charcoal-200 dark:hover:bg-luxury-charcoal-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="xl:hidden border-t border-luxury-charcoal-100 dark:border-luxury-charcoal-800 bg-white dark:bg-luxury-charcoal-900 overflow-hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {routes.map((route, index) => (
                <motion.div
                  key={route.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                >
                  <Link
                    href={route.href}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      pathname === route.href
                        ? "bg-gradient-to-r from-luxury-gold-50 to-luxury-teal-50 dark:from-luxury-gold-900/20 dark:to-luxury-teal-900/20 text-luxury-charcoal-900 dark:text-white border border-luxury-gold-200/50 dark:border-luxury-gold-700/30"
                        : "text-luxury-charcoal-700 dark:text-luxury-charcoal-300 hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-800"
                    )}
                  >
                    {route.label}
                    {pathname === route.href && (
                      <span className="ml-auto w-1.5 h-1.5 bg-luxury-gold-500 rounded-full"></span>
                    )}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: routes.length * 0.04 }}
                className="pt-2"
              >
                <Link
                  href="/book"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-luxury-charcoal-900 to-luxury-charcoal-800 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:from-luxury-gold-600 hover:to-luxury-gold-500 transition-all duration-300"
                >
                  <Camera className="w-4 h-4" />
                  Book Your Session
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
