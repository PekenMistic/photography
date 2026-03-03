"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronLeft, ChevronRight, Eye, Camera, Loader2 } from "lucide-react"
import { useDatabase } from "@/lib/database-context"
import { motion } from "framer-motion"

const categories = ["All", "Wedding", "Portrait", "Event", "Family", "Corporate"]

export default function PortfolioPage() {
  const { portfolioItems, loading, error } = useDatabase()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const filteredItems = portfolioItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.description || "").toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length)
    }
  }
  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredItems.length)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-charcoal-50 via-white to-luxury-gold-50 dark:from-luxury-charcoal-900 dark:via-luxury-charcoal-850 dark:to-luxury-charcoal-900">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-luxury-charcoal-900 via-luxury-charcoal-800 to-luxury-charcoal-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-luxury-gold-500/15 rounded-full blur-3xl animate-luxury-float"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-luxury-teal-500/10 rounded-full blur-3xl animate-luxury-float" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-luxury-gold-500/20 text-luxury-gold-300 rounded-full text-sm font-semibold border border-luxury-gold-500/30 mb-5">
              <Eye className="w-4 h-4" />
              Portfolio Kami
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-3 leading-tight">
              Visual Masterpieces
            </h1>
            <p className="text-luxury-charcoal-300 text-base lg:text-lg max-w-xl mx-auto">
              Koleksi karya terbaik yang mengabadikan momen berharga dengan seni dan keahlian.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10 lg:py-14">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-charcoal-400" />
            <Input
              placeholder="Cari foto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 rounded-xl text-sm bg-white dark:bg-luxury-charcoal-800"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-luxury-charcoal-900 dark:bg-luxury-gold-500 text-white shadow-luxury'
                    : 'bg-white dark:bg-luxury-charcoal-800 text-luxury-charcoal-600 dark:text-luxury-charcoal-300 border border-luxury-charcoal-200 dark:border-luxury-charcoal-700 hover:border-luxury-gold-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-luxury-gold-500 animate-spin" />
            <p className="text-luxury-charcoal-500 dark:text-luxury-charcoal-400">Memuat portfolio...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-red-600 dark:text-red-400 text-sm">Gagal memuat portfolio: {error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-luxury-gold-50 dark:bg-luxury-gold-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-10 h-10 text-luxury-gold-400" />
            </div>
            <h3 className="text-xl font-display font-bold text-luxury-charcoal-700 dark:text-luxury-charcoal-300 mb-2">
              {portfolioItems.length === 0 ? "Belum Ada Foto Portfolio" : "Tidak Ada Hasil"}
            </h3>
            <p className="text-luxury-charcoal-500 dark:text-luxury-charcoal-400 text-sm max-w-sm mx-auto">
              {portfolioItems.length === 0
                ? "Tambahkan foto portfolio melalui panel admin."
                : "Coba ubah filter atau kata kunci pencarian."}
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filteredItems.length > 0 && (
          <motion.div
            className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="break-inside-avoid mb-4 cursor-pointer group"
                onClick={() => setSelectedIndex(index)}
              >
                <div className="relative overflow-hidden rounded-xl bg-luxury-charcoal-100 dark:bg-luxury-charcoal-800 border border-luxury-charcoal-100 dark:border-luxury-charcoal-700 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 hover:-translate-y-0.5">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <h3 className="text-white text-sm font-semibold line-clamp-1">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px] bg-luxury-gold-500/90 text-white border-0 h-4 px-1.5">
                        {item.category}
                      </Badge>
                      {item.featured && (
                        <span className="text-[10px] text-luxury-gold-300">★ Featured</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-w-5xl w-full bg-luxury-charcoal-900 border-luxury-charcoal-700 p-0 overflow-hidden">
          {selectedIndex !== null && filteredItems[selectedIndex] && (
            <div className="relative">
              <div className="relative min-h-[300px] max-h-[70vh] flex items-center justify-center bg-luxury-charcoal-950">
                <Image
                  src={filteredItems[selectedIndex].imageUrl || "/placeholder.svg"}
                  alt={filteredItems[selectedIndex].title}
                  width={900}
                  height={600}
                  className="max-h-[70vh] w-auto object-contain"
                />
                {/* Nav buttons */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">{filteredItems[selectedIndex].title}</h3>
                  <p className="text-luxury-charcoal-400 text-sm">{filteredItems[selectedIndex].description}</p>
                </div>
                <div className="flex items-center gap-3 text-luxury-charcoal-400 text-sm">
                  <span>{selectedIndex + 1} / {filteredItems.length}</span>
                  <Badge className="bg-luxury-gold-500/20 text-luxury-gold-300 border-luxury-gold-500/30">
                    {filteredItems[selectedIndex].category}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
