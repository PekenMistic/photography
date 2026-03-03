"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Save, Settings, Globe, Phone, Palette, Camera, Plus, Edit, Trash2,
  Search, AlertCircle, CheckCircle, Code, User, RefreshCw
} from "lucide-react"
import { useDatabase, type Setting } from "@/lib/database-context"
import { useLuxuryToast } from "@/components/ui/luxury-toast"

const cardCls = "bg-white dark:bg-luxury-charcoal-800 rounded-2xl border border-luxury-charcoal-100 dark:border-luxury-charcoal-700/50 shadow-sm"
const inputCls = "border-luxury-charcoal-200 dark:border-luxury-charcoal-700 dark:bg-luxury-charcoal-700/50 rounded-xl h-11 text-sm focus:ring-2 focus:ring-luxury-gold-400/30 focus:border-luxury-gold-400 transition-all"
const labelCls = "text-xs font-semibold text-luxury-charcoal-600 dark:text-luxury-charcoal-400 uppercase tracking-wider"
const primaryBtn = "inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-600 hover:from-luxury-gold-600 hover:to-luxury-gold-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50"
const outlineBtn = "inline-flex items-center gap-2 px-3 py-2 border border-luxury-charcoal-200 dark:border-luxury-charcoal-600 text-luxury-charcoal-700 dark:text-luxury-charcoal-300 text-sm font-medium rounded-xl hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-700/50 transition-all duration-200"
const dangerBtn = "inline-flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl border border-red-200 dark:border-red-800/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"

// ── Section groups ─────────────────────────────────────────────────────────────
const SETTING_GROUPS = [
  {
    key: "general", label: "General", icon: Settings, color: "text-luxury-charcoal-600",
    fields: [
      { key: "site_title", label: "Site Title", type: "text", placeholder: "Madiun Photography", description: "Displayed in browser tab and search results" },
      { key: "business_name", label: "Business Name", type: "text", placeholder: "Madiun Photography Studio" },
      { key: "business_tagline", label: "Tagline", type: "text", placeholder: "Capturing Life's Most Precious Moments" },
      { key: "site_description", label: "Site Description", type: "textarea", placeholder: "Professional photography services…" },
      { key: "business_about", label: "About Business", type: "textarea", placeholder: "Tell visitors about your business…" },
    ]
  },
  {
    key: "contact", label: "Contact", icon: Phone, color: "text-blue-600",
    fields: [
      { key: "contact_email", label: "Email Address", type: "email", placeholder: "info@madiunphotography.com" },
      { key: "contact_phone", label: "Phone Number", type: "text", placeholder: "+62 xxx xxxx xxxx" },
      { key: "contact_whatsapp", label: "WhatsApp", type: "text", placeholder: "+62 xxx xxxx xxxx" },
      { key: "contact_address", label: "Business Address", type: "textarea", placeholder: "Jl. Photography No. 1, Madiun…" },
      { key: "contact_hours", label: "Business Hours", type: "text", placeholder: "Mon-Fri: 09:00–18:00, Sat: 10:00–16:00" },
    ]
  },
  {
    key: "social", label: "Social Media", icon: Globe, color: "text-teal-600",
    fields: [
      { key: "social_instagram", label: "Instagram URL", type: "url", placeholder: "https://instagram.com/yourhandle" },
      { key: "social_facebook", label: "Facebook URL", type: "url", placeholder: "https://facebook.com/yourpage" },
      { key: "social_tiktok", label: "TikTok URL", type: "url", placeholder: "https://tiktok.com/@yourhandle" },
      { key: "social_youtube", label: "YouTube URL", type: "url", placeholder: "https://youtube.com/yourchannel" },
      { key: "social_twitter", label: "Twitter / X URL", type: "url", placeholder: "https://x.com/yourhandle" },
    ]
  },
  {
    key: "booking", label: "Booking", icon: Camera, color: "text-luxury-gold-600",
    fields: [
      { key: "booking_enabled", label: "Enable Online Booking", type: "toggle", placeholder: "true" },
      { key: "booking_advance_days", label: "Minimum Advance Days", type: "number", placeholder: "7" },
      { key: "booking_deposit_percentage", label: "Deposit Percentage (%)", type: "number", placeholder: "25" },
      { key: "booking_confirmation_email", label: "Confirmation Email Message", type: "textarea", placeholder: "Thank you for booking with us…" },
    ]
  },
  {
    key: "seo", label: "SEO", icon: Code, color: "text-purple-600",
    fields: [
      { key: "seo_meta_title", label: "Meta Title", type: "text", placeholder: "Madiun Photography | Professional Photography Services" },
      { key: "seo_meta_description", label: "Meta Description", type: "textarea", placeholder: "Professional photography services in Madiun…" },
      { key: "seo_keywords", label: "Keywords", type: "text", placeholder: "photography, wedding, portrait, madiun" },
      { key: "seo_og_image", label: "OG Image URL", type: "url", placeholder: "https://…/og-image.jpg" },
    ]
  },
]

const VALUE_TYPES = ["text", "number", "url", "email", "toggle", "textarea", "color"]

// ── Alert component ────────────────────────────────────────────────────────────
function Alert({ type, title, message, onDismiss }: { type: "success" | "error" | "warning" | "info"; title: string; message?: string; onDismiss: () => void }) {
  const cfg = {
    success: { bg: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50", icon: <CheckCircle className="w-4 h-4 text-emerald-500" />, text: "text-emerald-700 dark:text-emerald-400" },
    error: { bg: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50", icon: <AlertCircle className="w-4 h-4 text-red-500" />, text: "text-red-700 dark:text-red-400" },
    warning: { bg: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50", icon: <AlertCircle className="w-4 h-4 text-amber-500" />, text: "text-amber-700 dark:text-amber-400" },
    info: { bg: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50", icon: <AlertCircle className="w-4 h-4 text-blue-500" />, text: "text-blue-700 dark:text-blue-400" },
  }[type]
  return (
    <div className={`flex items-start gap-3 border rounded-xl px-4 py-3 ${cfg.bg}`}>
      {cfg.icon}
      <div className="flex-1">
        <p className={`text-sm font-semibold ${cfg.text}`}>{title}</p>
        {message && <p className={`text-xs mt-0.5 opacity-80 ${cfg.text}`}>{message}</p>}
      </div>
      <button onClick={onDismiss} className={`text-sm ${cfg.text} opacity-60 hover:opacity-100`}>✕</button>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function SettingsManager() {
  const { settings, updateSetting, loading, error, refreshSettings } = useDatabase()
  const toast = useLuxuryToast()

  const [activeGroup, setActiveGroup] = useState("general")
  const [search, setSearch] = useState("")
  const [localValues, setLocalValues] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const [groupSaving, setGroupSaving] = useState(false)
  const [alert, setAlert] = useState<{ type: "success" | "error" | "warning"; title: string; message?: string } | null>(null)

  // Custom settings CRUD
  const [customSettings, setCustomSettings] = useState<Setting[]>([])
  const [isAddCustomOpen, setIsAddCustomOpen] = useState(false)
  const [editingCustom, setEditingCustom] = useState<Setting | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [customForm, setCustomForm] = useState({ key: "", value: "", description: "", type: "text" })
  const [customSubmitting, setCustomSubmitting] = useState(false)

  // Known keys from setting groups
  const knownKeys = new Set(SETTING_GROUPS.flatMap(g => g.fields.map(f => f.key)))

  useEffect(() => {
    if (settings.length > 0) {
      const vals: Record<string, string> = {}
      const customs: Setting[] = []
      settings.forEach(s => {
        vals[s.key] = s.value
        if (!knownKeys.has(s.key)) customs.push(s)
      })
      setLocalValues(vals)
      setCustomSettings(customs)
    }
  }, [settings])

  const getValue = (key: string, placeholder: string) => localValues[key] ?? ""

  const setSingle = (key: string, val: string) => setLocalValues(prev => ({ ...prev, [key]: val }))

  const saveField = async (key: string, value: string) => {
    setSaving(prev => ({ ...prev, [key]: true }))
    try {
      await updateSetting(key, value)
      setSaved(prev => ({ ...prev, [key]: true }))
      setTimeout(() => setSaved(prev => ({ ...prev, [key]: false })), 2000)
      toast.success("Setting saved", `"${key}" updated successfully`)
    } catch (e) {
      toast.error("Failed to save", `Could not update "${key}". Check your database connection.`)
    } finally {
      setSaving(prev => ({ ...prev, [key]: false }))
    }
  }

  const saveGroup = async (groupKey: string) => {
    const group = SETTING_GROUPS.find(g => g.key === groupKey)
    if (!group) return
    setGroupSaving(true)
    setAlert(null)
    let successCount = 0
    let errorCount = 0
    for (const field of group.fields) {
      const val = localValues[field.key]
      if (val !== undefined) {
        try {
          await updateSetting(field.key, val)
          successCount++
        } catch {
          errorCount++
        }
      }
    }
    setGroupSaving(false)
    if (errorCount === 0) {
      setAlert({ type: "success", title: `${group.label} settings saved`, message: `${successCount} settings updated successfully.` })
      toast.success(`${group.label} settings saved!`)
    } else {
      setAlert({ type: "warning", title: "Partial save", message: `${successCount} saved, ${errorCount} failed. Check your DB connection.` })
    }
  }

  // Custom settings CRUD
  const handleAddCustom = async () => {
    if (!customForm.key || !customForm.value) return
    setCustomSubmitting(true)
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: customForm.key, value: customForm.value, description: customForm.description }),
      })
      if (!res.ok) throw new Error("Failed")
      await refreshSettings()
      setIsAddCustomOpen(false)
      setCustomForm({ key: "", value: "", description: "", type: "text" })
      toast.success("Custom setting added", `"${customForm.key}" created successfully`)
      setAlert({ type: "success", title: "Custom setting added", message: `Key "${customForm.key}" was created.` })
    } catch {
      toast.error("Failed to add setting")
      setAlert({ type: "error", title: "Failed to add setting", message: "Check your database connection." })
    } finally {
      setCustomSubmitting(false)
    }
  }

  const handleEditCustom = async () => {
    if (!editingCustom) return
    setCustomSubmitting(true)
    try {
      await updateSetting(editingCustom.key, customForm.value)
      await refreshSettings()
      setEditingCustom(null)
      toast.success("Setting updated")
      setAlert({ type: "success", title: "Setting updated", message: `"${editingCustom.key}" updated.` })
    } catch {
      toast.error("Failed to update setting")
    } finally {
      setCustomSubmitting(false)
    }
  }

  const handleDeleteCustom = async (key: string) => {
    try {
      const res = await fetch(`/api/settings/${key}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed")
      await refreshSettings()
      setDeleteConfirm(null)
      toast.success("Setting deleted")
      setAlert({ type: "success", title: "Setting deleted", message: `"${key}" was removed.` })
    } catch {
      toast.error("Failed to delete setting")
    }
  }

  // ── Error / Loading ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className={`${cardCls} p-12 flex flex-col items-center justify-center`}>
        <RefreshCw className="w-8 h-8 text-luxury-charcoal-300 animate-spin mb-3" />
        <p className="text-sm text-luxury-charcoal-400">Loading settings…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${cardCls} p-8`}>
        <div className="flex flex-col items-center text-center max-w-sm mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-4">
            <AlertCircle className="w-7 h-7 text-red-500" />
          </div>
          <h3 className="text-base font-bold text-luxury-charcoal-900 dark:text-white mb-2">Database Connection Error</h3>
          <p className="text-sm text-luxury-charcoal-500 mb-4">{error}</p>
          <div className="bg-luxury-charcoal-50 dark:bg-luxury-charcoal-700/50 rounded-xl p-4 text-left w-full mb-4">
            <p className="text-xs font-mono text-luxury-charcoal-600 dark:text-luxury-charcoal-300">
              Add to <strong>.env.local</strong>:<br />
              DATABASE_URL=postgresql://user:pass@host/db
            </p>
          </div>
          <button className={primaryBtn} onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4" />Retry Connection
          </button>
        </div>
      </div>
    )
  }

  const activeGroupData = SETTING_GROUPS.find(g => g.key === activeGroup)

  return (
    <div className="space-y-4">
      {/* Alert */}
      {alert && (
        <Alert type={alert.type} title={alert.title} message={alert.message} onDismiss={() => setAlert(null)} />
      )}

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left: Tab Navigation */}
        <div className="lg:w-52 flex-shrink-0">
          <div className={`${cardCls} p-2`}>
            {SETTING_GROUPS.map(group => {
              const Icon = group.icon
              const isActive = activeGroup === group.key
              return (
                <button key={group.key} onClick={() => setActiveGroup(group.key)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left mb-0.5 last:mb-0
                    ${isActive ? "bg-luxury-charcoal-900 dark:bg-luxury-gold-500/20 text-white dark:text-luxury-gold-300" : "text-luxury-charcoal-600 dark:text-luxury-charcoal-400 hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-700/50"}`}>
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white dark:text-luxury-gold-400" : group.color}`} />
                  {group.label}
                </button>
              )
            })}
            <div className="border-t border-luxury-charcoal-100 dark:border-luxury-charcoal-700/50 mt-1 pt-1">
              <button onClick={() => setActiveGroup("custom")}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left
                  ${activeGroup === "custom" ? "bg-luxury-charcoal-900 dark:bg-luxury-gold-500/20 text-white dark:text-luxury-gold-300" : "text-luxury-charcoal-600 dark:text-luxury-charcoal-400 hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-700/50"}`}>
                <Code className={`w-4 h-4 flex-shrink-0 ${activeGroup === "custom" ? "text-white dark:text-luxury-gold-400" : "text-purple-600"}`} />
                Custom
                {customSettings.length > 0 && (
                  <span className="ml-auto text-xs bg-luxury-charcoal-100 dark:bg-luxury-charcoal-700 text-luxury-charcoal-600 dark:text-luxury-charcoal-300 px-1.5 py-0.5 rounded-full font-bold">{customSettings.length}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Settings Panel */}
        <div className="flex-1 min-w-0">
          {activeGroup !== "custom" && activeGroupData && (
            <div className={`${cardCls} p-5`}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-luxury-charcoal-50 dark:bg-luxury-charcoal-700/50 flex items-center justify-center`}>
                    <activeGroupData.icon className={`w-4 h-4 ${activeGroupData.color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-luxury-charcoal-900 dark:text-white">{activeGroupData.label} Settings</h3>
                    <p className="text-xs text-luxury-charcoal-400">{activeGroupData.fields.length} configurable fields</p>
                  </div>
                </div>
                <button className={primaryBtn} onClick={() => saveGroup(activeGroup)} disabled={groupSaving}>
                  {groupSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {groupSaving ? "Saving…" : "Save All"}
                </button>
              </div>

              <div className="space-y-4">
                {activeGroupData.fields.map(field => {
                  const val = getValue(field.key, field.placeholder)
                  const isSaving = saving[field.key]
                  const isSaved = saved[field.key]

                  if (field.type === "toggle") {
                    return (
                      <div key={field.key} className="flex items-center justify-between py-3 border-b border-luxury-charcoal-50 dark:border-luxury-charcoal-700/50 last:border-0">
                        <div>
                          <label className={labelCls}>{field.label}</label>
                          {field.description && <p className="text-xs text-luxury-charcoal-400 mt-0.5">{field.description}</p>}
                        </div>
                        <button onClick={() => {
                          const next = val === "true" ? "false" : "true"
                          setSingle(field.key, next)
                          saveField(field.key, next)
                        }} className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${val === "true" ? "bg-luxury-gold-500" : "bg-luxury-charcoal-200 dark:bg-luxury-charcoal-600"}`}>
                          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${val === "true" ? "translate-x-5" : "translate-x-0.5"}`} />
                        </button>
                      </div>
                    )
                  }

                  return (
                    <div key={field.key} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className={labelCls}>{field.label}</label>
                        {isSaved && <span className="text-xs text-emerald-500 flex items-center gap-1"><CheckCircle className="w-3 h-3" />Saved</span>}
                      </div>
                      {field.description && <p className="text-xs text-luxury-charcoal-400">{field.description}</p>}
                      <div className="flex gap-2">
                        {field.type === "textarea" ? (
                          <Textarea className="border-luxury-charcoal-200 dark:border-luxury-charcoal-700 dark:bg-luxury-charcoal-700/50 rounded-xl text-sm min-h-[80px] flex-1"
                            placeholder={field.placeholder} value={val} onChange={e => setSingle(field.key, e.target.value)} />
                        ) : (
                          <Input className={`${inputCls} flex-1`} type={field.type} placeholder={field.placeholder} value={val} onChange={e => setSingle(field.key, e.target.value)} />
                        )}
                        <button onClick={() => saveField(field.key, val)} disabled={isSaving}
                          className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl border border-luxury-charcoal-200 dark:border-luxury-charcoal-600 hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-700/50 transition-colors disabled:opacity-50" title="Save this field">
                          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin text-luxury-charcoal-400" /> : <Save className="w-4 h-4 text-luxury-charcoal-500" />}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Custom Settings */}
          {activeGroup === "custom" && (
            <div className={`${cardCls} p-5`}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-bold text-luxury-charcoal-900 dark:text-white">Custom Settings</h3>
                  <p className="text-xs text-luxury-charcoal-400 mt-0.5">Add your own key-value configuration pairs</p>
                </div>
                <button className={primaryBtn} onClick={() => { setCustomForm({ key: "", value: "", description: "", type: "text" }); setIsAddCustomOpen(true) }}>
                  <Plus className="w-4 h-4" />Add Setting
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-charcoal-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search custom settings…"
                  className="w-full pl-9 pr-3 h-11 rounded-xl border border-luxury-charcoal-200 dark:border-luxury-charcoal-700 bg-white dark:bg-luxury-charcoal-700/50 text-sm focus:ring-2 focus:ring-luxury-gold-400/30 focus:border-luxury-gold-400 outline-none transition-all" />
              </div>

              {customSettings.filter(s => !search || s.key.includes(search.toLowerCase()) || s.value.includes(search.toLowerCase())).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-luxury-charcoal-400">
                  <Settings className="w-10 h-10 mb-3 opacity-30" />
                  <p className="font-medium text-sm">No custom settings</p>
                  <p className="text-xs mt-1 opacity-70">Add key-value pairs for custom configuration</p>
                </div>
              ) : (
                <div className="divide-y divide-luxury-charcoal-50 dark:divide-luxury-charcoal-700/30">
                  {customSettings
                    .filter(s => !search || s.key.includes(search.toLowerCase()) || s.value.includes(search.toLowerCase()))
                    .map(setting => (
                      <div key={setting.key} className="py-3 flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <code className="text-xs font-mono text-luxury-charcoal-700 dark:text-luxury-charcoal-200 bg-luxury-charcoal-100 dark:bg-luxury-charcoal-700 px-2 py-0.5 rounded">{setting.key}</code>
                          </div>
                          <p className="text-sm text-luxury-charcoal-600 dark:text-luxury-charcoal-300 mt-1 truncate">{setting.value}</p>
                          {setting.description && <p className="text-xs text-luxury-charcoal-400 mt-0.5">{setting.description}</p>}
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <button onClick={() => { setEditingCustom(setting); setCustomForm({ key: setting.key, value: setting.value, description: setting.description || "", type: "text" }) }}
                            className="p-1.5 rounded-lg hover:bg-luxury-charcoal-100 dark:hover:bg-luxury-charcoal-700 text-luxury-charcoal-400 hover:text-luxury-charcoal-700 transition-colors"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => setDeleteConfirm(setting.key)}
                            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-luxury-charcoal-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Custom Setting Dialog */}
      <Dialog open={isAddCustomOpen} onOpenChange={setIsAddCustomOpen}>
        <DialogContent className="max-w-md bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-luxury-charcoal-900 dark:text-white">Add Custom Setting</DialogTitle>
            <DialogDescription className="text-luxury-charcoal-500">Create a new key-value configuration pair.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className={labelCls}>Key * <span className="normal-case font-normal text-luxury-charcoal-400">(lowercase, no spaces)</span></label>
              <Input className={inputCls} placeholder="my_custom_key" value={customForm.key}
                onChange={e => setCustomForm(prev => ({ ...prev, key: e.target.value.replace(/\s+/g, "_").toLowerCase() }))} />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Value *</label>
              <Textarea className="border-luxury-charcoal-200 dark:border-luxury-charcoal-700 dark:bg-luxury-charcoal-700/50 rounded-xl text-sm min-h-[80px]"
                placeholder="Setting value…" value={customForm.value} onChange={e => setCustomForm(prev => ({ ...prev, value: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Description</label>
              <Input className={inputCls} placeholder="What this setting controls…" value={customForm.description}
                onChange={e => setCustomForm(prev => ({ ...prev, description: e.target.value }))} />
            </div>
            <div className="flex gap-3 pt-2 border-t border-luxury-charcoal-100 dark:border-luxury-charcoal-700">
              <button className={primaryBtn} onClick={handleAddCustom} disabled={customSubmitting || !customForm.key || !customForm.value}>
                {customSubmitting && <RefreshCw className="w-4 h-4 animate-spin" />}Add Setting
              </button>
              <button className={outlineBtn} onClick={() => setIsAddCustomOpen(false)}>Cancel</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Custom Setting Dialog */}
      <Dialog open={!!editingCustom} onOpenChange={() => setEditingCustom(null)}>
        <DialogContent className="max-w-md bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-luxury-charcoal-900 dark:text-white">Edit Setting</DialogTitle>
            <DialogDescription className="text-luxury-charcoal-500 font-mono">{editingCustom?.key}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className={labelCls}>Value *</label>
              <Textarea className="border-luxury-charcoal-200 dark:border-luxury-charcoal-700 dark:bg-luxury-charcoal-700/50 rounded-xl text-sm min-h-[80px]"
                value={customForm.value} onChange={e => setCustomForm(prev => ({ ...prev, value: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Description</label>
              <Input className={inputCls} placeholder="What this setting controls…" value={customForm.description}
                onChange={e => setCustomForm(prev => ({ ...prev, description: e.target.value }))} />
            </div>
            <div className="flex gap-3 pt-2 border-t border-luxury-charcoal-100 dark:border-luxury-charcoal-700">
              <button className={primaryBtn} onClick={handleEditCustom} disabled={customSubmitting || !customForm.value}>
                {customSubmitting && <RefreshCw className="w-4 h-4 animate-spin" />}Save Changes
              </button>
              <button className={outlineBtn} onClick={() => setEditingCustom(null)}>Cancel</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-luxury-charcoal-900 dark:text-white">Delete Setting?</DialogTitle>
            <DialogDescription className="text-luxury-charcoal-500">
              Setting <code className="font-mono text-luxury-charcoal-700 dark:text-luxury-charcoal-200 bg-luxury-charcoal-100 dark:bg-luxury-charcoal-700 px-1.5 py-0.5 rounded">{deleteConfirm}</code> will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-2">
            <button className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors" onClick={() => deleteConfirm && handleDeleteCustom(deleteConfirm)}>Delete</button>
            <button className={`flex-1 ${outlineBtn} justify-center`} onClick={() => setDeleteConfirm(null)}>Cancel</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
