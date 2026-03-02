// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User, ArrowLeft, Eye, Heart, Tag } from "lucide-react"
import { EnhancedButton } from "@/components/ui/enhanced-button"

async function getBlogPost(id: string) {
  try {
    // Fetch from database via API
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                    "http://localhost:3000")
    
    const res = await fetch(`${baseUrl}/api/blog/${id}`, {
      cache: "no-store",
    })
    
    if (!res.ok) return null
    const data = await res.json()
    return data.success ? data.data : null
  } catch {
    return null
  }
}

async function getRelatedPosts(currentId: string, category: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                    "http://localhost:3000")
    const res = await fetch(`${baseUrl}/api/blog?published=true`, { cache: "no-store" })
    if (!res.ok) return []
    const data = await res.json()
    if (!data.success) return []
    return data.data
      .filter((p: { id: string; category: string }) => p.id !== currentId && p.category === category)
      .slice(0, 3)
  } catch {
    return []
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.id, post.category)

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-"

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-charcoal-50 to-white dark:from-luxury-charcoal-900 dark:to-luxury-charcoal-850">
      {/* Hero Image */}
      {post.image && !post.image.includes("placeholder") && (
        <div className="relative h-64 sm:h-80 lg:h-[420px] w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal-900/70 via-luxury-charcoal-900/20 to-transparent" />
          <div className="absolute bottom-6 left-0 right-0 max-w-4xl mx-auto px-4 lg:px-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-luxury-gold-500 text-white rounded-full text-xs font-bold mb-3">
              <Tag className="w-3 h-3" />
              {post.category}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
        {/* Back button */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-luxury-charcoal-500 dark:text-luxury-charcoal-400 hover:text-luxury-gold-600 dark:hover:text-luxury-gold-400 transition-colors mb-8 text-sm font-medium group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Blog
        </Link>

        {/* Title (if no hero image) */}
        {(!post.image || post.image.includes("placeholder")) && (
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-luxury-gold-100 dark:bg-luxury-gold-900/20 text-luxury-gold-700 dark:text-luxury-gold-300 rounded-full text-xs font-bold mb-4">
              <Tag className="w-3 h-3" />
              {post.category}
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-luxury-charcoal-900 dark:text-white leading-tight">
              {post.title}
            </h1>
          </div>
        )}

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-luxury-charcoal-500 dark:text-luxury-charcoal-400 mb-8 pb-8 border-b border-luxury-charcoal-200 dark:border-luxury-charcoal-700">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </span>
          {post.readTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            {post.views || 0} views
          </span>
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-luxury-charcoal-600 dark:text-luxury-charcoal-300 leading-relaxed mb-8 font-medium italic border-l-4 border-luxury-gold-400 pl-4">
            {post.excerpt}
          </p>
        )}

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12
          prose-headings:font-display prose-headings:text-luxury-charcoal-900 dark:prose-headings:text-white
          prose-p:text-luxury-charcoal-700 dark:prose-p:text-luxury-charcoal-300 prose-p:leading-relaxed
          prose-a:text-luxury-gold-600 dark:prose-a:text-luxury-gold-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-luxury-charcoal-900 dark:prose-strong:text-white
          prose-ul:text-luxury-charcoal-700 dark:prose-ul:text-luxury-charcoal-300
          prose-li:marker:text-luxury-gold-500">
          {post.content.split('\n').map((paragraph: string, idx: number) => (
            paragraph.trim() ? (
              <p key={idx}>{paragraph}</p>
            ) : (
              <br key={idx} />
            )
          ))}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-luxury-charcoal-200 dark:border-luxury-charcoal-700">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-luxury-gold-100 dark:bg-luxury-gold-900/20 text-luxury-gold-700 dark:text-luxury-gold-300 rounded-full text-xs font-semibold border border-luxury-gold-200 dark:border-luxury-gold-800/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-xl font-display font-bold text-luxury-charcoal-900 dark:text-white mb-5">
              Artikel Terkait
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPosts.map((related: { id: string; title: string; excerpt: string; image: string; date: string; readTime: string }) => (
                <Link key={related.id} href={`/blog/${related.id}`} className="group block">
                  <div className="bg-white dark:bg-luxury-charcoal-800 rounded-xl overflow-hidden border border-luxury-charcoal-100 dark:border-luxury-charcoal-700 hover:shadow-luxury transition-all duration-300 hover:-translate-y-0.5">
                    {related.image && !related.image.includes("placeholder") && (
                      <div className="relative h-36 overflow-hidden">
                        <Image src={related.image} alt={related.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-luxury-charcoal-900 dark:text-white group-hover:text-luxury-gold-600 dark:group-hover:text-luxury-gold-400 transition-colors line-clamp-2 mb-1">
                        {related.title}
                      </h3>
                      <p className="text-xs text-luxury-charcoal-500 dark:text-luxury-charcoal-400">
                        {related.readTime}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back button bottom */}
        <div className="mt-10 pt-6 border-t border-luxury-charcoal-200 dark:border-luxury-charcoal-700">
          <Link href="/blog">
            <EnhancedButton variant="outline" icon={<ArrowLeft className="w-4 h-4" />} animate>
              Lihat Semua Artikel
            </EnhancedButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
