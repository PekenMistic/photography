"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { EnhancedButton } from "@/components/ui/enhanced-button"
// import { EnhancedCard } from "@/components/ui/enhanced-card"
import { Upload, Trash2, Plus, Image as ImageIcon, Eye, Edit } from "lucide-react"
import Image from "next/image"
import { useDatabase } from "@/lib/database-context"

interface PortfolioItem {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string
  featured: boolean
  createdAt: string
}

export default function PortfolioManager() {
  const { portfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useDatabase()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    featured: false
  })

  const categories = ["Wedding", "Portrait", "Family", "Event", "Corporate", "Fashion"]

  const handleAddItem = async () => {
    if (newItem.title && newItem.description && newItem.category) {
      try {
        await addPortfolioItem({
          title: newItem.title,
          description: newItem.description,
          category: newItem.category,
          imageUrl: newItem.imageUrl || "/placeholder.svg?height=300&width=400",
          featured: newItem.featured
        })
        setNewItem({ title: "", description: "", category: "", imageUrl: "", featured: false })
        setIsAddDialogOpen(false)
      } catch (error) {
        console.error('Failed to add portfolio item:', error)
      }
    }
  }

  const handleEditItem = (item: PortfolioItem) => {
    setEditingItem(item)
    setNewItem({
      title: item.title,
      description: item.description,
      category: item.category,
      imageUrl: item.imageUrl,
      featured: item.featured
    })
  }

  const handleUpdateItem = async () => {
    if (!editingItem) return
    try {
      await updatePortfolioItem(editingItem.id, {
        title: newItem.title,
        description: newItem.description,
        category: newItem.category,
        imageUrl: newItem.imageUrl,
        featured: newItem.featured
      })
      setEditingItem(null)
      setNewItem({ title: "", description: "", category: "", imageUrl: "", featured: false })
    } catch (error) {
      console.error('Failed to update portfolio item:', error)
    }
  }

  const handleDeleteItem = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await deletePortfolioItem(id)
      } catch (error) {
        console.error('Failed to delete portfolio item:', error)
      }
    }
  }

  const toggleFeatured = async (id: string) => {
    const item = portfolioItems.find(item => item.id === id)
    if (item) {
      try {
        await updatePortfolioItem(id, { featured: !item.featured })
      } catch (error) {
        console.error('Failed to update portfolio item:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your photography portfolio</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Portfolio Item</DialogTitle>
              <DialogDescription>Add a new item to your portfolio</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  placeholder="Enter title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  placeholder="Enter description"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={newItem.imageUrl}
                  onChange={(e) => setNewItem({...newItem, imageUrl: e.target.value})}
                  placeholder="Enter image URL"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newItem.featured}
                  onChange={(e) => setNewItem({...newItem, featured: e.target.checked})}
                />
                <Label htmlFor="featured">Featured item</Label>
              </div>
              <Button onClick={handleAddItem} className="w-full">
                Add Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Items</p>
                <p className="text-2xl font-bold">{portfolioItems.length}</p>
              </div>
              <ImageIcon className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Featured</p>
                <p className="text-2xl font-bold">{portfolioItems.filter(item => item.featured).length}</p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
                <p className="text-2xl font-bold">{new Set(portfolioItems.map(item => item.category)).size}</p>
              </div>
              <Upload className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                <p className="text-2xl font-bold">
                  {portfolioItems.filter(item => 
                    new Date(item.createdAt).getMonth() === new Date().getMonth()
                  ).length}
                </p>
              </div>
              <Plus className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
              />
              {item.featured && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Featured
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-500">{item.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditItem(item)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleFeatured(item.id)}
                  className={item.featured ? "bg-yellow-100 dark:bg-yellow-900" : ""}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Portfolio Item</DialogTitle>
            <DialogDescription>Update the portfolio item details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={newItem.title}
                onChange={(e) => setNewItem({...newItem, title: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-category">Category</Label>
              <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-imageUrl">Image URL</Label>
              <Input
                id="edit-imageUrl"
                value={newItem.imageUrl}
                onChange={(e) => setNewItem({...newItem, imageUrl: e.target.value})}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-featured"
                checked={newItem.featured}
                onChange={(e) => setNewItem({...newItem, featured: e.target.checked})}
              />
              <Label htmlFor="edit-featured">Featured item</Label>
            </div>
            <Button onClick={handleUpdateItem} className="w-full">
              Update Item
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

