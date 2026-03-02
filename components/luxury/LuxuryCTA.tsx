"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ArrowRight, Star, Heart, Award, Users, Phone } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import Link from 'next/link';
import { useDatabase } from '@/lib/database-context';

const LuxuryCTA = () => {
  const { stats } = useDatabase();

  const displayStats = [
    { icon: Camera, value: stats?.totalPortfolioItems ? `${stats.totalPortfolioItems}+` : "—", label: "Momen Diabadikan" },
    { icon: Award, value: stats?.totalBookings ? `${stats.totalBookings}+` : "—", label: "Klien Dilayani" },
    { icon: Users, value: "—", label: "Penghargaan" },
    { icon: Star, value: stats?.averageRating ? stats.averageRating.toFixed(1) : "—", label: "Rating Rata-rata" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-luxury-charcoal-900 via-luxury-charcoal-800 to-luxury-charcoal-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-luxury-gold-400/20 to-luxury-teal-400/20 rounded-full blur-3xl animate-luxury-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-luxury-teal-400/20 to-luxury-gold-400/20 rounded-full blur-3xl animate-luxury-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(243,167,63,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(243,167,63,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 lg:px-6">
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16"
        >
          {displayStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-4 lg:p-5 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-luxury-gold-500/20 to-luxury-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-2 border border-luxury-gold-400/20">
                <stat.icon className="w-5 h-5 text-luxury-gold-400" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-xs text-luxury-charcoal-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-luxury-gold-500/15 text-luxury-gold-300 rounded-full text-sm font-semibold border border-luxury-gold-500/25">
            <Heart className="w-4 h-4 fill-luxury-gold-400 text-luxury-gold-400" />
            Siap Mengabadikan Momen Anda?
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
            Mari Ciptakan{' '}
            <span className="gradient-text-luxury">Kenangan Indah</span>
            <br />Bersama Kami
          </h2>
          
          <p className="text-luxury-charcoal-300 max-w-xl mx-auto text-sm lg:text-base leading-relaxed">
            Setiap foto adalah warisan. Setiap momen adalah seni. Hubungi kami sekarang dan wujudkan visi Anda bersama fotografer profesional kami.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/book">
              <EnhancedButton
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-600 hover:from-luxury-gold-600 hover:to-luxury-gold-700 text-white shadow-luxury-lg hover:shadow-glow px-7 py-3.5 text-base font-semibold w-full sm:w-auto"
                icon={<Camera className="w-5 h-5" />}
                animate
                glow
              >
                Booking Sekarang
              </EnhancedButton>
            </Link>
            <Link href="/contact">
              <EnhancedButton
                variant="outline"
                size="lg"
                className="border-2 border-luxury-gold-400/50 text-luxury-gold-300 hover:border-luxury-gold-400 hover:bg-luxury-gold-500/10 px-7 py-3.5 text-base font-semibold w-full sm:w-auto"
                icon={<Phone className="w-5 h-5" />}
                animate
              >
                Hubungi Kami
              </EnhancedButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LuxuryCTA;
