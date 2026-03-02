import * as React from "react"
import Link from "next/link"
import { Instagram, Facebook, Twitter, Phone, MapPin, Heart, Camera, Mail, ArrowRight } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-luxury-charcoal-900 via-luxury-charcoal-850 to-luxury-charcoal-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxury-gold-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-luxury-teal-500/8 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 pt-14 lg:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10 lg:mb-12">
          
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group w-fit">
              <div className="w-10 h-10 bg-gradient-to-br from-luxury-gold-500 to-luxury-gold-600 rounded-xl flex items-center justify-center border border-luxury-gold-400/30 shadow-glow-sm">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg gradient-text-luxury">Madiun Photography</span>
            </Link>
            <p className="text-luxury-charcoal-300 text-sm leading-relaxed max-w-xs">
              Studio fotografi profesional di Madiun. Mengabadikan momen berharga Anda dengan visi artistik dan keahlian terbaik.
            </p>
            {/* Social Links */}
            <div className="flex space-x-2.5">
              {[
                { icon: Instagram, href: "#", label: "Instagram", hoverColor: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500" },
                { icon: Facebook, href: "#", label: "Facebook", hoverColor: "hover:bg-blue-600" },
                { icon: Twitter, href: "#", label: "Twitter / X", hoverColor: "hover:bg-sky-500" },
              ].map(({ icon: Icon, href, label, hoverColor }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`w-9 h-9 bg-white/8 rounded-lg flex items-center justify-center ${hoverColor} hover:scale-110 transition-all duration-300 border border-white/10`}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Menu</h3>
            <div className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "Tentang Kami" },
                { href: "/services", label: "Layanan" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/pricing", label: "Harga" },
                { href: "/blog", label: "Blog" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-1.5 text-luxury-charcoal-300 hover:text-luxury-gold-400 text-sm transition-colors duration-200 group w-fit"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Layanan</h3>
            <div className="space-y-2.5">
              {[
                "Wedding Photography",
                "Portrait Photography",
                "Event Photography",
                "Family Photography",
                "Corporate Photography",
                "Pre-Wedding",
              ].map((service) => (
                <Link
                  key={service}
                  href="/services"
                  className="flex items-center gap-1.5 text-luxury-charcoal-300 hover:text-luxury-gold-400 text-sm transition-colors duration-200 group w-fit"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  {service}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Kontak</h3>
            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-luxury-gold-500/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-luxury-gold-400" />
                </div>
                <span className="text-luxury-charcoal-300 text-sm leading-relaxed">
                  Kota Madiun, Jawa Timur, Indonesia
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-luxury-gold-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-luxury-gold-400" />
                </div>
                <a href="tel:+6281234567890" className="text-luxury-charcoal-300 hover:text-luxury-gold-400 text-sm transition-colors">
                  +62 812-3456-7890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-luxury-gold-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-luxury-gold-400" />
                </div>
                <a href="mailto:hello@madiunphotography.com" className="text-luxury-charcoal-300 hover:text-luxury-gold-400 text-sm transition-colors">
                  hello@madiunphotography.com
                </a>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-600 hover:from-luxury-gold-600 hover:to-luxury-gold-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-glow hover:shadow-glow-lg mt-2"
            >
              <Camera className="w-4 h-4" />
              Booking Sekarang
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-luxury-charcoal-700/60 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-luxury-charcoal-400">
            <p>© {currentYear} Madiun Photography. Semua hak dilindungi.</p>
            <div className="flex items-center gap-1">
              <span>Dibuat dengan</span>
              <Heart className="w-3 h-3 text-luxury-gold-500 fill-luxury-gold-500" />
              <span>di Madiun, Jawa Timur</span>
            </div>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-luxury-gold-400 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-luxury-gold-400 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
