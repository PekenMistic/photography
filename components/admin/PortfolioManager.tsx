"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, Trash2, Plus, Image as ImageIcon, Eye, Edit, Search, Star } from "lucide-react"
import Image from "next/image"
import { useDatabase, type PortfolioItem } from "@/lib/database-context"
import { useLuxuryToast } from "@/components/ui/luxury-toast"

const cardCls = "bg-white dark:bg-luxury-charcoal-800 rounded-2xl border border-luxury-charcoal-100 dark:border-luxury-charcoal-700/50 shadow-sm"
const inputCls = "border-luxury-charcoal-200 dark:border-luxury-charcoal-700 dark:bg-luxury-charcoal-700/50 rounded-xl h-11 text-sm focus:ring-2 focus:ring-luxury-gold-400/30 focus:border-luxury-gold-400 transition-all"
const labelCls = "text-xs font-semibold text-luxury-charcoal-600 dark:text-luxury-charcoal-400 uppercase tracking-wider"
const primaryBtn = "inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-600 hover:from-luxury-gold-600 hover:to-luxury-gold-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50"
const outlineBtn = "inline-flex items-center gap-2 px-3 py-2 border border-luxury-charcoal-200 dark:border-luxury-charcoal-600 text-luxury-charcoal-700 dark:text-luxury-charcoal-300 text-sm font-medium rounded-xl hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-700/50 transition-all duration-200"

const CATEGORIES = ["Wedding", "Portrait", "Family", "Event", "Corporate", "Fashion", "Pre-Wedding"]

interface FormData {
  title: string; description: string; category: string; imageUrl: string; featured: boolean
}
const emptyForm: FormData = { title: "", description: "", category: "", imageUrl: "", featured: false }

function PortfolioForm({ data, onChange, onSubmit, onCancel, loading, isEdit }: {
  data: FormData; onChange: (d: FormData) => void; onSubmit: () => void
  onCancel: () => void; loading: boolean; isEdit: boolean
}) {
  const set = (k: keyof FormData, v: string | boolean) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className={labelCls}>Title *</label>
        <Input className={inputCls} placeholder="Portfolio item title" value={data.title} onChange={e => set("title", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelCls}>Description</label>
        <Textarea className="border-luxury-charcoal-200 dark:border-luxury-charcoal-700 dark:bg-luxury-charcoal-700/50 rounded-xl text-sm min-h-[80px]" placeholder="Brief description of this photo..." value={data.description} onChange={e => set("description", e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelCls}>Category *</label>
          <Select value={data.category} onValueChange={v => set("category", v)}>
            <SelectTrigger className={inputCls}><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Featured</label>
          <div className="h-11 flex items-center">
            <button onClick={() => set("featured", !data.featured)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${data.featured ? "bg-luxury-gold-500" : "bg-luxury-charcoal-200 dark:bg-luxury-charcoal-600"}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${data.featured ? "translate-x-6" : "translate-x-0.5"}`} />
            </button>
            <span className="ml-2 text-sm text-luxury-charcoal-600 dark:text-luxury-charcoal-400">Show as featured</span>
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        <label className={labelCls}>Image URL *</label>
        <Input className={inputCls} placeholder="https://... or /images/photo.jpg" value={data.imageUrl} onChange={e => set("imageUrl", e.target.value)} />
      </div>
      {data.imageUrl && (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-luxury-charcoal-100 dark:border-luxury-charcoal-700">
          <Image src={data.imageUrl} alt="Preview" fill className="object-cover" onError={() => {}} />
        </div>
      )}
      <div className="flex gap-3 pt-2 border-t border-luxury-charcoal-100 dark:border-luxury-charcoal-700">
        <button className={primaryBtn} onClick={onSubmit} disabled={loading || !data.title || !data.category || !data.imageUrl}>
          {loading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
          {isEdit ? "Save Changes" : "Add to Portfolio"}
        </button>
        <button className={outlineBtn} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default function PortfolioManager() {
  const { portfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useDatabase()
  const toast = useLuxuryToast()
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  const filtered = portfolioItems.filter(p => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCategory === "all" || p.category === filterCategory
    return matchSearch && matchCat
  })

  const categories = Array.from(new Set(portfolioItems.map(p => p.category))).filter(Boolean)

  const openEdit = (item: PortfolioItem) => {
    setSelectedItem(item)
    setFormData({ title: item.title, description: item.description, category: item.category, imageUrl: item.imageUrl, featured: item.featured })
    setIsEditOpen(true)
  }

  const handleAdd = async () => {
    setSubmitting(true)
    try {
      await addPortfolioItem({ ...formData, tags: [] })
      setIsAddOpen(false); setFormData(emptyForm)
      toast.success('Photo added!', `"${formData.title}" has been added to your portfolio.`)
    } catch { toast.error('Failed to add photo', 'Please check your database connection.') } finally { setSubmitting(false) }
  }

  const handleEdit = async () => {
    if (!selectedItem) return
    setSubmitting(true)
    try {
      await updatePortfolioItem(selectedItem.id, formData)
      setIsEditOpen(false)
      toast.success('Photo updated!')
    } catch { toast.error('Failed to update photo') } finally { setSubmitting(false) }
  }

  const handleDelete = async (id: string) => {
    try { await deletePortfolioItem(id); setDeleteConfirm(null); toast.success('Photo deleted') } catch { toast.error('Failed to delete photo') }
  }

  const toggleFeatured = async (item: PortfolioItem) => {
    try { await updatePortfolioItem(item.id, { featured: !item.featured }); toast.info(item.featured ? 'Removed from featured' : 'Marked as featured') } catch { toast.error('Failed to update') }
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Photos", value: portfolioItems.length },
          { label: "Featured", value: portfolioItems.filter(p => p.featured).length },
          { label: "Categories", value: categories.length },
          { label: "Recent (30d)", value: portfolioItems.filter(p => new Date(p.createdAt) > new Date(Date.now() - 30 * 86400000)).length },
        ].map(({ label, value }) => (
          <div key={label} className={`${cardCls} p-4`}>
            <p className="text-xs font-semibold text-luxury-charcoal-500 dark:text-luxury-charcoal-400 uppercase tracking-wider mb-1">{label}</p>
            <p className="text-2xl font-bold text-luxury-charcoal-900 dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className={`${cardCls} p-4`}>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-charcoal-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search portfolio…"
              className="w-full pl-9 pr-3 h-11 rounded-xl border border-luxury-charcoal-200 dark:border-luxury-charcoal-700 bg-white dark:bg-luxury-charcoal-700/50 text-sm focus:ring-2 focus:ring-luxury-gold-400/30 focus:border-luxury-gold-400 outline-none transition-all" />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-44 h-11 rounded-xl border-luxury-charcoal-200 dark:border-luxury-charcoal-700 bg-white dark:bg-luxury-charcoal-700/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
          <button className={`${primaryBtn} sm:ml-auto`} onClick={() => { setFormData(emptyForm); setIsAddOpen(true) }}>
            <Plus className="w-4 h-4" />Add Photo
          </button>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className={`${cardCls} flex flex-col items-center justify-center py-16 text-luxury-charcoal-400`}>
          <ImageIcon className="w-12 h-12 mb-3 opacity-40" />
          <p className="font-medium">No portfolio items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(item => (
            <div key={item.id} className={`${cardCls} overflow-hidden group`}>
              <div className="relative h-48 bg-luxury-charcoal-100 dark:bg-luxury-charcoal-700">
                <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                {item.featured && (
                  <div className="absolute top-2 left-2 bg-luxury-gold-500 text-white text-xs font-semibold px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />Featured
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => openEdit(item)} className="p-2 bg-white rounded-xl shadow-lg hover:bg-luxury-gold-50 transition-colors" title="Edit">
                    <Edit className="w-4 h-4 text-luxury-charcoal-700" />
                  </button>
                  <button onClick={() => setDeleteConfirm(item.id)} className="p-2 bg-white rounded-xl shadow-lg hover:bg-red-50 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-luxury-charcoal-900 dark:text-white text-sm truncate">{item.title}</p>
                    <p className="text-xs text-luxury-charcoal-400 mt-0.5">{item.category}</p>
                  </div>
                  <button onClick={() => toggleFeatured(item)} title={item.featured ? "Remove featured" : "Mark as featured"}
                    className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${item.featured ? "text-luxury-gold-500 bg-luxury-gold-50 dark:bg-luxury-gold-900/20" : "text-luxury-charcoal-300 hover:text-luxury-gold-400"}`}>
                    <Star className={`w-4 h-4 ${item.featured ? "fill-luxury-gold-500" : ""}`} />
                  </button>
                </div>
                {item.description && <p className="text-xs text-luxury-charcoal-500 dark:text-luxury-charcoal-400 mt-1 line-clamp-2">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-lg bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-luxury-charcoal-900 dark:text-white">Add Portfolio Item</DialogTitle>
            <DialogDescription className="text-luxury-charcoal-500">Add a new photo to your portfolio gallery.</DialogDescription>
          </DialogHeader>
          <PortfolioForm data={formData} onChange={setFormData} onSubmit={handleAdd} onCancel={() => setIsAddOpen(false)} loading={submitting} isEdit={false} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-luxury-charcoal-900 dark:text-white">Edit Portfolio Item</DialogTitle>
            <DialogDescription className="text-luxury-charcoal-500">Update the details for "{selectedItem?.title}"</DialogDescription>
          </DialogHeader>
          <PortfolioForm data={formData} onChange={setFormData} onSubmit={handleEdit} onCancel={() => setIsEditOpen(false)} loading={submitting} isEdit />
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-luxury-charcoal-900 dark:text-white">Delete Photo?</DialogTitle>
            <DialogDescription className="text-luxury-charcoal-500">This photo will be permanently removed from your portfolio.</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-2">
            <button className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>Delete</button>
            <button className={`flex-1 ${outlineBtn} justify-center`} onClick={() => setDeleteConfirm(null)}>Cancel</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
