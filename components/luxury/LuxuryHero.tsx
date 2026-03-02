"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Award, Users, Star, ArrowRight, Play, ChevronDown } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { useDatabase } from '@/lib/database-context';
import Link from 'next/link';
import Image from 'next/image';

const LuxuryHero = () => {
  const { stats: dbStats } = useDatabase();

  // Stats configuration - values come from DB
  const stats = [
    { icon: Camera, label: "Momen Diabadikan" },
    { icon: Award, label: "Penghargaan" },
    { icon: Users, label: "Klien Puas" },
    { icon: Star, label: "Rating" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-luxury-charcoal-50 via-white to-luxury-gold-50 dark:from-luxury-charcoal-900 dark:via-luxury-charcoal-850 dark:to-luxury-charcoal-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-br from-luxury-gold-400/15 to-luxury-teal-400/15 rounded-full blur-3xl animate-luxury-float"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-br from-luxury-teal-400/15 to-luxury-gold-400/15 rounded-full blur-3xl animate-luxury-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-luxury-charcoal-400/8 to-luxury-gold-400/8 rounded-full blur-2xl animate-luxury-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(28,25,23,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(28,25,23,0.025)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 lg:space-y-8 order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-luxury-gold-100 dark:bg-luxury-gold-900/30 text-luxury-gold-700 dark:text-luxury-gold-300 rounded-full text-sm font-semibold border border-luxury-gold-200 dark:border-luxury-gold-700/50 shadow-sm"
            >
              <Award className="w-4 h-4" />
              Studio Fotografi Profesional Madiun
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.05]">
                <span className="text-luxury-charcoal-900 dark:text-luxury-charcoal-50">Mengabadikan</span>
                <br />
                <span className="gradient-text-luxury">Momen</span>
                <br />
                <span className="text-luxury-charcoal-900 dark:text-luxury-charcoal-50">Berharga Anda</span>
              </h1>
              
              <p className="text-base lg:text-lg text-luxury-charcoal-600 dark:text-luxury-charcoal-300 leading-relaxed max-w-xl pt-2">
                Transformasikan kenangan berharga Anda menjadi kisah visual yang memukau. Setiap frame bercerita, setiap momen menjadi abadi bersama Madiun Photography.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link href="/book">
                <EnhancedButton
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-luxury-charcoal-900 to-luxury-charcoal-800 hover:from-luxury-gold-600 hover:to-luxury-gold-500 text-white shadow-luxury-lg hover:shadow-glow transition-all duration-400 px-7 py-3.5 text-base font-semibold w-full sm:w-auto"
                  icon={<Camera className="w-5 h-5" />}
                  animate
                  glow
                >
                  Booking Sekarang
                </EnhancedButton>
              </Link>
              
              <Link href="/portfolio">
                <EnhancedButton
                  variant="outline"
                  size="lg"
                  className="border-2 border-luxury-charcoal-200 dark:border-luxury-charcoal-700 text-luxury-charcoal-700 dark:text-luxury-charcoal-200 hover:border-luxury-gold-400 hover:bg-luxury-gold-50 dark:hover:bg-luxury-gold-900/20 px-7 py-3.5 text-base font-semibold w-full sm:w-auto"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                  animate
                >
                  Lihat Portfolio
                </EnhancedButton>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-4 gap-3 lg:gap-4 pt-2"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-luxury-gold-100 to-luxury-teal-50 dark:from-luxury-gold-900/30 dark:to-luxury-teal-900/20 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-sm border border-luxury-gold-200/30 dark:border-luxury-gold-700/20">
                    <stat.icon className="w-4 h-4 lg:w-5 lg:h-5 text-luxury-gold-600 dark:text-luxury-gold-400" />
                  </div>
                  <div className="text-lg lg:text-2xl font-bold text-luxury-charcoal-900 dark:text-luxury-charcoal-100 leading-tight">
                    {index === 0 ? (dbStats?.totalPortfolioItems ? `${dbStats.totalPortfolioItems}+` : '—') :
                     index === 2 ? (dbStats?.totalBookings ? `${dbStats.totalBookings}+` : '—') :
                     index === 3 ? (dbStats?.averageRating ? dbStats.averageRating.toFixed(1) : '—') : '—'}
                  </div>
                  <div className="text-[10px] lg:text-xs text-luxury-charcoal-500 dark:text-luxury-charcoal-400 leading-tight mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Decorative background shape */}
              <div className="absolute -inset-4 bg-gradient-to-br from-luxury-gold-200/30 to-luxury-teal-200/20 dark:from-luxury-gold-900/20 dark:to-luxury-teal-900/10 rounded-3xl blur-xl"></div>
              
              {/* Main Image Container */}
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-luxury-lg border border-white/50 dark:border-luxury-charcoal-700/50">
                <Image
                  src="/images/photo.jpg"
                  alt="Professional Photography by Madiun Photography"
                  width={520}
                  height={620}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal-900/30 via-transparent to-transparent"></div>
                
                {/* Play Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <button className="w-16 h-16 lg:w-20 lg:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-luxury-lg hover:shadow-glow transition-all duration-300 hover:scale-110 group border border-white/50">
                    <Play className="w-6 h-6 lg:w-8 lg:h-8 text-luxury-charcoal-900 ml-1 group-hover:text-luxury-gold-600 transition-colors duration-300" />
                  </button>
                </motion.div>
              </div>

              {/* Floating Badge - Available */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 bg-white dark:bg-luxury-charcoal-800 rounded-xl lg:rounded-2xl px-3 py-2 lg:px-4 lg:py-3 shadow-luxury border border-luxury-charcoal-100 dark:border-luxury-charcoal-700"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs lg:text-sm font-semibold text-luxury-charcoal-700 dark:text-luxury-charcoal-200">Tersedia Hari Ini</span>
                </div>
              </motion.div>

              {/* Floating Badge - Clients */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 bg-white dark:bg-luxury-charcoal-800 rounded-xl lg:rounded-2xl px-3 py-2 lg:px-4 lg:py-3 shadow-luxury border border-luxury-charcoal-100 dark:border-luxury-charcoal-700"
              >
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="flex -space-x-1.5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-luxury-gold-400 to-luxury-teal-400 rounded-full border-2 border-white dark:border-luxury-charcoal-800"></div>
                    ))}
                  </div>
                  <div>
                    <div className="text-xs lg:text-sm font-bold text-luxury-charcoal-900 dark:text-luxury-charcoal-100">1000+ Klien</div>
                    <div className="text-[10px] lg:text-xs text-luxury-charcoal-500 dark:text-luxury-charcoal-400">Mempercayai Kami</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-xs text-luxury-charcoal-400 dark:text-luxury-charcoal-500 font-medium hidden sm:block">Scroll untuk lihat lebih</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-luxury-charcoal-400 dark:text-luxury-charcoal-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LuxuryHero;
