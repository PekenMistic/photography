"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mail, Phone, Reply, Trash2, Search, Eye, Clock, CheckCircle, AlertCircle, ChevronUp } from "lucide-react"
import { useDatabase, type Message } from "@/lib/database-context"

const cardCls = "bg-white dark:bg-luxury-charcoal-800 rounded-2xl border border-luxury-charcoal-100 dark:border-luxury-charcoal-700/50 shadow-sm"
const outlineBtn = "inline-flex items-center gap-2 px-3 py-2 border border-luxury-charcoal-200 dark:border-luxury-charcoal-600 text-luxury-charcoal-700 dark:text-luxury-charcoal-300 text-sm font-medium rounded-xl hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-700/50 transition-all duration-200"
const dangerBtn = "inline-flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl border border-red-200 dark:border-red-800/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
const primaryBtn = "inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-600 hover:from-luxury-gold-600 hover:to-luxury-gold-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50"

type Status = Message["status"]
type Priority = Message["priority"]

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { cls: string; label: string }> = {
    unread: { cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", label: "Unread" },
    read: { cls: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400", label: "Read" },
    replied: { cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", label: "Replied" },
  }
  const s = map[status]
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${s.cls}`}>{s.label}</span>
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const map: Record<Priority, { cls: string }> = {
    low: { cls: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400" },
    normal: { cls: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
    high: { cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
    urgent: { cls: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  }
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold capitalize ${map[priority].cls}`}>{priority}</span>
}

export default function MessageManager() {
  const { messages, updateMessage, deleteMessage } = useDatabase()
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  const stats = {
    total: messages.length,
    unread: messages.filter(m => m.status === "unread").length,
    replied: messages.filter(m => m.status === "replied").length,
    urgent: messages.filter(m => m.priority === "urgent" || m.priority === "high").length,
  }

  const filtered = messages.filter(m => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()) || (m.subject || "").toLowerCase().includes(search.toLowerCase()) || m.message.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "all" || m.status === filterStatus
    const matchPriority = filterPriority === "all" || m.priority === filterPriority
    return matchSearch && matchStatus && matchPriority
  })

  const openDetail = async (msg: Message) => {
    setSelectedMessage(msg)
    setIsDetailOpen(true)
    if (msg.status === "unread") {
      try { await updateMessage(msg.id, { status: "read" }) } catch { }
    }
  }

  const markReplied = async () => {
    if (!selectedMessage) return
    try {
      await updateMessage(selectedMessage.id, { status: "replied" })
      setSelectedMessage(prev => prev ? { ...prev, status: "replied" } : null)
      setReplyText("")
    } catch { }
  }

  const handleDelete = async (id: string) => {
    try { await deleteMessage(id); setDeleteConfirm(null); setIsDetailOpen(false) } catch { }
  }

  const setPriority = async (id: string, priority: Priority) => {
    try { await updateMessage(id, { priority }); setSelectedMessage(prev => prev ? { ...prev, priority } : null) } catch { }
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Messages", value: stats.total, color: "text-luxury-charcoal-900 dark:text-white" },
          { label: "Unread", value: stats.unread, color: "text-blue-600" },
          { label: "Replied", value: stats.replied, color: "text-emerald-600" },
          { label: "High Priority", value: stats.urgent, color: "text-amber-600" },
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages…"
              className="w-full pl-9 pr-3 h-11 rounded-xl border border-luxury-charcoal-200 dark:border-luxury-charcoal-700 bg-white dark:bg-luxury-charcoal-700/50 text-sm focus:ring-2 focus:ring-luxury-gold-400/30 focus:border-luxury-gold-400 outline-none transition-all" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-36 h-11 rounded-xl border-luxury-charcoal-200 dark:border-luxury-charcoal-700 bg-white dark:bg-luxury-charcoal-700/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-36 h-11 rounded-xl border-luxury-charcoal-200 dark:border-luxury-charcoal-700 bg-white dark:bg-luxury-charcoal-700/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Message List */}
      <div className={`${cardCls} overflow-hidden`}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-luxury-charcoal-400">
            <Mail className="w-12 h-12 mb-3 opacity-40" />
            <p className="font-medium">No messages found</p>
          </div>
        ) : (
          <div className="divide-y divide-luxury-charcoal-50 dark:divide-luxury-charcoal-700/30">
            {filtered.map(msg => (
              <div key={msg.id} className={`p-4 hover:bg-luxury-charcoal-50/50 dark:hover:bg-luxury-charcoal-700/20 transition-colors cursor-pointer ${msg.status === "unread" ? "border-l-2 border-blue-500" : ""}`}
                onClick={() => openDetail(msg)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-luxury-charcoal-100 to-luxury-charcoal-200 dark:from-luxury-charcoal-700 dark:to-luxury-charcoal-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-luxury-charcoal-600 dark:text-luxury-charcoal-200">{msg.name[0]?.toUpperCase()}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`font-semibold text-sm ${msg.status === "unread" ? "text-luxury-charcoal-900 dark:text-white" : "text-luxury-charcoal-700 dark:text-luxury-charcoal-300"}`}>{msg.name}</p>
                        <StatusBadge status={msg.status} />
                        <PriorityBadge priority={msg.priority} />
                      </div>
                      <p className="text-xs text-luxury-charcoal-400 mt-0.5">{msg.email}</p>
                      {msg.subject && <p className="text-sm font-medium text-luxury-charcoal-700 dark:text-luxury-charcoal-200 mt-1 truncate">{msg.subject}</p>}
                      <p className="text-xs text-luxury-charcoal-500 dark:text-luxury-charcoal-400 mt-1 line-clamp-2">{msg.message}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-xs text-luxury-charcoal-400 whitespace-nowrap">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                      <button onClick={() => { setSelectedMessage(msg); setIsDetailOpen(true) }} className="p-1.5 rounded-lg hover:bg-luxury-charcoal-100 dark:hover:bg-luxury-charcoal-700 text-luxury-charcoal-400 hover:text-luxury-charcoal-700 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setDeleteConfirm(msg.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-luxury-charcoal-400 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-luxury-charcoal-900 dark:text-white">Message Detail</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <StatusBadge status={selectedMessage.status} />
                <PriorityBadge priority={selectedMessage.priority} />
              </div>
              <div className={`${cardCls} p-4 space-y-3`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-luxury-gold-100 to-luxury-gold-200 dark:from-luxury-gold-900/30 dark:to-luxury-gold-800/30 flex items-center justify-center">
                    <span className="text-lg font-bold text-luxury-gold-600">{selectedMessage.name[0]?.toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-luxury-charcoal-900 dark:text-white">{selectedMessage.name}</p>
                    <p className="text-sm text-luxury-charcoal-400">{selectedMessage.email}</p>
                    {selectedMessage.phone && <p className="text-sm text-luxury-charcoal-400">{selectedMessage.phone}</p>}
                  </div>
                </div>
                {selectedMessage.subject && (
                  <div className="pt-2 border-t border-luxury-charcoal-50 dark:border-luxury-charcoal-700/50">
                    <p className="text-xs font-semibold text-luxury-charcoal-500 uppercase tracking-wider">Subject</p>
                    <p className="text-sm font-semibold text-luxury-charcoal-800 dark:text-luxury-charcoal-100 mt-0.5">{selectedMessage.subject}</p>
                  </div>
                )}
                <div className="pt-2 border-t border-luxury-charcoal-50 dark:border-luxury-charcoal-700/50">
                  <p className="text-xs font-semibold text-luxury-charcoal-500 uppercase tracking-wider mb-1">Message</p>
                  <p className="text-sm text-luxury-charcoal-700 dark:text-luxury-charcoal-300 leading-relaxed">{selectedMessage.message}</p>
                </div>
                <div className="pt-2 border-t border-luxury-charcoal-50 dark:border-luxury-charcoal-700/50">
                  <p className="text-xs text-luxury-charcoal-400">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                </div>
              </div>
              {/* Priority Setter */}
              <div>
                <p className="text-xs font-semibold text-luxury-charcoal-500 uppercase tracking-wider mb-2">Set Priority</p>
                <div className="flex gap-2 flex-wrap">
                  {(["low", "normal", "high", "urgent"] as Priority[]).map(p => (
                    <button key={p} onClick={() => setPriority(selectedMessage.id, p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border transition-all ${selectedMessage.priority === p ? "bg-luxury-gold-500 text-white border-luxury-gold-500" : "border-luxury-charcoal-200 dark:border-luxury-charcoal-600 text-luxury-charcoal-600 dark:text-luxury-charcoal-400 hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-700/50"}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              {/* Quick Reply */}
              {selectedMessage.status !== "replied" && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-luxury-charcoal-500 uppercase tracking-wider">Quick Reply</p>
                  <Textarea className="border-luxury-charcoal-200 dark:border-luxury-charcoal-700 dark:bg-luxury-charcoal-700/50 rounded-xl text-sm min-h-[80px]"
                    placeholder={`Reply to ${selectedMessage.email}…`} value={replyText} onChange={e => setReplyText(e.target.value)} />
                  <button className={primaryBtn} onClick={markReplied} disabled={!replyText.trim()}>
                    <Reply className="w-4 h-4" />Mark as Replied
                  </button>
                </div>
              )}
              <div className="flex gap-3 pt-2 border-t border-luxury-charcoal-100 dark:border-luxury-charcoal-700">
                <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || "Your message"}`} className={outlineBtn}>
                  <Mail className="w-4 h-4" />Email Client
                </a>
                <button className={dangerBtn} onClick={() => { setIsDetailOpen(false); setDeleteConfirm(selectedMessage.id) }}>
                  <Trash2 className="w-4 h-4" />Delete
                </button>
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
            <DialogTitle className="text-lg font-bold text-luxury-charcoal-900 dark:text-white">Delete Message?</DialogTitle>
            <DialogDescription className="text-luxury-charcoal-500">This message will be permanently deleted.</DialogDescription>
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
