"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Camera, Award, Users, Heart, Star, CheckCircle, ArrowRight } from "lucide-react"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import Link from "next/link"

export default function AboutPage() {
  const expertise = [
    { title: "Wedding Photography", description: "Mengabadikan kisah cinta dengan elegan dan penuh emosi", icon: Heart, color: "from-luxury-gold-500 to-luxury-gold-600" },
    { title: "Portrait Photography", description: "Potret profesional yang menampilkan kepribadian terbaik", icon: Users, color: "from-luxury-teal-500 to-luxury-teal-600" },
    { title: "Event Photography", description: "Dokumentasi acara spesial dan perayaan penting", icon: Camera, color: "from-luxury-charcoal-700 to-luxury-charcoal-600" },
  ]

  const achievements = [
    { label: "Klien Puas", icon: Heart, key: "clients" },
    { label: "Foto Dikirim", icon: Camera, key: "photos" },
    { label: "Event Diliput", icon: Award, key: "events" },
    { label: "Tahun Pengalaman", icon: Star, key: "years" },
  ]

  const values = [
    "Keunggulan Profesional", "Visi Kreatif", "Kepuasan Klien",
    "Perhatian pada Detail", "Pengiriman Tepat Waktu", "Harga Terjangkau"
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-luxury-charcoal-900 via-luxury-charcoal-800 to-luxury-charcoal-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-luxury-gold-500/15 rounded-full blur-3xl animate-luxury-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-luxury-teal-500/10 rounded-full blur-3xl animate-luxury-float" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-luxury-gold-500/20 text-luxury-gold-300 rounded-full text-sm font-semibold border border-luxury-gold-500/30 mb-6">
              <Camera className="w-4 h-4" />
              Tentang Kami
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-tight">
              Madiun Photography
            </h1>
            <p className="text-lg lg:text-xl text-luxury-charcoal-300 max-w-2xl mx-auto">
              Temukan passion dan keahlian di balik lensa kami
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-luxury-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-luxury-gold-200/20 to-luxury-teal-200/10 dark:from-luxury-gold-900/15 dark:to-luxury-teal-900/10 rounded-3xl blur-xl"></div>
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-luxury-lg">
                <Image src="/images/photo.jpg" alt="About Madiun Photography" width={600} height={500} className="w-full h-auto object-cover" />
              </div>
              {/* Stats overlay */}
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-luxury-charcoal-800 rounded-2xl p-4 shadow-luxury border border-luxury-charcoal-100 dark:border-luxury-charcoal-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-luxury-gold-500 to-luxury-gold-600 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-luxury-charcoal-900 dark:text-white">5.0</div>
                    <div className="text-xs text-luxury-charcoal-500">Rating Sempurna</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-5 pt-8 lg:pt-0"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-luxury-gold-100 dark:bg-luxury-gold-900/20 text-luxury-gold-700 dark:text-luxury-gold-300 rounded-full text-xs font-semibold border border-luxury-gold-200 dark:border-luxury-gold-800/50">
                Kisah Kami
              </div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-luxury-charcoal-900 dark:text-white leading-tight">
                Passion di Balik Setiap Foto
              </h2>
              <div className="space-y-3 text-luxury-charcoal-600 dark:text-luxury-charcoal-300 leading-relaxed text-sm lg:text-base">
                <p>
                  Madiun Photography lahir dari kecintaan mendalam terhadap seni visual. Berawal dari hobi mengabadikan momen keluarga, kini kami hadir sebagai studio fotografi profesional yang dipercaya ratusan klien di Madiun dan sekitarnya.
                </p>
                <p>
                  Dengan lebih dari 5 tahun pengalaman, kami memahami bahwa setiap momen memiliki nilainya tersendiri. Inilah yang mendorong kami untuk selalu menghadirkan foto terbaik — bukan sekadar gambar, tapi kenangan yang berbicara.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {values.map((value, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-luxury-gold-500 flex-shrink-0" />
                    <span className="text-sm text-luxury-charcoal-700 dark:text-luxury-charcoal-300">{value}</span>
                  </div>
                ))}
              </div>
              <Link href="/book">
                <EnhancedButton
                  variant="primary"
                  className="bg-gradient-to-r from-luxury-charcoal-900 to-luxury-charcoal-800 hover:from-luxury-gold-600 hover:to-luxury-gold-500 text-white mt-2"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  animate
                >
                  Booking Session Sekarang
                </EnhancedButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 lg:py-20 bg-gradient-to-br from-luxury-gold-50 to-luxury-teal-50 dark:from-luxury-charcoal-800 dark:to-luxury-charcoal-850">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-5 lg:p-8 bg-white dark:bg-luxury-charcoal-800 rounded-2xl shadow-luxury border border-luxury-charcoal-100 dark:border-luxury-charcoal-700"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-luxury-gold-100 to-luxury-teal-50 dark:from-luxury-gold-900/30 dark:to-luxury-teal-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <achievement.icon className="w-6 h-6 text-luxury-gold-600 dark:text-luxury-gold-400" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold gradient-text-luxury mb-1">—</div>
                <div className="text-sm text-luxury-charcoal-500 dark:text-luxury-charcoal-400">{achievement.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-16 lg:py-24 bg-white dark:bg-luxury-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 lg:mb-14"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-luxury-charcoal-900 dark:text-white mb-3">
              Keahlian Kami
            </h2>
            <p className="text-luxury-charcoal-600 dark:text-luxury-charcoal-300 max-w-xl mx-auto text-sm lg:text-base">
              Spesialisasi kami mencakup berbagai jenis fotografi profesional
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group p-6 bg-gradient-to-br from-luxury-charcoal-50 to-white dark:from-luxury-charcoal-800 dark:to-luxury-charcoal-850 rounded-2xl border border-luxury-charcoal-100 dark:border-luxury-charcoal-700 hover:shadow-luxury-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-display font-bold text-luxury-charcoal-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-luxury-charcoal-600 dark:text-luxury-charcoal-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
