"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, Edit, Trash2, Plus, Search, Eye, CheckCircle, XCircle } from "lucide-react"
import { useDatabase, type Review } from "@/lib/database-context"

const cardCls = "bg-white dark:bg-luxury-charcoal-800 rounded-2xl border border-luxury-charcoal-100 dark:border-luxury-charcoal-700/50 shadow-sm"
const inputCls = "border-luxury-charcoal-200 dark:border-luxury-charcoal-700 dark:bg-luxury-charcoal-700/50 rounded-xl h-11 text-sm focus:ring-2 focus:ring-luxury-gold-400/30 focus:border-luxury-gold-400 transition-all"
const labelCls = "text-xs font-semibold text-luxury-charcoal-600 dark:text-luxury-charcoal-400 uppercase tracking-wider"
const primaryBtn = "inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-600 hover:from-luxury-gold-600 hover:to-luxury-gold-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50"
const outlineBtn = "inline-flex items-center gap-2 px-3 py-2 border border-luxury-charcoal-200 dark:border-luxury-charcoal-600 text-luxury-charcoal-700 dark:text-luxury-charcoal-300 text-sm font-medium rounded-xl hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-700/50 transition-all duration-200"
const dangerBtn = "inline-flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl border border-red-200 dark:border-red-800/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"

function StarRating({ rating, onChange }: { rating: number; onChange?: (r: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <button key={s} type="button" onClick={() => onChange?.(s)} className={onChange ? "cursor-pointer" : "cursor-default"}>
          <Star className={`w-4 h-4 ${s <= rating ? "fill-luxury-gold-400 text-luxury-gold-400" : "text-luxury-charcoal-200 dark:text-luxury-charcoal-600"}`} />
        </button>
      ))}
    </div>
  )
}

const SERVICE_TYPES = ["Wedding", "Portrait", "Family", "Corporate", "Event", "Pre-Wedding"]

interface FormData {
  clientName: string; email: string; rating: number; title: string; content: string
  serviceType: string; location: string; imageUrl: string; featured: boolean; approved: boolean
}
const emptyForm: FormData = {
  clientName: "", email: "", rating: 5, title: "", content: "",
  serviceType: "", location: "", imageUrl: "", featured: false, approved: true
}

function ReviewForm({ data, onChange, onSubmit, onCancel, loading, isEdit }: {
  data: FormData; onChange: (d: FormData) => void; onSubmit: () => void
  onCancel: () => void; loading: boolean; isEdit: boolean
}) {
  const set = (k: keyof FormData, v: string | number | boolean) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelCls}>Client Name *</label>
          <Input className={inputCls} placeholder="Full name" value={data.clientName} onChange={e => set("clientName", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Email</label>
          <Input className={inputCls} type="email" placeholder="email@example.com" value={data.email} onChange={e => set("email", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Service Type</label>
          <Select value={data.serviceType} onValueChange={v => set("serviceType", v)}>
            <SelectTrigger className={inputCls}><SelectValue placeholder="Select service" /></SelectTrigger>
            <SelectContent>{SERVICE_TYPES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Location</label>
          <Input className={inputCls} placeholder="City, Country" value={data.location} onChange={e => set("location", e.target.value)} />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className={labelCls}>Rating *</label>
        <StarRating rating={data.rating} onChange={r => set("rating", r)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelCls}>Review Title</label>
        <Input className={inputCls} placeholder="Brief title for the review" value={data.title} onChange={e => set("title", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelCls}>Review Content *</label>
        <Textarea className="border-luxury-charcoal-200 dark:border-luxury-charcoal-700 dark:bg-luxury-charcoal-700/50 rounded-xl text-sm min-h-[100px]" placeholder="Client's review text…" value={data.content} onChange={e => set("content", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelCls}>Client Photo URL</label>
        <Input className={inputCls} placeholder="https://… (optional)" value={data.imageUrl} onChange={e => set("imageUrl", e.target.value)} />
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button onClick={() => set("approved", !data.approved)}
            className={`relative w-10 h-5 rounded-full transition-colors ${data.approved ? "bg-emerald-500" : "bg-luxury-charcoal-200 dark:bg-luxury-charcoal-600"}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${data.approved ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
          <span className="text-sm text-luxury-charcoal-600 dark:text-luxury-charcoal-400">Approved</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => set("featured", !data.featured)}
            className={`relative w-10 h-5 rounded-full transition-colors ${data.featured ? "bg-luxury-gold-500" : "bg-luxury-charcoal-200 dark:bg-luxury-charcoal-600"}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${data.featured ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
          <span className="text-sm text-luxury-charcoal-600 dark:text-luxury-charcoal-400">Featured</span>
        </div>
      </div>
      <div className="flex gap-3 pt-2 border-t border-luxury-charcoal-100 dark:border-luxury-charcoal-700">
        <button className={primaryBtn} onClick={onSubmit} disabled={loading || !data.clientName || !data.content}>
          {loading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
          {isEdit ? "Save Changes" : "Add Review"}
        </button>
        <button className={outlineBtn} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default function ReviewManager() {
  const { reviews, addReview, updateReview, deleteReview } = useDatabase()
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  const stats = {
    total: reviews.length,
    approved: reviews.filter(r => r.approved).length,
    pending: reviews.filter(r => !r.approved).length,
    featured: reviews.filter(r => r.featured).length,
    avg: reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0.0",
  }

  const filtered = reviews.filter(r => {
    const matchSearch = !search || r.clientName.toLowerCase().includes(search.toLowerCase()) || r.content.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "all" || (filterStatus === "approved" && r.approved) || (filterStatus === "pending" && !r.approved) || (filterStatus === "featured" && r.featured)
    return matchSearch && matchStatus
  })

  const openEdit = (r: Review) => {
    setSelectedReview(r)
    setFormData({ clientName: r.clientName, email: r.email || "", rating: r.rating, title: r.title || "", content: r.content, serviceType: r.serviceType || "", location: r.location || "", imageUrl: r.imageUrl || "", featured: r.featured, approved: r.approved })
    setIsEditOpen(true)
  }

  const handleAdd = async () => {
    setSubmitting(true)
    try { await addReview(formData); setIsAddOpen(false); setFormData(emptyForm) } catch { } finally { setSubmitting(false) }
  }

  const handleEdit = async () => {
    if (!selectedReview) return
    setSubmitting(true)
    try { await updateReview(selectedReview.id, formData); setIsEditOpen(false) } catch { } finally { setSubmitting(false) }
  }

  const handleDelete = async (id: string) => {
    try { await deleteReview(id); setDeleteConfirm(null); setIsDetailOpen(false) } catch { }
  }

  const toggleApproved = async (r: Review) => {
    try { await updateReview(r.id, { approved: !r.approved }) } catch { }
  }

  const toggleFeatured = async (r: Review) => {
    try { await updateReview(r.id, { featured: !r.featured }) } catch { }
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: "Total", value: stats.total, color: "text-luxury-charcoal-900 dark:text-white" },
          { label: "Approved", value: stats.approved, color: "text-emerald-600" },
          { label: "Pending", value: stats.pending, color: "text-amber-600" },
          { label: "Featured", value: stats.featured, color: "text-luxury-gold-600" },
          { label: "Avg Rating", value: `★ ${stats.avg}`, color: "text-luxury-gold-500" },
        ].map(({ label, value, color }) => (
          <div key={label} className={`${cardCls} p-4`}>
            <p className="text-xs font-semibold text-luxury-charcoal-500 dark:text-luxury-charcoal-400 uppercase tracking-wider mb-1">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className={`${cardCls} p-4`}>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-charcoal-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search reviews…"
              className="w-full pl-9 pr-3 h-11 rounded-xl border border-luxury-charcoal-200 dark:border-luxury-charcoal-700 bg-white dark:bg-luxury-charcoal-700/50 text-sm focus:ring-2 focus:ring-luxury-gold-400/30 focus:border-luxury-gold-400 outline-none transition-all" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-36 h-11 rounded-xl border-luxury-charcoal-200 dark:border-luxury-charcoal-700 bg-white dark:bg-luxury-charcoal-700/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reviews</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
            </SelectContent>
          </Select>
          <button className={`${primaryBtn} sm:ml-auto`} onClick={() => { setFormData(emptyForm); setIsAddOpen(true) }}>
            <Plus className="w-4 h-4" />Add Review
          </button>
        </div>
      </div>

      {/* Review Grid */}
      {filtered.length === 0 ? (
        <div className={`${cardCls} flex flex-col items-center justify-center py-16 text-luxury-charcoal-400`}>
          <Star className="w-12 h-12 mb-3 opacity-40" />
          <p className="font-medium">No reviews found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map(review => (
            <div key={review.id} className={`${cardCls} p-4`}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-luxury-gold-100 to-luxury-gold-200 dark:from-luxury-gold-900/30 dark:to-luxury-gold-800/30 flex items-center justify-center">
                    <span className="text-sm font-bold text-luxury-gold-600">{review.clientName[0]?.toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-luxury-charcoal-900 dark:text-white">{review.clientName}</p>
                    {review.serviceType && <p className="text-xs text-luxury-charcoal-400">{review.serviceType}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {review.featured && <span className="text-xs font-semibold px-2 py-0.5 bg-luxury-gold-100 text-luxury-gold-700 dark:bg-luxury-gold-900/30 dark:text-luxury-gold-400 rounded">Featured</span>}
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${review.approved ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>{review.approved ? "Approved" : "Pending"}</span>
                </div>
              </div>
              <StarRating rating={review.rating} />
              {review.title && <p className="font-semibold text-sm text-luxury-charcoal-800 dark:text-luxury-charcoal-100 mt-2">{review.title}</p>}
              <p className="text-sm text-luxury-charcoal-600 dark:text-luxury-charcoal-300 mt-1 line-clamp-3">{review.content}</p>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-luxury-charcoal-50 dark:border-luxury-charcoal-700/50">
                <button onClick={() => toggleApproved(review)} title={review.approved ? "Unapprove" : "Approve"}
                  className={`p-1.5 rounded-lg transition-colors ${review.approved ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "text-luxury-charcoal-400 hover:text-emerald-500 hover:bg-emerald-50"}`}>
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button onClick={() => toggleFeatured(review)} title={review.featured ? "Unfeature" : "Feature"}
                  className={`p-1.5 rounded-lg transition-colors ${review.featured ? "text-luxury-gold-500 bg-luxury-gold-50 dark:bg-luxury-gold-900/20" : "text-luxury-charcoal-400 hover:text-luxury-gold-500 hover:bg-luxury-gold-50"}`}>
                  <Star className={`w-4 h-4 ${review.featured ? "fill-luxury-gold-500" : ""}`} />
                </button>
                <button onClick={() => openEdit(review)} className="p-1.5 rounded-lg hover:bg-luxury-charcoal-100 dark:hover:bg-luxury-charcoal-700 text-luxury-charcoal-400 hover:text-luxury-charcoal-700 transition-colors"><Edit className="w-4 h-4" /></button>
                <button onClick={() => setDeleteConfirm(review.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-luxury-charcoal-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-lg bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-luxury-charcoal-900 dark:text-white">Add Review</DialogTitle>
            <DialogDescription className="text-luxury-charcoal-500">Add a client review manually.</DialogDescription>
          </DialogHeader>
          <ReviewForm data={formData} onChange={setFormData} onSubmit={handleAdd} onCancel={() => setIsAddOpen(false)} loading={submitting} isEdit={false} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-luxury-charcoal-900 dark:text-white">Edit Review</DialogTitle>
          </DialogHeader>
          <ReviewForm data={formData} onChange={setFormData} onSubmit={handleEdit} onCancel={() => setIsEditOpen(false)} loading={submitting} isEdit />
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-luxury-charcoal-900 dark:text-white">Delete Review?</DialogTitle>
            <DialogDescription className="text-luxury-charcoal-500">This review will be permanently deleted.</DialogDescription>
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
