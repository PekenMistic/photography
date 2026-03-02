"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit, Trash2, Plus, Eye, Calendar, User, Tag, BookOpen, TrendingUp } from "lucide-react"
import Image from "next/image"
import { useDatabase } from "@/lib/database-context"

export default function BlogManager() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, loading, error } = useDatabase()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<{id: string; title: string; content: string; author: string; category: string; tags: string; image: string; featured: boolean; published: boolean; readTime: string} | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    tags: "",
    image: "",
    featured: false,
    published: true,
    readTime: ""
  })

  const categories = ["General", "Wedding", "Portrait", "Tips", "Behind the Scenes", "Equipment"]

  const handleAddPost = async () => {
    if (newPost.title && newPost.content && newPost.author) {
      try {
        await addBlogPost({
          ...newPost,
          tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          views: 0,
          likes: 0,
          date: new Date().toISOString().split('T')[0]
        })
        setNewPost({
          title: "",
          excerpt: "",
          content: "",
          author: "",
          category: "",
          tags: "",
          image: "",
          featured: false,
          published: true,
          readTime: ""
        })
        setIsAddDialogOpen(false)
      } catch (error) {
        console.error('Failed to add blog post:', error)
      }
    }
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setNewPost({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content,
      author: post.author,
      category: post.category,
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
      image: post.image,
      featured: post.featured,
      published: post.published,
      readTime: post.readTime
    })
  }

  const handleUpdatePost = async () => {
    if (!editingPost) return
    try {
      await updateBlogPost(editingPost.id, {
        ...newPost,
        tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      })
      setEditingPost(null)
      setNewPost({
        title: "",
        excerpt: "",
        content: "",
        author: "",
        category: "",
        tags: "",
        image: "",
        featured: false,
        published: true,
        readTime: ""
      })
    } catch (error) {
      console.error('Failed to update blog post:', error)
    }
  }

  const handleDeletePost = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlogPost(id)
      } catch (error) {
        console.error('Failed to delete blog post:', error)
      }
    }
  }

  const filteredPosts = filterCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === filterCategory)

  const stats = {
    total: blogPosts.length,
    published: blogPosts.filter(p => p.published).length,
    draft: blogPosts.filter(p => !p.published).length,
    featured: blogPosts.filter(p => p.featured).length,
    totalViews: blogPosts.reduce((sum, p) => sum + (p.views || 0), 0)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blog Management</h2>
          <p className="text-muted-foreground">Manage your blog posts and content</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}</DialogTitle>
              <DialogDescription>
                {editingPost ? 'Update the blog post details below.' : 'Create a new blog post for your website.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    placeholder="Blog post title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    value={newPost.author}
                    onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                    placeholder="Author name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newPost.category} onValueChange={(value) => setNewPost({...newPost, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                    placeholder="photography, wedding, tips"
                  />
                </div>
                
                <div>
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    value={newPost.readTime}
                    onChange={(e) => setNewPost({...newPost, readTime: e.target.value})}
                    placeholder="5 min read"
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">Featured Image URL</Label>
                  <Input
                    id="image"
                    value={newPost.image}
                    onChange={(e) => setNewPost({...newPost, image: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={newPost.featured}
                      onCheckedChange={(checked) => setNewPost({...newPost, featured: checked})}
                    />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={newPost.published}
                      onCheckedChange={(checked) => setNewPost({...newPost, published: checked})}
                    />
                    <Label htmlFor="published">Published</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                    placeholder="Brief description of the blog post"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    placeholder="Blog post content (supports markdown)"
                    rows={12}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => {
                setIsAddDialogOpen(false)
                setEditingPost(null)
                setNewPost({
                  title: "",
                  excerpt: "",
                  content: "",
                  author: "",
                  category: "",
                  tags: "",
                  image: "",
                  featured: false,
                  published: true,
                  readTime: ""
                })
              }}>
                Cancel
              </Button>
              <Button onClick={editingPost ? handleUpdatePost : handleAddPost}>
                {editingPost ? 'Update Post' : 'Create Post'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Posts</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
                <p className="text-2xl font-bold">{stats.published}</p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Drafts</p>
                <p className="text-2xl font-bold">{stats.draft}</p>
              </div>
              <Edit className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Featured</p>
                <p className="text-2xl font-bold">{stats.featured}</p>
              </div>
              <Tag className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
                <p className="text-2xl font-bold">{stats.totalViews}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Blog Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Blog Posts Found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {filterCategory === "all"
                  ? "No blog posts have been created yet. Start by adding your first post."
                  : `No posts found in the ${filterCategory} category. Try changing the filter or add new posts.`
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Featured Image */}
                  <div className="flex-shrink-0">
                    <Image
                      src={post.image || "/placeholder.svg?height=100&width=150"}
                      alt={post.title}
                      width={150}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {post.excerpt}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPost(post)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date || post.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views || 0} views
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {post.likes || 0} likes
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      {post.featured && <Badge variant="default">Featured</Badge>}
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                      {Array.isArray(post.tags) && post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
