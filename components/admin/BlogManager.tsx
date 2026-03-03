"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Edit, Trash2, Plus, Search, Eye, BookOpen, Heart, Clock } from "lucide-react"
import Image from "next/image"
import { useDatabase, type BlogPost } from "@/lib/database-context"
import { useLuxuryToast } from "@/components/ui/luxury-toast"

const cardCls = "bg-white dark:bg-luxury-charcoal-800 rounded-2xl border border-luxury-charcoal-100 dark:border-luxury-charcoal-700/50 shadow-sm"
const inputCls = "border-luxury-charcoal-200 dark:border-luxury-charcoal-700 dark:bg-luxury-charcoal-700/50 rounded-xl h-11 text-sm focus:ring-2 focus:ring-luxury-gold-400/30 focus:border-luxury-gold-400 transition-all"
const labelCls = "text-xs font-semibold text-luxury-charcoal-600 dark:text-luxury-charcoal-400 uppercase tracking-wider"
const primaryBtn = "inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-600 hover:from-luxury-gold-600 hover:to-luxury-gold-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50"
const outlineBtn = "inline-flex items-center gap-2 px-3 py-2 border border-luxury-charcoal-200 dark:border-luxury-charcoal-600 text-luxury-charcoal-700 dark:text-luxury-charcoal-300 text-sm font-medium rounded-xl hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-700/50 transition-all duration-200"
const dangerBtn = "inline-flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl border border-red-200 dark:border-red-800/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"

const CATEGORIES = ["Wedding Tips", "Photography Tips", "Behind the Scenes", "Portfolio", "Client Stories", "Business", "Technology"]

interface FormData {
  title: string; excerpt: string; content: string; author: string; date: string; readTime: string
  category: string; tags: string; image: string; featured: boolean; published: boolean
}
const emptyForm: FormData = {
  title: "", excerpt: "", content: "", author: "Admin", date: new Date().toISOString().split("T")[0],
  readTime: "5 min read", category: "", tags: "", image: "", featured: false, published: false
}

function BlogForm({ data, onChange, onSubmit, onCancel, loading, isEdit }: {
  data: FormData; onChange: (d: FormData) => void; onSubmit: () => void
  onCancel: () => void; loading: boolean; isEdit: boolean
}) {
  const set = (k: keyof FormData, v: string | boolean) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
      <div className="space-y-1.5">
        <label className={labelCls}>Title *</label>
        <Input className={inputCls} placeholder="Blog post title" value={data.title} onChange={e => set("title", e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelCls}>Category</label>
          <Select value={data.category} onValueChange={v => set("category", v)}>
            <SelectTrigger className={inputCls}><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Author</label>
          <Input className={inputCls} value={data.author} onChange={e => set("author", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Date</label>
          <Input className={inputCls} type="date" value={data.date} onChange={e => set("date", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Read Time</label>
          <Input className={inputCls} placeholder="5 min read" value={data.readTime} onChange={e => set("readTime", e.target.value)} />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className={labelCls}>Excerpt *</label>
        <Textarea className="border-luxury-charcoal-200 dark:border-luxury-charcoal-700 dark:bg-luxury-charcoal-700/50 rounded-xl text-sm min-h-[70px]" placeholder="Short preview/summary of the post…" value={data.excerpt} onChange={e => set("excerpt", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelCls}>Content *</label>
        <Textarea className="border-luxury-charcoal-200 dark:border-luxury-charcoal-700 dark:bg-luxury-charcoal-700/50 rounded-xl text-sm min-h-[120px]" placeholder="Full blog post content…" value={data.content} onChange={e => set("content", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelCls}>Cover Image URL</label>
        <Input className={inputCls} placeholder="https://… or /images/photo.jpg" value={data.image} onChange={e => set("image", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelCls}>Tags (comma separated)</label>
        <Input className={inputCls} placeholder="wedding, photography, tips" value={data.tags} onChange={e => set("tags", e.target.value)} />
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button onClick={() => set("published", !data.published)}
            className={`relative w-10 h-5 rounded-full transition-colors ${data.published ? "bg-emerald-500" : "bg-luxury-charcoal-200 dark:bg-luxury-charcoal-600"}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${data.published ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
          <span className="text-sm text-luxury-charcoal-600 dark:text-luxury-charcoal-400">Published</span>
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
        <button className={primaryBtn} onClick={onSubmit} disabled={loading || !data.title || !data.excerpt || !data.content}>
          {loading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
          {isEdit ? "Save Changes" : "Publish Post"}
        </button>
        <button className={outlineBtn} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default function BlogManager() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useDatabase()
  const toast = useLuxuryToast()
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  const stats = {
    total: blogPosts.length,
    published: blogPosts.filter(p => p.published).length,
    draft: blogPosts.filter(p => !p.published).length,
    featured: blogPosts.filter(p => p.featured).length,
    views: blogPosts.reduce((s, p) => s + (p.views || 0), 0),
  }

  const filtered = blogPosts.filter(p => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "all" || (filterStatus === "published" && p.published) || (filterStatus === "draft" && !p.published) || (filterStatus === "featured" && p.featured)
    return matchSearch && matchStatus
  })

  const openEdit = (post: BlogPost) => {
    setSelectedPost(post)
    setFormData({ title: post.title, excerpt: post.excerpt, content: post.content, author: post.author, date: post.date, readTime: post.readTime, category: post.category, tags: (post.tags || []).join(", "), image: post.image, featured: post.featured, published: post.published })
    setIsEditOpen(true)
  }

  const toPost = (d: FormData) => ({ ...d, tags: d.tags.split(",").map(t => t.trim()).filter(Boolean), views: 0, likes: 0 })

  const handleAdd = async () => {
    setSubmitting(true)
    try { await addBlogPost(toPost(formData)); setIsAddOpen(false); setFormData(emptyForm); toast.success('Post published!', `"${formData.title}" has been created.`) } catch { toast.error('Failed to create post') } finally { setSubmitting(false) }
  }

  const handleEdit = async () => {
    if (!selectedPost) return
    setSubmitting(true)
    try { await updateBlogPost(selectedPost.id, toPost(formData)); setIsEditOpen(false); toast.success('Post updated!') } catch { toast.error('Failed to update post') } finally { setSubmitting(false) }
  }

  const handleDelete = async (id: string) => {
    try { await deleteBlogPost(id); setDeleteConfirm(null); toast.success('Post deleted') } catch { toast.error('Failed to delete post') }
  }

  const togglePublished = async (post: BlogPost) => {
    try { await updateBlogPost(post.id, { published: !post.published }); toast.info(post.published ? 'Post unpublished' : 'Post published!') } catch { toast.error('Failed to update post') }
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: "Total Posts", value: stats.total, color: "text-luxury-charcoal-900 dark:text-white" },
          { label: "Published", value: stats.published, color: "text-emerald-600" },
          { label: "Drafts", value: stats.draft, color: "text-amber-600" },
          { label: "Featured", value: stats.featured, color: "text-luxury-gold-600" },
          { label: "Total Views", value: stats.views.toLocaleString(), color: "text-blue-600" },
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts…"
              className="w-full pl-9 pr-3 h-11 rounded-xl border border-luxury-charcoal-200 dark:border-luxury-charcoal-700 bg-white dark:bg-luxury-charcoal-700/50 text-sm focus:ring-2 focus:ring-luxury-gold-400/30 focus:border-luxury-gold-400 outline-none transition-all" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-36 h-11 rounded-xl border-luxury-charcoal-200 dark:border-luxury-charcoal-700 bg-white dark:bg-luxury-charcoal-700/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Posts</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
            </SelectContent>
          </Select>
          <button className={`${primaryBtn} sm:ml-auto`} onClick={() => { setFormData(emptyForm); setIsAddOpen(true) }}>
            <Plus className="w-4 h-4" />New Post
          </button>
        </div>
      </div>

      {/* Blog Post List */}
      {filtered.length === 0 ? (
        <div className={`${cardCls} flex flex-col items-center justify-center py-16 text-luxury-charcoal-400`}>
          <BookOpen className="w-12 h-12 mb-3 opacity-40" />
          <p className="font-medium">No blog posts found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map(post => (
            <div key={post.id} className={`${cardCls} overflow-hidden`}>
              {post.image && (
                <div className="relative h-36 bg-luxury-charcoal-100 dark:bg-luxury-charcoal-700">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${post.published ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"}`}>{post.published ? "Published" : "Draft"}</span>
                    {post.featured && <span className="text-xs font-semibold px-2 py-0.5 bg-luxury-gold-500 text-white rounded">Featured</span>}
                  </div>
                </div>
              )}
              <div className="p-4">
                {!post.image && (
                  <div className="flex gap-1.5 mb-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${post.published ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>{post.published ? "Published" : "Draft"}</span>
                    {post.featured && <span className="text-xs font-semibold px-2 py-0.5 bg-luxury-gold-100 text-luxury-gold-700 dark:bg-luxury-gold-900/30 dark:text-luxury-gold-400 rounded">Featured</span>}
                  </div>
                )}
                <p className="font-semibold text-luxury-charcoal-900 dark:text-white line-clamp-2">{post.title}</p>
                <p className="text-xs text-luxury-charcoal-400 mt-1">{post.category} · {post.readTime} · {post.date}</p>
                <p className="text-sm text-luxury-charcoal-500 dark:text-luxury-charcoal-400 mt-2 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-luxury-charcoal-50 dark:border-luxury-charcoal-700/50">
                  <span className="text-xs text-luxury-charcoal-400 flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{post.views || 0}</span>
                  <span className="text-xs text-luxury-charcoal-400 flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{post.likes || 0}</span>
                  <div className="flex items-center gap-1 ml-auto">
                    <button onClick={() => togglePublished(post)} title={post.published ? "Unpublish" : "Publish"}
                      className={`p-1.5 rounded-lg transition-colors ${post.published ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "text-luxury-charcoal-400 hover:text-emerald-500 hover:bg-emerald-50"}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${post.published ? "bg-emerald-500 border-emerald-500" : "border-luxury-charcoal-300"}`}>
                        {post.published && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </button>
                    <button onClick={() => openEdit(post)} className="p-1.5 rounded-lg hover:bg-luxury-charcoal-100 dark:hover:bg-luxury-charcoal-700 text-luxury-charcoal-400 hover:text-luxury-charcoal-700 transition-colors"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteConfirm(post.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-luxury-charcoal-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-2xl bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-luxury-charcoal-900 dark:text-white">New Blog Post</DialogTitle>
            <DialogDescription className="text-luxury-charcoal-500">Create a new blog post for your photography website.</DialogDescription>
          </DialogHeader>
          <BlogForm data={formData} onChange={setFormData} onSubmit={handleAdd} onCancel={() => setIsAddOpen(false)} loading={submitting} isEdit={false} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-luxury-charcoal-900 dark:text-white">Edit Post</DialogTitle>
          </DialogHeader>
          <BlogForm data={formData} onChange={setFormData} onSubmit={handleEdit} onCancel={() => setIsEditOpen(false)} loading={submitting} isEdit />
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm bg-white dark:bg-luxury-charcoal-800 border-luxury-charcoal-100 dark:border-luxury-charcoal-700 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-luxury-charcoal-900 dark:text-white">Delete Post?</DialogTitle>
            <DialogDescription className="text-luxury-charcoal-500">This blog post will be permanently deleted.</DialogDescription>
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
