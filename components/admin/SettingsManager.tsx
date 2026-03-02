"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Settings, Globe, Phone, Palette, Camera } from "lucide-react"
import { useDatabase } from "@/lib/database-context"
import { toast } from "sonner"

export default function SettingsManager() {
  const { settings, updateSetting, loading, error } = useDatabase()

  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [saving, setSaving] = useState(false)

  // Initialize form data from settings
  useEffect(() => {
    if (settings.length > 0) {
      const data: Record<string, unknown> = {}
      settings.forEach(setting => {
        try {
          data[setting.key] = typeof setting.value === 'string' 
            ? JSON.parse(setting.value) 
            : setting.value
        } catch {
          data[setting.key] = setting.value
        }
      })
      setFormData(data)
    }
  }, [settings])

  const handleSave = async (key: string, value: unknown) => {
    setSaving(true)
    try {
      await updateSetting(key, JSON.stringify(value))
      toast.success("Setting updated successfully")
    } catch (error) {
      toast.error("Failed to update setting")
      console.error('Failed to update setting:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (key: string, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const defaultSettings = {
    // Site Settings
    site_title: "Luxury Photography Studio",
    site_description: "Professional photography services for weddings, portraits, and events",
    site_keywords: "photography, wedding, portrait, professional, luxury",
    
    // Contact Information
    contact_email: "info@luxuryphoto.com",
    contact_phone: "+1 (555) 123-4567",
    contact_address: "123 Photography Street, Studio City, CA 90210",
    contact_hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
    
    // Social Media
    social_instagram: "https://instagram.com/luxuryphoto",
    social_facebook: "https://facebook.com/luxuryphoto",
    social_twitter: "https://twitter.com/luxuryphoto",
    social_youtube: "https://youtube.com/luxuryphoto",
    social_pinterest: "https://pinterest.com/luxuryphoto",
    
    // Business Settings
    business_name: "Luxury Photography Studio",
    business_tagline: "Capturing Life's Most Precious Moments",
    business_about: "We are a team of passionate photographers dedicated to capturing your most precious moments with artistic excellence and professional service.",
    
    // Booking Settings
    booking_enabled: true,
    booking_advance_days: 30,
    booking_deposit_percentage: 25,
    
    // Theme Settings
    theme_primary_color: "#8B5CF6",
    theme_secondary_color: "#F59E0B",
    theme_accent_color: "#EF4444",
    theme_dark_mode: false,
    
    // SEO Settings
    seo_meta_title: "Luxury Photography Studio - Professional Photography Services",
    seo_meta_description: "Professional photography services for weddings, portraits, and events. Capturing life's most precious moments with artistic excellence.",
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
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your website settings and configuration</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Social
          </TabsTrigger>
          <TabsTrigger value="booking" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Booking
          </TabsTrigger>
          <TabsTrigger value="theme" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Theme
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic website information and configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="site_title">Site Title</Label>
                  <Input
                    id="site_title"
                    value={String(formData.site_title || defaultSettings.site_title)}
                    onChange={(e) => handleInputChange('site_title', e.target.value)}
                    placeholder="Your site title"
                  />
                </div>
                <div>
                  <Label htmlFor="business_name">Business Name</Label>
                  <Input
                    id="business_name"
                    value={String(formData.business_name || defaultSettings.business_name)}
                    onChange={(e) => handleInputChange('business_name', e.target.value)}
                    placeholder="Your business name"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="site_description">Site Description</Label>
                <Textarea
                  id="site_description"
                  value={String(formData.site_description || defaultSettings.site_description)}
                  onChange={(e) => handleInputChange('site_description', e.target.value)}
                  placeholder="Brief description of your website"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="business_tagline">Business Tagline</Label>
                <Input
                  id="business_tagline"
                  value={String(formData.business_tagline || defaultSettings.business_tagline)}
                  onChange={(e) => handleInputChange('business_tagline', e.target.value)}
                  placeholder="Your business tagline"
                />
              </div>
              
              <div>
                <Label htmlFor="business_about">About Business</Label>
                <Textarea
                  id="business_about"
                  value={String(formData.business_about || defaultSettings.business_about)}
                  onChange={(e) => handleInputChange('business_about', e.target.value)}
                  placeholder="Tell visitors about your business"
                  rows={4}
                />
              </div>
              
              <Button 
                onClick={() => {
                  handleSave('site_title', formData.site_title || defaultSettings.site_title)
                  handleSave('business_name', formData.business_name || defaultSettings.business_name)
                  handleSave('site_description', formData.site_description || defaultSettings.site_description)
                  handleSave('business_tagline', formData.business_tagline || defaultSettings.business_tagline)
                  handleSave('business_about', formData.business_about || defaultSettings.business_about)
                }}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save General Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Your business contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_email">Email Address</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={String(formData.contact_email || defaultSettings.contact_email)}
                    onChange={(e) => handleInputChange('contact_email', e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_phone">Phone Number</Label>
                  <Input
                    id="contact_phone"
                    value={String(formData.contact_phone || defaultSettings.contact_phone)}
                    onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="contact_address">Business Address</Label>
                <Textarea
                  id="contact_address"
                  value={String(formData.contact_address || defaultSettings.contact_address)}
                  onChange={(e) => handleInputChange('contact_address', e.target.value)}
                  placeholder="Your business address"
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="contact_hours">Business Hours</Label>
                <Input
                  id="contact_hours"
                  value={String(formData.contact_hours || defaultSettings.contact_hours)}
                  onChange={(e) => handleInputChange('contact_hours', e.target.value)}
                  placeholder="Mon-Fri: 9AM-6PM"
                />
              </div>
              
              <Button 
                onClick={() => {
                  handleSave('contact_email', formData.contact_email || defaultSettings.contact_email)
                  handleSave('contact_phone', formData.contact_phone || defaultSettings.contact_phone)
                  handleSave('contact_address', formData.contact_address || defaultSettings.contact_address)
                  handleSave('contact_hours', formData.contact_hours || defaultSettings.contact_hours)
                }}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Contact Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Settings */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Your social media profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="social_instagram">Instagram</Label>
                  <Input
                    id="social_instagram"
                    value={String(formData.social_instagram || defaultSettings.social_instagram)}
                    onChange={(e) => handleInputChange('social_instagram', e.target.value)}
                    placeholder="https://instagram.com/yourhandle"
                  />
                </div>
                <div>
                  <Label htmlFor="social_facebook">Facebook</Label>
                  <Input
                    id="social_facebook"
                    value={String(formData.social_facebook || defaultSettings.social_facebook)}
                    onChange={(e) => handleInputChange('social_facebook', e.target.value)}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div>
                  <Label htmlFor="social_twitter">Twitter</Label>
                  <Input
                    id="social_twitter"
                    value={String(formData.social_twitter || defaultSettings.social_twitter)}
                    onChange={(e) => handleInputChange('social_twitter', e.target.value)}
                    placeholder="https://twitter.com/yourhandle"
                  />
                </div>
                <div>
                  <Label htmlFor="social_youtube">YouTube</Label>
                  <Input
                    id="social_youtube"
                    value={String(formData.social_youtube || defaultSettings.social_youtube)}
                    onChange={(e) => handleInputChange('social_youtube', e.target.value)}
                    placeholder="https://youtube.com/yourchannel"
                  />
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  handleSave('social_instagram', formData.social_instagram || defaultSettings.social_instagram)
                  handleSave('social_facebook', formData.social_facebook || defaultSettings.social_facebook)
                  handleSave('social_twitter', formData.social_twitter || defaultSettings.social_twitter)
                  handleSave('social_youtube', formData.social_youtube || defaultSettings.social_youtube)
                }}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Social Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Booking Settings */}
        <TabsContent value="booking">
          <Card>
            <CardHeader>
              <CardTitle>Booking Configuration</CardTitle>
              <CardDescription>Configure booking system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="booking_enabled"
                  checked={Boolean(formData.booking_enabled ?? defaultSettings.booking_enabled)}
                  onCheckedChange={(checked) => handleInputChange('booking_enabled', checked)}
                />
                <Label htmlFor="booking_enabled">Enable Online Booking</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="booking_advance_days">Advance Booking Days</Label>
                  <Input
                    id="booking_advance_days"
                    type="number"
                    value={String(formData.booking_advance_days || defaultSettings.booking_advance_days)}
                    onChange={(e) => handleInputChange('booking_advance_days', parseInt(e.target.value))}
                    placeholder="30"
                  />
                </div>
                <div>
                  <Label htmlFor="booking_deposit_percentage">Deposit Percentage</Label>
                  <Input
                    id="booking_deposit_percentage"
                    type="number"
                    value={String(formData.booking_deposit_percentage || defaultSettings.booking_deposit_percentage)}
                    onChange={(e) => handleInputChange('booking_deposit_percentage', parseInt(e.target.value))}
                    placeholder="25"
                  />
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  handleSave('booking_enabled', formData.booking_enabled ?? defaultSettings.booking_enabled)
                  handleSave('booking_advance_days', formData.booking_advance_days || defaultSettings.booking_advance_days)
                  handleSave('booking_deposit_percentage', formData.booking_deposit_percentage || defaultSettings.booking_deposit_percentage)
                }}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Booking Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Theme Settings */}
        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle>Theme Configuration</CardTitle>
              <CardDescription>Customize your website appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="theme_primary_color">Primary Color</Label>
                  <Input
                    id="theme_primary_color"
                    type="color"
                    value={String(formData.theme_primary_color || defaultSettings.theme_primary_color)}
                    onChange={(e) => handleInputChange('theme_primary_color', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="theme_secondary_color">Secondary Color</Label>
                  <Input
                    id="theme_secondary_color"
                    type="color"
                    value={String(formData.theme_secondary_color || defaultSettings.theme_secondary_color)}
                    onChange={(e) => handleInputChange('theme_secondary_color', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="theme_accent_color">Accent Color</Label>
                  <Input
                    id="theme_accent_color"
                    type="color"
                    value={String(formData.theme_accent_color || defaultSettings.theme_accent_color)}
                    onChange={(e) => handleInputChange('theme_accent_color', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="theme_dark_mode"
                  checked={Boolean(formData.theme_dark_mode ?? defaultSettings.theme_dark_mode)}
                  onCheckedChange={(checked) => handleInputChange('theme_dark_mode', checked)}
                />
                <Label htmlFor="theme_dark_mode">Enable Dark Mode by Default</Label>
              </div>
              
              <Button 
                onClick={() => {
                  handleSave('theme_primary_color', formData.theme_primary_color || defaultSettings.theme_primary_color)
                  handleSave('theme_secondary_color', formData.theme_secondary_color || defaultSettings.theme_secondary_color)
                  handleSave('theme_accent_color', formData.theme_accent_color || defaultSettings.theme_accent_color)
                  handleSave('theme_dark_mode', formData.theme_dark_mode ?? defaultSettings.theme_dark_mode)
                }}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Theme Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


