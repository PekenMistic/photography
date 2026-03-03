"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Edit, Trash2, Plus, HelpCircle, Search, ChevronDown, ChevronUp } from "lucide-react"
import { useDatabase, type FAQ } from "@/lib/database-context"

const cardCls = "bg-white dark:bg-luxury-charcoal-800 rounded-2xl border border-luxury-charcoal-100 dark:border-luxury-charcoal-700/50 shadow-sm"
const inputCls = "border-luxury-charcoal-200 dark:border-luxury-charcoal-700 dark:bg-luxury-charcoal-700/50 rounded-xl h-11 text-sm focus:ring-2 focus:ring-luxury-gold-400/30 focus:border-luxury-gold-400 transition-all"
const labelCls = "text-xs font-semibold text-luxury-charcoal-600 dark:text-luxury-charcoal-400 uppercase tracking-wider"
const primaryBtn = "inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-600 hover:from-luxury-gold-600 hover:to-luxury-gold-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50"
const outlineBtn = "inline-flex items-center gap-2 px-3 py-2 border border-luxury-charcoal-200 dark:border-luxury-charcoal-600 text-luxury-charcoal-700 dark:text-luxury-charcoal-300 text-sm font-medium rounded-xl hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-700/50 transition-all duration-200"
const dangerBtn = "inline-flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl border border-red-200 dark:border-red-800/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"

const CATEGORIES = ["General", "Pricing", "Services", "Booking", "Photography", "Technical"]

interface FormData { question: string; answer: string; category: string; order: number; active: boolean }
const emptyForm: FormData = { question: "", answer: "", category: "General", order: 0, active: true }

function FAQForm({ data, onChange, onSubmit, onCancel, loading, isEdit }: {
  data: FormData; onChange: (d: FormData) => void; onSubmit: () => void
  onCancel: () => void; loading: boolean; isEdit: boolean
}) {
  const set = (k: keyof FormData, v: string | number | boolean) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className={labelCls}>Question *</label>
        <Input className={inputCls} placeholder="What do customers ask?" value={data.question} onChange={e => set("question", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelCls}>Answer *</label>
        <Textarea className="border-luxury-charcoal-200 dark:border-luxury-charcoal-700 dark:bg-luxury-charcoal-700/50 rounded-xl text-sm min-h-[120px]" placeholder="Provide a clear, helpful answer…" value={data.answer} onChange={e => set("answer", e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelCls}>Category</label>
          <Select value={data.category} onValueChange={v => set("category", v)}>
            <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
            <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Sort Order</label>
          <Input className={inputCls} type="number" value={data.order} onChange={e => set("order", parseInt(e.target.value) || 0)} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => set("active", !data.active)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${data.active ? "bg-luxury-gold-500" : "bg-luxury-charcoal-200 dark:bg-luxury-charcoal-600"}`}>
          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${data.active ? "translate-x-6" : "translate-x-0.5"}`} />
        </button>
        <span className="text-sm text-luxury-charcoal-600 dark:text-luxury-charcoal-400">Active (visible on website)</span>
      </div>
      <div className="flex gap-3 pt-2 border-t border-luxury-charcoal-100 dark:border-luxury-charcoal-700">
        <button className={primaryBtn} onClick={onSubmit} disabled={loading || !data.question || !data.answer}>
          {loading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
          {isEdit ? "Save Changes" : "Add FAQ"}
        </button>
        <button className={outlineBtn} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default function FAQManager() {
  const { faqs, addFAQ, updateFAQ, deleteFAQ } = useDatabase()
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  const categories = Array.from(new Set(faqs.map(f => f.category))).filter(Boolean)

  const filtered = faqs
    .filter(f => {
      const matchSearch = !search || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase())
      const matchCat = filterCategory === "all" || f.category === filterCategory
      return matchSearch && matchCat
    })
    .sort((a, b) => a.order - b.order)

  const openEdit = (faq: FAQ) => {
    setSelectedFaq(faq)
    setFormData({ question: faq.question, answer: faq.answer, category: faq.category, order: faq.order, active: faq.active })
    setIsEditOpen(true)
  }

  const handleAdd = async () => {
    setSubmitting(true)
    try { await addFAQ(formData); setIsAddOpen(false); setFormData(emptyForm) } catch { } finally { setSubmitting(false) }
  }

  const handleEdit = async () => {
    if (!selectedFaq) return
    setSubmitting(true)
    try { await updateFAQ(selectedFaq.id, formData); setIsEditOpen(false) } catch { } finally { setSubmitting(false) }
  }

  const handleDelete = async (id: string) => {
    try { await deleteFAQ(id); setDeleteConfirm(null) } catch { }
  }

  const toggleActive = async (faq: FAQ) => {
    try { await updateFAQ(faq.id, { active: !faq.active }) } catch { }
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total FAQs", value: faqs.length },
          { label: "Active", value: faqs.filter(f => f.active).length },
          { label: "Inactive", value: faqs.filter(f => !f.active).length },
          { label: "Categories", value: categories.length },
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search FAQs…"
              className="w-full pl-9 pr-3 h-11 rounded-xl border border-luxury-charcoal-200 dark:border-luxury-charcoal-700 bg-white dark:bg-luxury-charcoal-700/50 text-sm focus:ring-2 focus:ring-luxury-gold-400/30 focus:border-luxury-gold-400 outline-none transition-all" />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40 h-11 rounded-xl border-luxury-charcoal-200 dark:border-luxury-charcoal-700 bg-white dark:bg-luxury-charcoal-700/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <button className={`${primaryBtn} sm:ml-auto`} onClick={() => { setFormData(emptyForm); setIsAddOpen(true) }}>
            <Plus className="w-4 h-4" />Add FAQ
          </button>
        </div>
      </div>

      {/* FAQ List */}
      <div className={`${cardCls} overflow-hidden`}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-luxury-charcoal-400">
            <HelpCircle className="w-12 h-12 mb-3 opacity-40" />
            <p className="font-medium">No FAQs found</p>
          </div>
        ) : (
          <div className="divide-y divide-luxury-charcoal-50 dark:divide-luxury-charcoal-700/30">
            {filtered.map(faq => (
              <div key={faq.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-semibold px-2 py-0.5 bg-luxury-charcoal-100 dark:bg-luxury-charcoal-700 text-luxury-charcoal-600 dark:text-luxury-charcoal-300 rounded">{faq.category || "General"}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${faq.active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"}`}>{faq.active ? "Active" : "Inactive"}</span>
                      <span className="text-xs text-luxury-charcoal-400">Order: {faq.order}</span>
                    </div>
                    <button className="text-left w-full" onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}>
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-sm text-luxury-charcoal-900 dark:text-white">{faq.question}</p>
                        {expandedId === faq.id ? <ChevronUp className="w-4 h-4 text-luxury-charcoal-400 flex-shrink-0 mt-0.5" /> : <ChevronDown className="w-4 h-4 text-luxury-charcoal-400 flex-shrink-0 mt-0.5" />}
                      </div>
                    </button>
                    {expandedId === faq.id && (
                      <p className="text-sm text-luxury-charcoal-600 dark:text-luxury-charcoal-300 mt-2 leading-relaxed">{faq.answer}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => toggleActive(faq)} title={faq.active ? "Deactivate" : "Activate"}
                      className={`p-1.5 rounded-lg transition-colors ${faq.active ? "text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20" : "text-luxury-charcoal-400 hover:bg-luxury-charcoal-100 dark:hover:bg-luxury-charcoal-700"}`}>
                      <div className={`w-4 h-4 rounded-full border-2 ${faq.active ? "bg-emerald-500 border-emerald-500" : "border-luxury-charcoal-300"}`} />
                    </button>
                    <button onClick={() => openEdit(faq)} className="p-1.5 rounded-lg hover:bg-luxury-charcoal-100 dark:hover:bg-luxury-charcoal-700 text-luxury-charcoal-400 hover:text-luxury-charcoal-700 transition-colors"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteConfirm(faq.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-luxury-charcoal-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-lg bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-luxury-charcoal-900 dark:text-white">Add FAQ</DialogTitle>
            <DialogDescription className="text-luxury-charcoal-500">Add a new frequently asked question.</DialogDescription>
          </DialogHeader>
          <FAQForm data={formData} onChange={setFormData} onSubmit={handleAdd} onCancel={() => setIsAddOpen(false)} loading={submitting} isEdit={false} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-luxury-charcoal-900 dark:text-white">Edit FAQ</DialogTitle>
          </DialogHeader>
          <FAQForm data={formData} onChange={setFormData} onSubmit={handleEdit} onCancel={() => setIsEditOpen(false)} loading={submitting} isEdit />
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-luxury-charcoal-900 dark:text-white">Delete FAQ?</DialogTitle>
            <DialogDescription className="text-luxury-charcoal-500">This FAQ will be permanently deleted.</DialogDescription>
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
