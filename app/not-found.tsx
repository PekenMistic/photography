"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Camera, Home, ArrowRight } from "lucide-react"
import { EnhancedButton } from "@/components/ui/enhanced-button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-luxury-charcoal-50 to-white dark:from-luxury-charcoal-900 dark:to-luxury-charcoal-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-luxury-gold-100 to-luxury-teal-50 dark:from-luxury-gold-900/30 dark:to-luxury-teal-900/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-luxury-gold-200 dark:border-luxury-gold-700/50">
          <Camera className="w-10 h-10 text-luxury-gold-500" />
        </div>
        <h1 className="text-6xl font-display font-bold gradient-text-luxury mb-3">404</h1>
        <h2 className="text-2xl font-display font-bold text-luxury-charcoal-900 dark:text-white mb-3">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-luxury-charcoal-600 dark:text-luxury-charcoal-300 mb-8">
          Momen yang Anda cari tampaknya belum diabadikan. Mari kembali ke beranda.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <EnhancedButton
              variant="primary"
              className="bg-gradient-to-r from-luxury-charcoal-900 to-luxury-charcoal-800 hover:from-luxury-gold-600 hover:to-luxury-gold-500 text-white"
              icon={<Home className="w-4 h-4" />}
              animate
            >
              Kembali ke Beranda
            </EnhancedButton>
          </Link>
          <Link href="/contact">
            <EnhancedButton variant="outline" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
              Hubungi Kami
            </EnhancedButton>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
