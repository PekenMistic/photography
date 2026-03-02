"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Heart, Share2, Grid, List, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useDatabase } from "@/lib/database-context"

const categories = ["All", "Wedding", "Portrait", "Event", "Family", "Corporate"]

export default function ModernPortfolio() {
  const { portfolioItems } = useDatabase()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const filteredItems = portfolioItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-luxury-charcoal-50 via-white to-luxury-gold-50 dark:from-luxury-charcoal-900 dark:via-luxury-charcoal-800 dark:to-luxury-charcoal-900 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-luxury-gold-100 dark:bg-luxury-gold-900/20 text-luxury-gold-700 dark:text-luxury-gold-300 rounded-full text-sm font-medium border border-luxury-gold-200 dark:border-luxury-gold-800 mb-6">
            <Eye className="w-4 h-4" />
            Our Portfolio
          </div>

          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="text-luxury-charcoal-900 dark:text-luxury-charcoal-100">Visual</span>
            <br />
            <span className="gradient-text-luxury">Masterpieces</span>
          </h2>
          <p className="text-xl text-luxury-charcoal-600 dark:text-luxury-charcoal-300 max-w-3xl mx-auto leading-relaxed">
            Discover our collection of stunning photography that captures life&apos;s most precious moments with artistic excellence and emotional depth.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search portfolio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/90 dark:bg-luxury-charcoal-800/90 backdrop-luxury border-luxury-charcoal-200/50 dark:border-luxury-charcoal-700/50 rounded-full shadow-luxury focus:border-luxury-gold-400 focus:ring-4 focus:ring-luxury-gold-400/20"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full transition-all duration-500 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-luxury-charcoal-900 to-luxury-charcoal-800 text-white shadow-luxury border border-luxury-gold-400/30"
                      : "hover:bg-luxury-gold-50 dark:hover:bg-luxury-gold-900/20 text-luxury-charcoal-700 dark:text-luxury-charcoal-300"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 bg-white/90 dark:bg-luxury-charcoal-800/90 backdrop-luxury rounded-full p-1 border border-luxury-charcoal-200/50 dark:border-luxury-charcoal-700/50 shadow-luxury">
              <Button
                variant={viewMode === "masonry" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("masonry")}
                className="rounded-full"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-full"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No items found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? `No portfolio items match "${searchTerm}"` : "No portfolio items available yet"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === "masonry"
                ? "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            }
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-soft hover:shadow-large transition-all duration-500 ${
                    viewMode === "masonry" ? "break-inside-avoid mb-6" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={400}
                      height={viewMode === "masonry" ? 300 + (index % 3) * 100 : 300}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
                              onClick={() => setSelectedImage(item.imageUrl)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
                            >
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                          {item.featured && (
                            <Badge className="bg-yellow-500 text-yellow-900">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage}
                  alt="Portfolio item"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-lg"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
                  onClick={() => setSelectedImage(null)}
                >
                  ✕
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

