"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Search, Tag, Eye, Heart, Camera, Loader2 } from 'lucide-react';
import { EnhancedCard, CardContent } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { useDatabase } from '@/lib/database-context';

const LuxuryBlog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { blogPosts, loading, error } = useDatabase();

  // Get published blog posts only
  const publishedPosts = blogPosts.filter(post => post.published);

  // Get unique categories from published posts
  const categories = ['all', ...Array.from(new Set(publishedPosts.map(post => post.category).filter(Boolean)))];

  const filteredPosts = publishedPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-charcoal-50 to-luxury-gold-50 dark:from-luxury-charcoal-900 dark:to-luxury-charcoal-800">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-luxury-charcoal-900 via-luxury-charcoal-800 to-luxury-charcoal-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-luxury-gold-500/10 rounded-full blur-3xl animate-luxury-float"></div>
          <div className="absolute bottom-10 right-20 w-64 h-64 bg-luxury-teal-500/8 rounded-full blur-3xl animate-luxury-float" style={{ animationDelay: '3s' }}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-luxury-gold-500/20 text-luxury-gold-300 rounded-full text-sm font-semibold border border-luxury-gold-500/30 mb-5">
              <Tag className="w-4 h-4" />
              Blog Fotografi
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-3 leading-tight">
              Inspirasi &{' '}
              <span className="gradient-text-luxury">Tips Fotografi</span>
            </h1>
            <p className="text-luxury-charcoal-300 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Temukan teknik fotografi profesional, inspirasi kreatif, dan cerita di balik setiap jepretan dari tim kami.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 py-10 lg:py-14">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-charcoal-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-10 rounded-xl text-sm bg-white dark:bg-luxury-charcoal-800"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-luxury-charcoal-900 dark:bg-luxury-gold-500 text-white shadow-luxury'
                      : 'bg-white dark:bg-luxury-charcoal-800 text-luxury-charcoal-600 dark:text-luxury-charcoal-300 border border-luxury-charcoal-200 dark:border-luxury-charcoal-700 hover:border-luxury-gold-300'
                  }`}
                >
                  {category === 'all' ? 'Semua' : category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-luxury-gold-500 animate-spin" />
            <p className="text-luxury-charcoal-500 dark:text-luxury-charcoal-400">Memuat artikel...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-red-600 dark:text-red-400 text-sm">Gagal memuat blog: {error}</p>
            </div>
          </div>
        )}

        {/* Empty State - No posts at all */}
        {!loading && !error && publishedPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-luxury-gold-50 dark:bg-luxury-gold-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-10 h-10 text-luxury-gold-400" />
            </div>
            <h3 className="text-xl font-display font-bold text-luxury-charcoal-700 dark:text-luxury-charcoal-300 mb-2">
              Belum Ada Artikel
            </h3>
            <p className="text-luxury-charcoal-500 dark:text-luxury-charcoal-400 text-sm max-w-sm mx-auto">
              Artikel blog akan muncul di sini setelah diterbitkan melalui panel admin.
            </p>
          </div>
        )}

        {/* No search results */}
        {!loading && !error && publishedPosts.length > 0 && filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-luxury-charcoal-100 dark:bg-luxury-charcoal-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-luxury-charcoal-400" />
            </div>
            <h3 className="text-lg font-semibold text-luxury-charcoal-700 dark:text-luxury-charcoal-300 mb-2">
              Tidak Ada Hasil
            </h3>
            <p className="text-luxury-charcoal-500 dark:text-luxury-charcoal-400 text-sm">
              Coba ubah kata kunci atau kategori filter.
            </p>
          </motion.div>
        )}

        {/* Featured Post */}
        {!loading && !error && featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10"
          >
            <EnhancedCard variant="glass" hover animate className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-56 lg:h-auto min-h-[220px] bg-luxury-charcoal-100 dark:bg-luxury-charcoal-800">
                  <Image
                    src={featuredPost.image || '/placeholder.svg'}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-luxury-gold-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                      ⭐ Featured
                    </span>
                  </div>
                </div>

                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-luxury-charcoal-500 dark:text-luxury-charcoal-400 mb-3">
                    {featuredPost.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(featuredPost.date).toLocaleDateString('id-ID')}
                      </span>
                    )}
                    {featuredPost.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredPost.readTime}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {featuredPost.views || 0}
                    </span>
                  </div>

                  <h2 className="text-xl lg:text-2xl font-display font-bold text-luxury-charcoal-900 dark:text-white mb-3 leading-tight">
                    {featuredPost.title}
                  </h2>

                  {featuredPost.excerpt && (
                    <p className="text-luxury-charcoal-600 dark:text-luxury-charcoal-300 mb-5 leading-relaxed text-sm line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-gradient-to-br from-luxury-gold-500 to-luxury-teal-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-luxury-charcoal-900 dark:text-white">{featuredPost.author}</p>
                        <p className="text-xs text-luxury-charcoal-500 dark:text-luxury-charcoal-400">{featuredPost.category}</p>
                      </div>
                    </div>

                    {/* Link ke /blog/[id] */}
                    <Link href={`/blog/${featuredPost.id}`}>
                      <EnhancedButton
                        variant="gradient"
                        size="sm"
                        icon={<ArrowRight className="w-4 h-4" />}
                        iconPosition="right"
                        animate
                      >
                        Baca Selengkapnya
                      </EnhancedButton>
                    </Link>
                  </div>
                </div>
              </div>
            </EnhancedCard>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        {!loading && !error && regularPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
              >
                <EnhancedCard variant="elevated" hover animate className="h-full overflow-hidden group flex flex-col">
                  <div className="relative h-44 bg-luxury-charcoal-100 dark:bg-luxury-charcoal-800 flex-shrink-0">
                    <Image
                      src={post.image || '/placeholder.svg'}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {post.category && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-luxury-charcoal-800/80 backdrop-blur-sm text-white text-[10px] font-semibold rounded-full">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-luxury-charcoal-500 dark:text-luxury-charcoal-400 mb-2.5">
                      {post.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('id-ID')}
                        </span>
                      )}
                      {post.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-display font-bold text-luxury-charcoal-900 dark:text-white mb-2.5 line-clamp-2 flex-grow-0 group-hover:text-luxury-gold-600 dark:group-hover:text-luxury-gold-400 transition-colors">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-luxury-charcoal-600 dark:text-luxury-charcoal-300 mb-4 flex-1 line-clamp-2 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-3.5 border-t border-luxury-charcoal-100 dark:border-luxury-charcoal-700 mt-auto">
                      <div className="flex items-center gap-3 text-xs text-luxury-charcoal-500 dark:text-luxury-charcoal-400">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {post.views || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5" />
                          {post.likes || 0}
                        </span>
                      </div>

                      {/* Link ke /blog/[id] - PENTING: pakai post.id bukan slug */}
                      <Link href={`/blog/${post.id}`}>
                        <EnhancedButton
                          variant="ghost"
                          size="sm"
                          icon={<ArrowRight className="w-3.5 h-3.5" />}
                          iconPosition="right"
                          animate
                          className="text-xs h-8"
                        >
                          Baca
                        </EnhancedButton>
                      </Link>
                    </div>
                  </CardContent>
                </EnhancedCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LuxuryBlog;
