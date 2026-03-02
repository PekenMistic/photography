import LuxuryServices from "@/components/luxury/LuxuryServices"
import LuxuryFAQ from "@/components/luxury/LuxuryFAQ"
import LuxuryCTA from "@/components/luxury/LuxuryCTA"
import { Camera } from "lucide-react"

export const metadata = {
  title: "Layanan - Madiun Photography",
  description: "Lihat berbagai layanan fotografi profesional kami: wedding, portrait, event, family, dan corporate photography.",
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="relative py-14 lg:py-20 bg-gradient-to-br from-luxury-charcoal-900 via-luxury-charcoal-800 to-luxury-charcoal-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-20 w-48 h-48 bg-luxury-gold-500/15 rounded-full blur-3xl animate-luxury-float"></div>
          <div className="absolute bottom-10 right-20 w-64 h-64 bg-luxury-teal-500/10 rounded-full blur-3xl animate-luxury-float" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-luxury-gold-500/20 text-luxury-gold-300 rounded-full text-sm font-semibold border border-luxury-gold-500/30 mb-5">
            <Camera className="w-4 h-4" />
            Layanan Kami
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-3 leading-tight">
            Layanan Fotografi Profesional
          </h1>
          <p className="text-luxury-charcoal-300 text-base lg:text-lg max-w-xl mx-auto">
            Dari momen intim hingga perayaan besar, kami hadir untuk mengabadikan setiap cerita.
          </p>
        </div>
      </section>

      <LuxuryServices />
      <LuxuryFAQ />
      <LuxuryCTA />
    </div>
  )
}
