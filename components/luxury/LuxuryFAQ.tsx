"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, Camera, Clock, DollarSign, Users } from 'lucide-react';
import { useDatabase } from '@/lib/database-context';

const LuxuryFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { faqs, loading, error } = useDatabase();

  // Get active FAQs sorted by order
  const activeFaqs = faqs
    .filter(faq => faq.active)
    .sort((a, b) => a.order - b.order);

  // Map category to icon
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'services':
        return Camera;
      case 'pricing':
        return DollarSign;
      case 'booking':
        return Clock;
      case 'process':
      case 'general':
        return Users;
      default:
        return HelpCircle;
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading FAQs</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-luxury-charcoal-50 to-white dark:from-luxury-charcoal-900 dark:to-luxury-charcoal-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-luxury-gold-400/10 to-luxury-teal-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-luxury-teal-400/10 to-luxury-gold-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-luxury-gold-400/5 to-luxury-teal-400/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-luxury-gold-100 dark:bg-luxury-gold-900/20 text-luxury-gold-700 dark:text-luxury-gold-300 rounded-full text-sm font-medium border border-luxury-gold-200 dark:border-luxury-gold-800 mb-6">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="text-luxury-charcoal-900 dark:text-luxury-charcoal-100">Everything You</span>
            <br />
            <span className="gradient-text-luxury">Need to Know</span>
          </h2>
          
          <p className="text-xl text-luxury-charcoal-600 dark:text-luxury-charcoal-300 max-w-3xl mx-auto leading-relaxed">
            Get answers to the most common questions about our luxury photography services, booking process, and what to expect.
          </p>
        </motion.div>

        {/* FAQ Items */}
        {activeFaqs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-luxury-gold-100 dark:bg-luxury-gold-900/20 rounded-full flex items-center justify-center">
              <HelpCircle className="w-12 h-12 text-luxury-gold-500" />
            </div>
            <h3 className="text-2xl font-bold text-luxury-charcoal-900 dark:text-white mb-4">
              No FAQs Available
            </h3>
            <p className="text-luxury-charcoal-600 dark:text-luxury-charcoal-400 max-w-md mx-auto">
              We&apos;re working on adding frequently asked questions. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeFaqs.map((faq, index) => {
              const IconComponent = getCategoryIcon(faq.category);
              const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-luxury-charcoal-900 rounded-3xl shadow-luxury hover:shadow-luxury-lg transition-all duration-500 border border-luxury-charcoal-200/50 dark:border-luxury-charcoal-800/50 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-8 text-left flex items-center justify-between hover:bg-luxury-gold-50/50 dark:hover:bg-luxury-gold-900/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isOpen 
                        ? "bg-gradient-to-br from-luxury-gold-500 to-luxury-teal-500 text-white shadow-luxury" 
                        : "bg-luxury-gold-100 dark:bg-luxury-gold-900/20 text-luxury-gold-600 dark:text-luxury-gold-400"
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-luxury-gold-600 dark:text-luxury-gold-400 mb-1">
                        {faq.category}
                      </div>
                      <h3 className="text-lg md:text-xl font-display font-semibold text-luxury-charcoal-900 dark:text-luxury-charcoal-100">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen 
                      ? "bg-luxury-gold-500 text-white rotate-180" 
                      : "bg-luxury-charcoal-100 dark:bg-luxury-charcoal-800 text-luxury-charcoal-600 dark:text-luxury-charcoal-400"
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8">
                        <div className="pl-16">
                          <p className="text-luxury-charcoal-600 dark:text-luxury-charcoal-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-luxury-gold-50 to-luxury-teal-50 dark:from-luxury-gold-900/10 dark:to-luxury-teal-900/10 rounded-3xl p-8 border border-luxury-gold-200/50 dark:border-luxury-gold-800/50">
            <h3 className="text-2xl font-display font-bold text-luxury-charcoal-900 dark:text-luxury-charcoal-100 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-luxury-charcoal-600 dark:text-luxury-charcoal-300 mb-6 max-w-2xl mx-auto">
              We&apos;re here to help! Don&apos;t hesitate to reach out if you have any other questions about our photography services or booking process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-luxury-charcoal-900 to-luxury-charcoal-800 hover:from-luxury-charcoal-800 hover:to-luxury-charcoal-700 text-white px-8 py-4 rounded-full font-semibold shadow-luxury hover:shadow-glow transition-all duration-500 border border-luxury-gold-400/20 hover:border-luxury-gold-400/40">
                Contact Us
              </button>
              <button className="border-2 border-luxury-charcoal-300 dark:border-luxury-charcoal-700 text-luxury-charcoal-700 dark:text-luxury-charcoal-300 hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-800 px-8 py-4 rounded-full font-semibold transition-all duration-300">
                Schedule Consultation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LuxuryFAQ;

