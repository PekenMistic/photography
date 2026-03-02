"use client"

import { motion } from "framer-motion"
import { Star, Users, Camera, Heart, Loader2, MessageSquare } from "lucide-react"
import { useDatabase } from "@/lib/database-context"
import LuxuryTestimonials from "@/components/luxury/LuxuryTestimonials"
import ReviewForm from "@/components/ReviewForm"
import { EnhancedCard, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/enhanced-card"

export default function ReviewsPage() {
  const { reviews, loading, stats } = useDatabase()

  const approvedReviews = reviews.filter(r => r.approved)
  const avgRating = approvedReviews.length > 0
    ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length).toFixed(1)
    : "0.0"

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-luxury-charcoal-900 via-luxury-charcoal-800 to-luxury-charcoal-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-luxury-gold-500/15 rounded-full blur-3xl animate-luxury-float"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-luxury-teal-500/10 rounded-full blur-3xl animate-luxury-float" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-luxury-gold-500/20 text-luxury-gold-300 rounded-full text-sm font-semibold border border-luxury-gold-500/30 mb-5">
              <Star className="w-4 h-4 fill-luxury-gold-400 text-luxury-gold-400" />
              Ulasan Klien
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-3 leading-tight">
              Kata Mereka tentang Kami
            </h1>
            <p className="text-luxury-charcoal-300 text-base lg:text-lg max-w-xl mx-auto">
              Kepuasan klien adalah prioritas utama kami. Simak pengalaman nyata dari mereka.
            </p>

            {/* Quick Stats */}
            {!loading && approvedReviews.length > 0 && (
              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-gold-400">{avgRating}</div>
                  <div className="flex justify-center mt-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-4 h-4 ${parseFloat(avgRating) >= i ? 'text-luxury-gold-400 fill-luxury-gold-400' : 'text-luxury-charcoal-600'}`} />
                    ))}
                  </div>
                  <div className="text-luxury-charcoal-400 text-xs mt-1">Rating Rata-rata</div>
                </div>
                <div className="w-px h-12 bg-luxury-charcoal-700"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{approvedReviews.length}</div>
                  <div className="text-luxury-charcoal-400 text-xs mt-1">Total Ulasan</div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <LuxuryTestimonials />

      {/* Leave a Review Form */}
      <section className="py-14 lg:py-20 bg-gradient-to-br from-luxury-charcoal-50 to-white dark:from-luxury-charcoal-900 dark:to-luxury-charcoal-850">
        <div className="max-w-2xl mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <EnhancedCard variant="elevated">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-luxury-gold-100 to-luxury-teal-50 dark:from-luxury-gold-900/30 dark:to-luxury-teal-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-6 h-6 text-luxury-gold-600 dark:text-luxury-gold-400" />
                </div>
                <CardTitle className="text-xl font-display">Bagikan Pengalaman Anda</CardTitle>
                <CardDescription>Ulasan Anda sangat berarti bagi kami dan calon klien lainnya.</CardDescription>
              </CardHeader>
              <CardContent>
                <ReviewForm />
              </CardContent>
            </EnhancedCard>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
