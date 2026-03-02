"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Camera, User, Heart, Star, Send } from 'lucide-react';
import { EnhancedCard, CardHeader, CardTitle, CardContent } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDatabase } from '@/lib/database-context';
import { usePhotographyToast } from '@/components/ui/luxury-toast';

const LuxuryBookingForm: React.FC = () => {
  const { addBooking, services, loading } = useDatabase();
  const toast = usePhotographyToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    location: '',
    guests: '',
    budget: '',
    message: '',
    package: ''
  });

  // Get active services from database
  const activeServices = services.filter(service => service.active);

  // Map service category to icon
  const getServiceIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'wedding':
        return Heart;
      case 'portrait':
        return User;
      case 'event':
        return Camera;
      case 'commercial':
        return Star;
      default:
        return Camera;
    }
  };

  const packages = [
    { value: 'basic', label: 'Basic Package', description: '4 hours coverage, 50 edited photos' },
    { value: 'standard', label: 'Standard Package', description: '6 hours coverage, 100 edited photos' },
    { value: 'premium', label: 'Premium Package', description: '8 hours coverage, 200 edited photos' },
    { value: 'luxury', label: 'Luxury Package', description: 'Full day coverage, unlimited photos' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addBooking({
        clientName: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventType: formData.service,
        eventDate: formData.date,
        eventTime: formData.time,
        location: formData.location,
        duration: formData.guests ? `${formData.guests} guests` : undefined,
        notes: formData.message,
        serviceId: formData.service,
        status: 'pending',
        // createdAt will be set by database
      });

      toast.bookingSuccess();

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        location: '',
        guests: '',
        budget: '',
        message: '',
        package: ''
      });
    } catch {
      toast.serverError();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-charcoal-50 to-luxury-gold-50 dark:from-luxury-charcoal-900 dark:to-luxury-charcoal-800 py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-luxury-gold-500/10 rounded-full blur-3xl animate-luxury-float"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-luxury-teal-500/10 rounded-full blur-3xl animate-luxury-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-luxury-gold-100 dark:bg-luxury-gold-900/20 text-luxury-gold-700 dark:text-luxury-gold-300 rounded-full text-sm font-medium border border-luxury-gold-200 dark:border-luxury-gold-800 mb-6">
            <Calendar className="w-4 h-4" />
            Book Your Session
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-luxury-charcoal-900 dark:text-white">Let&apos;s Create</span>
            <br />
            <span className="gradient-text-luxury">Something Beautiful</span>
          </h1>
          
          <p className="text-xl text-luxury-charcoal-600 dark:text-luxury-charcoal-300 max-w-2xl mx-auto">
            Ready to capture your special moments? Fill out the form below and we&apos;ll get back to you within 24 hours with a custom quote.
          </p>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <EnhancedCard variant="glass" className="backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-luxury-gold-500 to-luxury-teal-500 rounded-xl flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                Booking Information
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-luxury-charcoal-700 dark:text-luxury-charcoal-300">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="bg-white/50 dark:bg-luxury-charcoal-800/50 border-luxury-charcoal-300 dark:border-luxury-charcoal-600"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-luxury-charcoal-700 dark:text-luxury-charcoal-300">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="bg-white/50 dark:bg-luxury-charcoal-800/50 border-luxury-charcoal-300 dark:border-luxury-charcoal-600"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-luxury-charcoal-700 dark:text-luxury-charcoal-300">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      required
                      className="bg-white/50 dark:bg-luxury-charcoal-800/50 border-luxury-charcoal-300 dark:border-luxury-charcoal-600"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-luxury-charcoal-700 dark:text-luxury-charcoal-300">
                      Service Type *
                    </Label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                      <SelectTrigger className="bg-white/50 dark:bg-luxury-charcoal-800/50 border-luxury-charcoal-300 dark:border-luxury-charcoal-600">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {activeServices.map((service) => {
                          const IconComponent = getServiceIcon(service.category || 'general');
                          return (
                            <SelectItem key={service.id} value={service.id}>
                              <div className="flex items-center gap-2">
                                <IconComponent className="w-4 h-4" />
                                <span>{service.name}</span>
                                <span className="text-sm text-luxury-charcoal-500">
                                  ({service.priceFrom ? `From $${service.priceFrom}` : 'Contact for pricing'})
                                </span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-luxury-charcoal-700 dark:text-luxury-charcoal-300">
                      Event Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      required
                      className="bg-white/50 dark:bg-luxury-charcoal-800/50 border-luxury-charcoal-300 dark:border-luxury-charcoal-600"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-luxury-charcoal-700 dark:text-luxury-charcoal-300">
                      Preferred Time
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="bg-white/50 dark:bg-luxury-charcoal-800/50 border-luxury-charcoal-300 dark:border-luxury-charcoal-600"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="guests" className="text-luxury-charcoal-700 dark:text-luxury-charcoal-300">
                      Number of Guests
                    </Label>
                    <Input
                      id="guests"
                      type="number"
                      value={formData.guests}
                      onChange={(e) => handleInputChange('guests', e.target.value)}
                      placeholder="Estimated guests"
                      className="bg-white/50 dark:bg-luxury-charcoal-800/50 border-luxury-charcoal-300 dark:border-luxury-charcoal-600"
                    />
                  </div>
                </div>

                {/* Location and Package */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-luxury-charcoal-700 dark:text-luxury-charcoal-300">
                      Event Location *
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Enter event location"
                      required
                      className="bg-white/50 dark:bg-luxury-charcoal-800/50 border-luxury-charcoal-300 dark:border-luxury-charcoal-600"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="package" className="text-luxury-charcoal-700 dark:text-luxury-charcoal-300">
                      Package Preference
                    </Label>
                    <Select value={formData.package} onValueChange={(value) => handleInputChange('package', value)}>
                      <SelectTrigger className="bg-white/50 dark:bg-luxury-charcoal-800/50 border-luxury-charcoal-300 dark:border-luxury-charcoal-600">
                        <SelectValue placeholder="Select a package" />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((pkg) => (
                          <SelectItem key={pkg.value} value={pkg.value}>
                            <div>
                              <div className="font-medium">{pkg.label}</div>
                              <div className="text-sm text-luxury-charcoal-500">{pkg.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Budget and Message */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-luxury-charcoal-700 dark:text-luxury-charcoal-300">
                      Budget Range
                    </Label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger className="bg-white/50 dark:bg-luxury-charcoal-800/50 border-luxury-charcoal-300 dark:border-luxury-charcoal-600">
                        <SelectValue placeholder="Select your budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-500">Under $500</SelectItem>
                        <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                        <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                        <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                        <SelectItem value="over-5000">Over $5,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-luxury-charcoal-700 dark:text-luxury-charcoal-300">
                      Additional Details
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us more about your vision, special requirements, or any questions you have..."
                      rows={4}
                      className="bg-white/50 dark:bg-luxury-charcoal-800/50 border-luxury-charcoal-300 dark:border-luxury-charcoal-600"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <EnhancedButton
                    type="submit"
                    variant="gradient"
                    size="lg"
                    loading={loading}
                    icon={<Send className="w-5 h-5" />}
                    iconPosition="right"
                    glow
                    animate
                    className="px-12 py-4"
                  >
                    {loading ? 'Sending...' : 'Book Your Session'}
                  </EnhancedButton>
                </div>
              </form>
            </CardContent>
          </EnhancedCard>
        </motion.div>
      </div>
    </div>
  );
};

export default LuxuryBookingForm;

