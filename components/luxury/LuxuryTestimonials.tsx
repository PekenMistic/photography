"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Heart, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useDatabase } from '@/lib/database-context';

const LuxuryTestimonials = () => {
  const { reviews, loading, error } = useDatabase();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Wedding", "Portrait", "Family", "Corporate", "Maternity"];

  // Filter approved reviews only - use fallback if empty
  const approvedReviews = reviews.filter(review => review.approved);
  // Filter approved reviews only
  const filteredTestimonials = selectedCategory === "All" 
    ? approvedReviews 
    : approvedReviews.filter(t => t.serviceType === selectedCategory);

  const currentTestimonial = filteredTestimonials[currentIndex];

  useEffect(() => {
    if (filteredTestimonials.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [filteredTestimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-luxury-charcoal-900 via-luxury-charcoal-800 to-luxury-charcoal-900 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold-400 mx-auto"></div>
            <p className="mt-4 text-luxury-charcoal-300">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-gradient-to-br from-luxury-charcoal-900 via-luxury-charcoal-800 to-luxury-charcoal-900 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center py-20">
            <p className="text-red-400">Error loading testimonials: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-luxury-charcoal-900 via-luxury-charcoal-800 to-luxury-charcoal-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-luxury-gold-400/10 to-luxury-teal-400/10 rounded-full blur-3xl animate-luxury-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-luxury-teal-400/10 to-luxury-gold-400/10 rounded-full blur-3xl animate-luxury-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-luxury-gold-400/5 to-luxury-teal-400/5 rounded-full blur-2xl animate-luxury-float" style={{ animationDelay: '6s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-luxury-gold-100/10 text-luxury-gold-300 rounded-full text-sm font-medium border border-luxury-gold-400/20 mb-6">
            <Star className="w-4 h-4" />
            Client Stories
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="text-white">What Our Clients</span>
            <br />
            <span className="gradient-text-luxury">Say About Us</span>
          </h2>
          
          <p className="text-xl text-luxury-charcoal-300 max-w-3xl mx-auto leading-relaxed">
            Discover why hundreds of clients trust us to capture their most precious moments with unparalleled artistry and professionalism.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(category);
                setCurrentIndex(0);
              }}
              className={`rounded-full transition-all duration-500 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-luxury-gold-500 to-luxury-teal-500 text-white shadow-luxury border-0"
                  : "border-luxury-charcoal-600 text-luxury-charcoal-300 hover:bg-luxury-gold-500/10 hover:border-luxury-gold-400/50"
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-6xl mx-auto">
          {filteredTestimonials.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-luxury-charcoal-300">No testimonials available for this category.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {currentTestimonial && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  {/* Left Content */}
                  <div className="space-y-8">
                    {/* Quote Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-luxury-gold-500/20 to-luxury-teal-500/20 rounded-2xl flex items-center justify-center">
                      <Quote className="w-8 h-8 text-luxury-gold-400" />
                    </div>

                    {/* Testimonial Content */}
                    <div className="space-y-6">
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight">
                        "                                                                                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                        "{currentTestimonial.title || 'Amazing Experience'}""
                      </h3>
                      
                      <p className="text-lg text-luxury-charcoal-200 leading-relaxed">
                        {currentTestimonial.content}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-luxury-gold-400 text-luxury-gold-400" />
                      ))}
                      <span className="ml-2 text-luxury-charcoal-300">
                        {currentTestimonial.rating || 5}.0 out of 5
                      </span>
                    </div>

                    {/* Client Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image
                          src={currentTestimonial.imageUrl || "/placeholder.svg?height=60&width=60"}
                          alt={currentTestimonial.clientName}
                          width={60}
                          height={60}
                          className="rounded-full border-2 border-luxury-gold-400/30"
                        />
                        {currentTestimonial.featured && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-luxury-gold-500 rounded-full flex items-center justify-center">
                            <Heart className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-white">
                          {currentTestimonial.clientName}
                        </h4>
                        <p className="text-luxury-gold-300 text-sm">
                          {currentTestimonial.serviceType || 'Client'}
                        </p>
                        <p className="text-luxury-charcoal-400 text-xs">
                          {currentTestimonial.location || 'Location not specified'}
                        </p>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <Badge className="bg-gradient-to-r from-luxury-gold-500/20 to-luxury-teal-500/20 text-luxury-gold-300 border-luxury-gold-400/30">
                      <Camera className="w-3 h-3 mr-1" />
                      {currentTestimonial.serviceType || 'Photography'} Photography
                    </Badge>
                  </div>

                  {/* Right Content - Image/Video */}
                  <div className="relative">
                    <div className="relative rounded-3xl overflow-hidden shadow-luxury-lg">
                      <Image
                        src={currentTestimonial.imageUrl || "/placeholder.svg?height=500&width=600"}
                        alt={currentTestimonial.clientName}
                        width={600}
                        height={500}
                        className="w-full h-auto object-cover"
                      />
                      
                      {/* Video Play Button */}
                      {currentTestimonial.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Button
                            size="lg"
                            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300"
                          >
                            <Play className="w-8 h-8 ml-1" />
                          </Button>
                        </div>
                      )}

                      {/* Featured Badge */}
                      {currentTestimonial.featured && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-luxury-gold-500 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-luxury-gold-500/20 to-luxury-teal-500/20 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-luxury-teal-500/20 to-luxury-gold-500/20 rounded-full blur-xl"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Navigation Controls */}
          {filteredTestimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border-luxury-charcoal-600 text-luxury-charcoal-300 hover:bg-luxury-gold-500/10 hover:border-luxury-gold-400/50"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {filteredTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-luxury-gold-500 scale-125"
                        : "bg-luxury-charcoal-600 hover:bg-luxury-gold-500/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border-luxury-charcoal-600 text-luxury-charcoal-300 hover:bg-luxury-gold-500/10 hover:border-luxury-gold-400/50"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LuxuryTestimonials;
