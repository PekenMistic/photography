"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Calendar, Clock, User, Phone, Mail, MapPin, DollarSign,
  CheckCircle, XCircle, AlertCircle, Plus, Edit, Trash2,
  Search, Eye
} from "lucide-react"
import { useDatabase, type Booking } from "@/lib/database-context"
import { useLuxuryToast } from "@/components/ui/luxury-toast"

const cardCls = "bg-white dark:bg-luxury-charcoal-800 rounded-2xl border border-luxury-charcoal-100 dark:border-luxury-charcoal-700/50 shadow-sm"
const inputCls = "border-luxury-charcoal-200 dark:border-luxury-charcoal-700 dark:bg-luxury-charcoal-700/50 rounded-xl h-11 text-sm focus:ring-2 focus:ring-luxury-gold-400/30 focus:border-luxury-gold-400 transition-all"
const labelCls = "text-xs font-semibold text-luxury-charcoal-600 dark:text-luxury-charcoal-400 uppercase tracking-wider"
const primaryBtn = "inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-600 hover:from-luxury-gold-600 hover:to-luxury-gold-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
const outlineBtn = "inline-flex items-center gap-2 px-3 py-2 border border-luxury-charcoal-200 dark:border-luxury-charcoal-600 text-luxury-charcoal-700 dark:text-luxury-charcoal-300 text-sm font-medium rounded-xl hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-700/50 transition-all duration-200"
const dangerBtn = "inline-flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl border border-red-200 dark:border-red-800/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; icon: React.ReactNode; label: string }> = {
    confirmed: { cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: <CheckCircle className="w-3 h-3" />, label: "Confirmed" },
    pending: { cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: <AlertCircle className="w-3 h-3" />, label: "Pending" },
    cancelled: { cls: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: <XCircle className="w-3 h-3" />, label: "Cancelled" },
    completed: { cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: <CheckCircle className="w-3 h-3" />, label: "Completed" },
  }
  const s = map[status] ?? { cls: "bg-gray-100 text-gray-600", icon: null, label: status }
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${s.cls}`}>
      {s.icon}{s.label}
    </span>
  )
}

const EVENT_TYPES = ["Wedding", "Portrait", "Family", "Corporate", "Event", "Pre-Wedding", "Birthday", "Other"]
const STATUS_OPTIONS: Booking["status"][] = ["pending", "confirmed", "completed", "cancelled"]

interface BookingFormData {
  clientName: string; email: string; phone: string; eventType: string
  eventDate: string; eventTime: string; location: string; duration: string
  price: string; status: Booking["status"]; notes: string
}
const emptyForm: BookingFormData = {
  clientName: "", email: "", phone: "", eventType: "",
  eventDate: "", eventTime: "", location: "", duration: "",
  price: "", status: "pending", notes: ""
}

function BookingForm({ data, onChange, onSubmit, onCancel, loading, isEdit }: {
  data: BookingFormData; onChange: (d: BookingFormData) => void; onSubmit: () => void
  onCancel: () => void; loading: boolean; isEdit: boolean
}) {
  const set = (k: keyof BookingFormData, v: string) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelCls}>Client Name *</label>
          <Input className={inputCls} placeholder="Full name" value={data.clientName} onChange={e => set("clientName", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Email *</label>
          <Input className={inputCls} type="email" placeholder="email@example.com" value={data.email} onChange={e => set("email", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Phone</label>
          <Input className={inputCls} placeholder="+62 xxx xxxx xxxx" value={data.phone} onChange={e => set("phone", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Event Type *</label>
          <Select value={data.eventType} onValueChange={v => set("eventType", v)}>
            <SelectTrigger className={inputCls}><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>{EVENT_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Event Date *</label>
          <Input className={inputCls} type="date" value={data.eventDate} onChange={e => set("eventDate", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Event Time</label>
          <Input className={inputCls} type="time" value={data.eventTime} onChange={e => set("eventTime", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Location</label>
          <Input className={inputCls} placeholder="Venue / address" value={data.location} onChange={e => set("location", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Duration</label>
          <Input className={inputCls} placeholder="e.g. 4 hours" value={data.duration} onChange={e => set("duration", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Price (Rp)</label>
          <Input className={inputCls} type="number" placeholder="0" value={data.price} onChange={e => set("price", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Status</label>
          <Select value={data.status} onValueChange={v => set("status", v as Booking["status"])}>
            <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
            <SelectContent>{STATUS_OPTIONS.map(s => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1.5">
        <label className={labelCls}>Notes</label>
        <Textarea className="border-luxury-charcoal-200 dark:border-luxury-charcoal-700 dark:bg-luxury-charcoal-700/50 rounded-xl text-sm min-h-[80px]" placeholder="Additional notes…" value={data.notes} onChange={e => set("notes", e.target.value)} />
      </div>
      <div className="flex gap-3 pt-2 border-t border-luxury-charcoal-100 dark:border-luxury-charcoal-700">
        <button className={primaryBtn} onClick={onSubmit} disabled={loading || !data.clientName || !data.email || !data.eventType || !data.eventDate}>
          {loading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
          {isEdit ? "Save Changes" : "Create Booking"}
        </button>
        <button className={outlineBtn} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default function BookingManager() {
  const { bookings, addBooking, updateBooking, deleteBooking } = useDatabase()
  const toast = useLuxuryToast()
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [formData, setFormData] = useState<BookingFormData>(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    completed: bookings.filter(b => b.status === "completed").length,
    revenue: bookings.filter(b => b.status === "completed").reduce((s, b) => s + (b.price ? Number(b.price) : 0), 0),
  }

  const filtered = bookings.filter(b => {
    const matchSearch = !search || b.clientName.toLowerCase().includes(search.toLowerCase()) || b.email.toLowerCase().includes(search.toLowerCase()) || b.eventType.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "all" || b.status === filterStatus
    return matchSearch && matchStatus
  })

  const openEdit = (b: Booking) => {
    setSelectedBooking(b)
    setFormData({ clientName: b.clientName, email: b.email, phone: b.phone || "", eventType: b.eventType, eventDate: b.eventDate, eventTime: b.eventTime || "", location: b.location || "", duration: b.duration || "", price: b.price?.toString() || "", status: b.status, notes: b.notes || "" })
    setIsEditOpen(true)
  }

  const handleAdd = async () => {
    setSubmitting(true)
    try {
      await addBooking({ ...formData, price: formData.price ? Number(formData.price) : undefined })
      setIsAddOpen(false); setFormData(emptyForm)
      toast.success('Booking created!', `${formData.clientName} has been booked successfully.`)
    } catch { toast.error('Failed to create booking', 'Please check your database connection.') } finally { setSubmitting(false) }
  }

  const handleEdit = async () => {
    if (!selectedBooking) return
    setSubmitting(true)
    try {
      await updateBooking(selectedBooking.id, { ...formData, price: formData.price ? Number(formData.price) : undefined })
      setIsEditOpen(false)
      toast.success('Booking updated!')
    } catch { toast.error('Failed to update booking') } finally { setSubmitting(false) }
  }

  const handleDelete = async (id: string) => {
    try { await deleteBooking(id); setDeleteConfirm(null); setIsDetailOpen(false); toast.success('Booking deleted') } catch { toast.error('Failed to delete booking') }
  }

  const handleStatusChange = async (id: string, status: Booking["status"]) => {
    try { await updateBooking(id, { status }); if (selectedBooking?.id === id) setSelectedBooking(prev => prev ? { ...prev, status } : null) } catch { }
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: "Total", value: stats.total, color: "text-luxury-charcoal-900 dark:text-white" },
          { label: "Pending", value: stats.pending, color: "text-amber-600" },
          { label: "Confirmed", value: stats.confirmed, color: "text-emerald-600" },
          { label: "Completed", value: stats.completed, color: "text-blue-600" },
          { label: "Revenue", value: `Rp ${stats.revenue.toLocaleString("id-ID")}`, color: "text-luxury-gold-600" },
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookings…"
              className="w-full pl-9 pr-3 h-11 rounded-xl border border-luxury-charcoal-200 dark:border-luxury-charcoal-700 bg-white dark:bg-luxury-charcoal-700/50 text-sm focus:ring-2 focus:ring-luxury-gold-400/30 focus:border-luxury-gold-400 outline-none transition-all" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 h-11 rounded-xl border-luxury-charcoal-200 dark:border-luxury-charcoal-700 bg-white dark:bg-luxury-charcoal-700/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {STATUS_OPTIONS.map(s => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <button className={`${primaryBtn} sm:ml-auto`} onClick={() => { setFormData(emptyForm); setIsAddOpen(true) }}>
            <Plus className="w-4 h-4" />Add Booking
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={`${cardCls} overflow-hidden`}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-luxury-charcoal-400">
            <Calendar className="w-12 h-12 mb-3 opacity-40" />
            <p className="font-medium">No bookings found</p>
            <p className="text-sm mt-1 opacity-70">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-luxury-charcoal-100 dark:border-luxury-charcoal-700/50">
                  {["Client", "Event", "Date", "Price", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-luxury-charcoal-500 dark:text-luxury-charcoal-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-charcoal-50 dark:divide-luxury-charcoal-700/30">
                {filtered.map(b => (
                  <tr key={b.id} className="hover:bg-luxury-charcoal-50/50 dark:hover:bg-luxury-charcoal-700/20 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-luxury-charcoal-900 dark:text-white">{b.clientName}</p>
                      <p className="text-xs text-luxury-charcoal-400">{b.email}</p>
                    </td>
                    <td className="px-4 py-3 text-luxury-charcoal-700 dark:text-luxury-charcoal-300">{b.eventType}</td>
                    <td className="px-4 py-3 text-luxury-charcoal-700 dark:text-luxury-charcoal-300 whitespace-nowrap">{b.eventDate}</td>
                    <td className="px-4 py-3 font-medium text-luxury-charcoal-900 dark:text-white">
                      {b.price ? `Rp ${Number(b.price).toLocaleString("id-ID")}` : "—"}
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setSelectedBooking(b); setIsDetailOpen(true) }} className="p-1.5 rounded-lg hover:bg-luxury-charcoal-100 dark:hover:bg-luxury-charcoal-700 text-luxury-charcoal-400 hover:text-luxury-charcoal-700 transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => openEdit(b)} className="p-1.5 rounded-lg hover:bg-luxury-charcoal-100 dark:hover:bg-luxury-charcoal-700 text-luxury-charcoal-400 hover:text-luxury-charcoal-700 transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteConfirm(b.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-luxury-charcoal-400 hover:text-red-500 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-2xl bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-luxury-charcoal-900 dark:text-white">New Booking</DialogTitle>
            <DialogDescription className="text-luxury-charcoal-500">Fill in the client and event details below.</DialogDescription>
          </DialogHeader>
          <BookingForm data={formData} onChange={setFormData} onSubmit={handleAdd} onCancel={() => setIsAddOpen(false)} loading={submitting} isEdit={false} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-luxury-charcoal-900 dark:text-white">Edit Booking</DialogTitle>
            <DialogDescription className="text-luxury-charcoal-500">Update booking for {selectedBooking?.clientName}</DialogDescription>
          </DialogHeader>
          <BookingForm data={formData} onChange={setFormData} onSubmit={handleEdit} onCancel={() => setIsEditOpen(false)} loading={submitting} isEdit />
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-luxury-charcoal-900 dark:text-white">Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <StatusBadge status={selectedBooking.status} />
                <span className="text-xs text-luxury-charcoal-400">{new Date(selectedBooking.createdAt).toLocaleDateString()}</span>
              </div>
              <div className={`${cardCls} p-4 space-y-3`}>
                {[
                  { icon: <User className="w-4 h-4" />, label: "Client", value: selectedBooking.clientName },
                  { icon: <Mail className="w-4 h-4" />, label: "Email", value: selectedBooking.email },
                  { icon: <Phone className="w-4 h-4" />, label: "Phone", value: selectedBooking.phone },
                  { icon: <Calendar className="w-4 h-4" />, label: "Event", value: selectedBooking.eventType },
                  { icon: <Calendar className="w-4 h-4" />, label: "Date", value: selectedBooking.eventDate },
                  { icon: <Clock className="w-4 h-4" />, label: "Time", value: selectedBooking.eventTime },
                  { icon: <MapPin className="w-4 h-4" />, label: "Location", value: selectedBooking.location },
                  { icon: <DollarSign className="w-4 h-4" />, label: "Price", value: selectedBooking.price ? `Rp ${Number(selectedBooking.price).toLocaleString("id-ID")}` : undefined },
                  { icon: <Eye className="w-4 h-4" />, label: "Notes", value: selectedBooking.notes },
                ].filter(r => r.value).map(r => (
                  <div key={r.label} className="flex items-start gap-3 py-1.5 border-b border-luxury-charcoal-50 dark:border-luxury-charcoal-700/50 last:border-0">
                    <span className="mt-0.5 text-luxury-gold-500">{r.icon}</span>
                    <div>
                      <p className="text-xs text-luxury-charcoal-400 uppercase tracking-wider">{r.label}</p>
                      <p className="text-sm font-medium text-luxury-charcoal-800 dark:text-luxury-charcoal-100">{r.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-luxury-charcoal-500 uppercase tracking-wider mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map(s => (
                    <button key={s} onClick={() => handleStatusChange(selectedBooking.id, s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${selectedBooking.status === s ? "bg-luxury-gold-500 text-white border-luxury-gold-500" : "border-luxury-charcoal-200 dark:border-luxury-charcoal-600 text-luxury-charcoal-600 dark:text-luxury-charcoal-400 hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-700/50"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2 border-t border-luxury-charcoal-100 dark:border-luxury-charcoal-700">
                <button className={outlineBtn} onClick={() => { setIsDetailOpen(false); openEdit(selectedBooking) }}><Edit className="w-4 h-4" />Edit</button>
                <button className={dangerBtn} onClick={() => { setIsDetailOpen(false); setDeleteConfirm(selectedBooking.id) }}><Trash2 className="w-4 h-4" />Delete</button>
                <button className={`${outlineBtn} ml-auto`} onClick={() => setIsDetailOpen(false)}>Close</button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-luxury-charcoal-900 dark:text-white">Delete Booking?</DialogTitle>
            <DialogDescription className="text-luxury-charcoal-500">This action cannot be undone.</DialogDescription>
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
