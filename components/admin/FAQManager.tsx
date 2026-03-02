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
import { Edit, Trash2, Plus, HelpCircle, ArrowUp, ArrowDown } from "lucide-react"
import { useDatabase } from "@/lib/database-context"

export default function FAQManager() {
  const { faqs, addFAQ, updateFAQ, deleteFAQ, loading, error } = useDatabase()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState<{id: string; question: string; answer: string; category: string; order: number; active: boolean} | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: "",
    category: "",
    order: 0,
    active: true
  })

  const categories = ["General", "Pricing", "Services", "Booking", "Photography", "Technical"]

  const handleAddFaq = async () => {
    if (newFaq.question && newFaq.answer) {
      try {
        await addFAQ(newFaq)
        setNewFaq({
          question: "",
          answer: "",
          category: "",
          order: 0,
          active: true
        })
        setIsAddDialogOpen(false)
      } catch (error) {
        console.error('Failed to add FAQ:', error)
      }
    }
  }

  const handleEditFaq = (faq: {id: string; question: string; answer: string; category: string; order: number; active: boolean}) => {
    setEditingFaq(faq)
    setNewFaq({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order,
      active: faq.active
    })
  }

  const handleUpdateFaq = async () => {
    if (!editingFaq) return
    try {
      await updateFAQ(editingFaq.id, newFaq)
      setEditingFaq(null)
      setNewFaq({
        question: "",
        answer: "",
        category: "",
        order: 0,
        active: true
      })
    } catch (error) {
      console.error('Failed to update FAQ:', error)
    }
  }

  const handleDeleteFaq = async (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      try {
        await deleteFAQ(id)
      } catch (error) {
        console.error('Failed to delete FAQ:', error)
      }
    }
  }

  const handleMoveUp = async (faq: {id: string; question: string; answer: string; category: string; order: number; active: boolean}) => {
    if (faq.order > 0) {
      try {
        await updateFAQ(faq.id, { ...faq, order: faq.order - 1 })
      } catch (error) {
        console.error('Failed to move FAQ up:', error)
      }
    }
  }

  const handleMoveDown = async (faq: {id: string; question: string; answer: string; category: string; order: number; active: boolean}) => {
    try {
      await updateFAQ(faq.id, { ...faq, order: faq.order + 1 })
    } catch (error) {
      console.error('Failed to move FAQ down:', error)
    }
  }

  const filteredFaqs = filterCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === filterCategory)

  const sortedFaqs = [...filteredFaqs].sort((a, b) => a.order - b.order)

  const stats = {
    total: faqs.length,
    active: faqs.filter(f => f.active).length,
    inactive: faqs.filter(f => !f.active).length,
    categories: Array.from(new Set(faqs.map(f => f.category))).length
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
          <h2 className="text-3xl font-bold tracking-tight">FAQ Management</h2>
          <p className="text-muted-foreground">Manage frequently asked questions</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
              <DialogDescription>
                {editingFaq ? 'Update the FAQ details below.' : 'Create a new frequently asked question.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="question">Question *</Label>
                <Input
                  id="question"
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                  placeholder="What is your question?"
                />
              </div>
              
              <div>
                <Label htmlFor="answer">Answer *</Label>
                <Textarea
                  id="answer"
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                  placeholder="Provide a detailed answer"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newFaq.category} onValueChange={(value) => setNewFaq({...newFaq, category: value})}>
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
                  <Label htmlFor="order">Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={newFaq.order}
                    onChange={(e) => setNewFaq({...newFaq, order: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={newFaq.active}
                  onCheckedChange={(checked) => setNewFaq({...newFaq, active: checked})}
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => {
                setIsAddDialogOpen(false)
                setEditingFaq(null)
                setNewFaq({
                  question: "",
                  answer: "",
                  category: "",
                  order: 0,
                  active: true
                })
              }}>
                Cancel
              </Button>
              <Button onClick={editingFaq ? handleUpdateFaq : handleAddFaq}>
                {editingFaq ? 'Update FAQ' : 'Create FAQ'}
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Total FAQs</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <HelpCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Inactive</p>
                <p className="text-2xl font-bold">{stats.inactive}</p>
              </div>
              <div className="h-8 w-8 bg-gray-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">×</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
                <p className="text-2xl font-bold">{stats.categories}</p>
              </div>
              <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">#</span>
              </div>
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

      {/* FAQs List */}
      <div className="space-y-4">
        {sortedFaqs.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <HelpCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No FAQs Found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {filterCategory === "all"
                  ? "No FAQs have been created yet. Start by adding your first FAQ."
                  : `No FAQs found in the ${filterCategory} category. Try changing the filter or add new FAQs.`
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          sortedFaqs.map((faq) => (
            <Card key={faq.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                      <Badge variant="secondary">{faq.category}</Badge>
                      <Badge variant={faq.active ? "default" : "secondary"}>
                        {faq.active ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline">Order: {faq.order}</Badge>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMoveUp(faq)}
                      disabled={faq.order === 0}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMoveDown(faq)}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditFaq(faq)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteFaq(faq.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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

