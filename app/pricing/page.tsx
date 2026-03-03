"use client"
import { motion } from "framer-motion"
import { Check, Camera, ArrowRight, Zap } from "lucide-react"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import Link from "next/link"

const pricingPlans = [
  {
    name: "Basic",
    badge: null,
    price: "Rp 800.000",
    priceNote: "per sesi",
    description: "Cocok untuk portrait & acara kecil",
    features: ["Sesi foto 2 jam", "50 foto diedit", "Online gallery", "Soft copy HD", "Revisi 1x"],
    cta: "Pilih Paket Basic",
    variant: "outline" as const,
  },
  {
    name: "Standard",
    badge: "Paling Populer",
    price: "Rp 2.500.000",
    priceNote: "per event",
    description: "Ideal untuk wedding & acara besar",
    features: ["Sesi foto 6 jam", "200 foto diedit", "Online gallery premium", "Cetak foto 4R (20 lembar)", "1 album foto 20x30cm", "Revisi 2x", "Delivery 5 hari"],
    cta: "Pilih Paket Standard",
    variant: "primary" as const,
    highlighted: true,
  },
  {
    name: "Premium",
    badge: "Terlengkap",
    price: "Rp 5.000.000",
    priceNote: "per event",
    description: "Paket paling komprehensif & eksklusif",
    features: ["Sesi foto full day", "500+ foto diedit", "2 fotografer", "Video highlights 3 menit", "Album foto premium 30x40cm", "Cetak foto besar (2 buah)", "Online gallery eksklusif", "Revisi unlimited", "Delivery 3 hari"],
    cta: "Pilih Paket Premium",
    variant: "outline" as const,
  },
]

export default function PricingPage() {
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
              <Zap className="w-4 h-4" />
              Harga Paket
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-3 leading-tight">
              Pilih Paket yang Tepat
            </h1>
            <p className="text-luxury-charcoal-300 text-base lg:text-lg max-w-xl mx-auto">
              Harga transparan, kualitas terjamin. Semua paket bisa dikustomisasi sesuai kebutuhan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-14 lg:py-20 bg-gradient-to-br from-luxury-charcoal-50 to-white dark:from-luxury-charcoal-900 dark:to-luxury-charcoal-850">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative rounded-2xl ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-luxury-charcoal-900 to-luxury-charcoal-800 text-white shadow-luxury-lg ring-2 ring-luxury-gold-500 scale-[1.02]'
                    : 'bg-white dark:bg-luxury-charcoal-800 text-luxury-charcoal-900 dark:text-white shadow-luxury border border-luxury-charcoal-100 dark:border-luxury-charcoal-700'
                } overflow-hidden`}
              >
                {plan.badge && (
                  <div className="absolute top-0 left-0 right-0 bg-luxury-gold-500 text-white text-center py-1.5 text-xs font-bold uppercase tracking-wider">
                    ⭐ {plan.badge}
                  </div>
                )}
                <div className={`p-6 lg:p-7 ${plan.badge ? 'pt-10' : ''}`}>
                  <h3 className={`text-xl font-display font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-luxury-charcoal-900 dark:text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-5 ${plan.highlighted ? 'text-luxury-charcoal-300' : 'text-luxury-charcoal-500 dark:text-luxury-charcoal-400'}`}>
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className={`text-3xl font-bold ${plan.highlighted ? 'text-luxury-gold-400' : 'gradient-text-luxury'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm ml-1 ${plan.highlighted ? 'text-luxury-charcoal-400' : 'text-luxury-charcoal-500 dark:text-luxury-charcoal-400'}`}>
                      /{plan.priceNote}
                    </span>
                  </div>
                  
                  <ul className="space-y-2.5 mb-7">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          plan.highlighted ? 'bg-luxury-gold-500' : 'bg-gradient-to-br from-luxury-gold-500 to-luxury-teal-500'
                        }`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className={`text-sm ${plan.highlighted ? 'text-luxury-charcoal-200' : 'text-luxury-charcoal-600 dark:text-luxury-charcoal-300'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/book">
                    <EnhancedButton
                      variant={plan.highlighted ? "gradient" : "outline"}
                      fullWidth
                      className={`h-11 rounded-xl font-semibold text-sm ${
                        plan.highlighted
                          ? 'bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-600 hover:from-luxury-gold-600 hover:to-luxury-gold-700 text-white border-0'
                          : ''
                      }`}
                      icon={<ArrowRight className="w-4 h-4" />}
                      iconPosition="right"
                      animate
                      glow={plan.highlighted}
                    >
                      {plan.cta}
                    </EnhancedButton>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Package CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mt-12 p-8 bg-gradient-to-br from-luxury-gold-50 to-luxury-teal-50 dark:from-luxury-gold-900/15 dark:to-luxury-teal-900/15 rounded-2xl border border-luxury-gold-200/40 dark:border-luxury-gold-800/30"
          >
            <Camera className="w-10 h-10 text-luxury-gold-500 mx-auto mb-3" />
            <h3 className="text-xl font-display font-bold text-luxury-charcoal-900 dark:text-white mb-2">
              Butuh Paket Khusus?
            </h3>
            <p className="text-luxury-charcoal-600 dark:text-luxury-charcoal-300 mb-5 max-w-lg mx-auto text-sm">
              Kami bisa membuat paket yang disesuaikan 100% dengan kebutuhan dan budget Anda. Hubungi kami untuk konsultasi gratis.
            </p>
            <Link href="/contact">
              <EnhancedButton variant="outline" className="border-luxury-gold-400 text-luxury-gold-600 dark:text-luxury-gold-400 hover:bg-luxury-gold-50 dark:hover:bg-luxury-gold-900/20" animate>
                Konsultasi Gratis →
              </EnhancedButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
