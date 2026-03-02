"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Users, Building, Star, ArrowRight, Check, Loader2 } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { useDatabase } from '@/lib/database-context';
import Link from 'next/link';
import Image from 'next/image';

const LuxuryServices = () => {
  const { services, loading, error } = useDatabase();

  const serviceIcons: Record<string, React.ElementType> = {
    Wedding: Heart,
    Portrait: Camera,
    Family: Users,
    Corporate: Building,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-white dark:bg-luxury-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col items-center justify-center min-h-[300px] gap-4">
          <Loader2 className="w-10 h-10 text-luxury-gold-500 animate-spin" />
          <p className="text-luxury-charcoal-500 dark:text-luxury-charcoal-400">Memuat layanan...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 lg:py-24 bg-white dark:bg-luxury-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-red-600 dark:text-red-400 text-sm">Gagal memuat layanan: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-luxury-charcoal-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-luxury-gold-400/8 to-luxury-teal-400/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-luxury-teal-400/8 to-luxury-gold-400/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-luxury-gold-100 dark:bg-luxury-gold-900/20 text-luxury-gold-700 dark:text-luxury-gold-300 rounded-full text-sm font-semibold border border-luxury-gold-200 dark:border-luxury-gold-800/50 mb-5">
            <Camera className="w-4 h-4" />
            Layanan Kami
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-4">
            <span className="text-luxury-charcoal-900 dark:text-luxury-charcoal-100">Layanan Fotografi</span>
            <br />
            <span className="gradient-text-luxury">Profesional & Berkelas</span>
          </h2>
          <p className="text-base lg:text-lg text-luxury-charcoal-600 dark:text-luxury-charcoal-300 max-w-2xl mx-auto leading-relaxed">
            Dari potret intim hingga perayaan megah, kami menciptakan kisah visual yang menangkap esensi momen berharga Anda.
          </p>
        </motion.div>

        {/* Services Grid or Empty State */}
        {services.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-luxury-gold-50 dark:bg-luxury-gold-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-10 h-10 text-luxury-gold-400" />
            </div>
            <h3 className="text-xl font-display font-bold text-luxury-charcoal-700 dark:text-luxury-charcoal-300 mb-2">
              Belum Ada Layanan
            </h3>
            <p className="text-luxury-charcoal-500 dark:text-luxury-charcoal-400 text-sm max-w-sm mx-auto">
              Tambahkan layanan melalui panel admin untuk menampilkannya di sini.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {services.map((service) => {
              const IconComponent = serviceIcons[service.category as keyof typeof serviceIcons] || Camera;
              const priceDisplay = service.priceFrom
                ? `Mulai Rp ${Number(service.priceFrom).toLocaleString('id-ID')}`
                : 'Hubungi kami';

              return (
                <motion.div key={service.id} variants={itemVariants} className="group relative">
                  <div className="bg-white dark:bg-luxury-charcoal-800 rounded-2xl lg:rounded-3xl overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-500 border border-luxury-charcoal-100/80 dark:border-luxury-charcoal-700/50 hover:border-luxury-gold-200 dark:hover:border-luxury-gold-800/50 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-52 lg:h-60 overflow-hidden bg-luxury-charcoal-100 dark:bg-luxury-charcoal-700 flex-shrink-0">
                      <Image
                        src={service.imageUrl || "/placeholder.svg"}
                        alt={service.name}
                        width={400}
                        height={260}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal-900/50 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4 w-10 h-10 bg-white/95 dark:bg-luxury-charcoal-800/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-luxury">
                        <IconComponent className="w-5 h-5 text-luxury-gold-600 dark:text-luxury-gold-400" />
                      </div>
                      {service.popular && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-600 text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          Populer
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-end justify-between">
                          <div>
                            <div className="text-white/70 text-xs font-medium">Harga</div>
                            <div className="text-white text-base font-bold leading-tight">{priceDisplay}</div>
                          </div>
                          {service.duration && (
                            <div className="text-right">
                              <div className="text-white/70 text-xs font-medium">Durasi</div>
                              <div className="text-white text-sm font-semibold">{service.duration}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 lg:p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-display font-bold text-luxury-charcoal-900 dark:text-luxury-charcoal-100 group-hover:text-luxury-gold-600 dark:group-hover:text-luxury-gold-400 transition-colors duration-300 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-sm text-luxury-charcoal-600 dark:text-luxury-charcoal-300 mb-4 leading-relaxed flex-grow">
                        {service.description || 'Layanan fotografi profesional sesuai kebutuhan Anda.'}
                      </p>

                      {(service.features || []).length > 0 && (
                        <div className="space-y-2 mb-5">
                          {(service.features || []).slice(0, 4).map((feature, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                              <div className="w-4 h-4 bg-gradient-to-br from-luxury-gold-500 to-luxury-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                              <span className="text-xs text-luxury-charcoal-600 dark:text-luxury-charcoal-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2 mt-auto">
                        <Link href="/book" className="flex-1">
                          <EnhancedButton className="w-full bg-gradient-to-r from-luxury-charcoal-900 to-luxury-charcoal-800 hover:from-luxury-gold-600 hover:to-luxury-gold-500 text-white text-sm font-semibold h-10 rounded-xl" animate>
                            Booking <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </EnhancedButton>
                        </Link>
                        <Link href={`/services#${service.id}`}>
                          <EnhancedButton variant="outline" className="border-luxury-charcoal-200 dark:border-luxury-charcoal-600 text-luxury-charcoal-600 dark:text-luxury-charcoal-300 hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-700 text-sm h-10 rounded-xl px-3">
                            Detail
                          </EnhancedButton>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-12 lg:mt-16"
        >
          <div className="bg-gradient-to-br from-luxury-gold-50 to-luxury-teal-50 dark:from-luxury-gold-900/15 dark:to-luxury-teal-900/15 rounded-2xl lg:rounded-3xl p-8 lg:p-10 border border-luxury-gold-200/40 dark:border-luxury-gold-800/30">
            <h3 className="text-xl lg:text-2xl font-display font-bold text-luxury-charcoal-900 dark:text-luxury-charcoal-100 mb-2">Butuh Paket Khusus?</h3>
            <p className="text-luxury-charcoal-600 dark:text-luxury-charcoal-300 mb-6 max-w-xl mx-auto text-sm lg:text-base">
              Setiap cerita unik. Mari buat paket fotografi personal yang sempurna untuk visi Anda.
            </p>
            <Link href="/contact">
              <EnhancedButton variant="accent" size="lg" className="bg-gradient-to-r from-luxury-gold-500 to-luxury-teal-500 hover:from-luxury-gold-600 hover:to-luxury-teal-600 text-white shadow-luxury-lg hover:shadow-glow px-8 py-3.5" animate glow>
                Dapatkan Penawaran Khusus <ArrowRight className="w-5 h-5 ml-2" />
              </EnhancedButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LuxuryServices;
