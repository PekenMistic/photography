"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Camera } from "lucide-react"
import { useDatabase } from "@/lib/database-context"
import { motion } from "framer-motion"
import { EnhancedButton } from "@/components/ui/enhanced-button"

export default function ContactPage() {
  const { addMessage } = useDatabase()
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "", priority: "normal"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error')
      return
    }
    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      await addMessage({
        name: formData.name, email: formData.email, phone: formData.phone,
        subject: formData.subject || "Pertanyaan dari Contact Form",
        message: formData.message,
        priority: formData.priority as 'low' | 'normal' | 'high' | 'urgent',
        status: 'unread'
      })
      setSubmitStatus('success')
      setFormData({ name: "", email: "", phone: "", subject: "", message: "", priority: "normal" })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: Phone, title: "Telepon / WhatsApp", value: "+62 812-3456-7890", href: "tel:+6281234567890" },
    { icon: Mail, title: "Email", value: "hello@madiunphotography.com", href: "mailto:hello@madiunphotography.com" },
    { icon: MapPin, title: "Lokasi", value: "Kota Madiun, Jawa Timur", href: "#" },
    { icon: Clock, title: "Jam Kerja", value: "Senin–Sabtu, 08.00–20.00", href: "#" },
  ]

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
              <Camera className="w-4 h-4" />
              Hubungi Kami
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-3 leading-tight">
              Mari Berkolaborasi
            </h1>
            <p className="text-luxury-charcoal-300 text-base lg:text-lg max-w-xl mx-auto">
              Ceritakan momen impian Anda. Kami siap mewujudkannya.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 lg:py-20 bg-gradient-to-br from-luxury-charcoal-50 to-white dark:from-luxury-charcoal-900 dark:to-luxury-charcoal-850">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 space-y-5"
            >
              <div>
                <h2 className="text-2xl font-display font-bold text-luxury-charcoal-900 dark:text-white mb-1">Info Kontak</h2>
                <p className="text-sm text-luxury-charcoal-500 dark:text-luxury-charcoal-400">Jangan ragu untuk menghubungi kami</p>
              </div>

              <div className="space-y-3">
                {contactInfo.map(({ icon: Icon, title, value, href }) => (
                  <a
                    key={title}
                    href={href}
                    className="flex items-start gap-4 p-4 bg-white dark:bg-luxury-charcoal-800 rounded-xl shadow-luxury hover:shadow-luxury-lg border border-luxury-charcoal-100 dark:border-luxury-charcoal-700 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-luxury-gold-100 to-luxury-teal-50 dark:from-luxury-gold-900/30 dark:to-luxury-teal-900/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-luxury-gold-200 dark:group-hover:from-luxury-gold-900/50 transition-all duration-300">
                      <Icon className="w-5 h-5 text-luxury-gold-600 dark:text-luxury-gold-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-luxury-charcoal-500 dark:text-luxury-charcoal-400 uppercase tracking-wider mb-0.5">{title}</p>
                      <p className="text-sm font-medium text-luxury-charcoal-800 dark:text-luxury-charcoal-200">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Quick Book */}
              <div className="p-4 bg-gradient-to-br from-luxury-gold-50 to-luxury-teal-50 dark:from-luxury-gold-900/15 dark:to-luxury-teal-900/15 rounded-xl border border-luxury-gold-200/40 dark:border-luxury-gold-800/30">
                <h3 className="text-sm font-bold text-luxury-charcoal-900 dark:text-white mb-1">Mau langsung booking?</h3>
                <p className="text-xs text-luxury-charcoal-600 dark:text-luxury-charcoal-400 mb-3">Gunakan form booking untuk jadwal yang lebih cepat.</p>
                <a href="/book" className="flex items-center gap-2 text-sm font-semibold text-luxury-gold-600 dark:text-luxury-gold-400 hover:underline">
                  <Camera className="w-4 h-4" />
                  Buka Form Booking →
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <div className="bg-white dark:bg-luxury-charcoal-800 rounded-2xl shadow-luxury-lg p-6 lg:p-8 border border-luxury-charcoal-100 dark:border-luxury-charcoal-700">
                <h2 className="text-xl font-display font-bold text-luxury-charcoal-900 dark:text-white mb-5">
                  Kirim Pesan
                </h2>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl mb-5"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-800 dark:text-green-300 text-sm">Pesan terkirim!</p>
                      <p className="text-green-700 dark:text-green-400 text-xs">Kami akan menghubungi Anda segera.</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl mb-5"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-red-700 dark:text-red-400 text-sm">Lengkapi semua field wajib (*)</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm font-medium text-luxury-charcoal-700 dark:text-luxury-charcoal-300">Nama Lengkap *</Label>
                      <Input id="name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} required placeholder="Nama Anda" className="h-10 rounded-xl text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm font-medium text-luxury-charcoal-700 dark:text-luxury-charcoal-300">Email *</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required placeholder="email@contoh.com" className="h-10 rounded-xl text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm font-medium text-luxury-charcoal-700 dark:text-luxury-charcoal-300">No. Telepon</Label>
                      <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="+62 8xx-xxxx-xxxx" className="h-10 rounded-xl text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-luxury-charcoal-700 dark:text-luxury-charcoal-300">Jenis Layanan</Label>
                      <Select onValueChange={(v) => handleInputChange('subject', v)}>
                        <SelectTrigger className="h-10 rounded-xl text-sm">
                          <SelectValue placeholder="Pilih layanan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Wedding Photography">Wedding Photography</SelectItem>
                          <SelectItem value="Portrait Photography">Portrait Photography</SelectItem>
                          <SelectItem value="Event Photography">Event Photography</SelectItem>
                          <SelectItem value="Family Photography">Family Photography</SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-sm font-medium text-luxury-charcoal-700 dark:text-luxury-charcoal-300">Pesan *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      placeholder="Ceritakan kebutuhan fotografi Anda, tanggal, lokasi, dan detail lainnya..."
                      className="min-h-[120px] rounded-xl text-sm resize-none"
                    />
                  </div>
                  <EnhancedButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    icon={<Send className="w-4 h-4" />}
                    iconPosition="left"
                    className="bg-gradient-to-r from-luxury-charcoal-900 to-luxury-charcoal-800 hover:from-luxury-gold-600 hover:to-luxury-gold-500 text-white h-12 rounded-xl"
                    animate
                    glow
                  >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                  </EnhancedButton>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
