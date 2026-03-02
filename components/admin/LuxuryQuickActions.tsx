"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Plus,
  MessageSquare,
  Eye,
  Calendar,
  Camera,
  Users,
  Settings,
  Star
} from 'lucide-react';
import { EnhancedCard, CardHeader, CardTitle, CardContent } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { usePhotographyToast } from '@/components/ui/luxury-toast';

const LuxuryQuickActions: React.FC = () => {
  // const [isUploading, setIsUploading] = useState(false);
  const toast = usePhotographyToast();

  const quickActions = [
    {
      title: 'Upload Images',
      description: 'Add new photos to portfolio',
      icon: Upload,
      color: 'from-luxury-teal-500 to-luxury-teal-600',
      bgColor: 'bg-luxury-teal-50 dark:bg-luxury-teal-900/20',
      action: () => handleUpload()
    },
    {
      title: 'New Booking',
      description: 'Create a new client booking',
      icon: Plus,
      color: 'from-luxury-gold-500 to-luxury-gold-600',
      bgColor: 'bg-luxury-gold-50 dark:bg-luxury-gold-900/20',
      action: () => handleNewBooking()
    },
    {
      title: 'View Messages',
      description: 'Check client inquiries',
      icon: MessageSquare,
      color: 'from-luxury-charcoal-600 to-luxury-charcoal-700',
      bgColor: 'bg-luxury-charcoal-50 dark:bg-luxury-charcoal-900/20',
      action: () => handleViewMessages()
    },
    {
      title: 'Preview Site',
      description: 'View live website',
      icon: Eye,
      color: 'from-luxury-gold-400 to-luxury-gold-500',
      bgColor: 'bg-luxury-gold-50 dark:bg-luxury-gold-900/20',
      action: () => handlePreviewSite()
    }
  ];

  const recentActivities = [
    {
      type: 'upload',
      title: 'New portfolio images uploaded',
      description: '12 wedding photos added to gallery',
      time: '2 hours ago',
      icon: Camera,
      color: 'text-luxury-teal-600'
    },
    {
      type: 'booking',
      title: 'New booking received',
      description: 'Sarah & John - Wedding Photography',
      time: '4 hours ago',
      icon: Calendar,
      color: 'text-luxury-gold-600'
    },
    {
      type: 'message',
      title: 'Client message received',
      description: 'Question about portrait session pricing',
      time: '6 hours ago',
      icon: MessageSquare,
      color: 'text-luxury-charcoal-600'
    },
    {
      type: 'review',
      title: 'New 5-star review',
      description: 'Amazing work on our engagement photos!',
      time: '1 day ago',
      icon: Star,
      color: 'text-luxury-gold-500'
    }
  ];

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast.uploadSuccess();
    }, 2000);
  };

  const handleNewBooking = () => {
    toast.bookingSuccess();
    // Navigate to booking form
  };

  const handleViewMessages = () => {
    toast.messageSuccess();
    // Navigate to messages
  };

  const handlePreviewSite = () => {
    window.open('/', '_blank');
    toast.shareSuccess();
  };

  return (
    <div className="space-y-8">
      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-lg font-display font-semibold text-luxury-charcoal-900 dark:text-white mb-6">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <EnhancedCard 
                  variant="elevated" 
                  hover 
                  animate 
                  className="group cursor-pointer h-full"
                  onClick={action.action}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-luxury group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h4 className="font-semibold text-luxury-charcoal-900 dark:text-white mb-2">
                      {action.title}
                    </h4>
                    
                    <p className="text-sm text-luxury-charcoal-600 dark:text-luxury-charcoal-300">
                      {action.description}
                    </p>
                  </CardContent>
                </EnhancedCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <EnhancedCard variant="elevated" animate>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-luxury-charcoal-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const IconComponent = activity.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-luxury-charcoal-50 dark:bg-luxury-charcoal-800/50 rounded-2xl border border-luxury-charcoal-200/30 dark:border-luxury-charcoal-700/30 hover:shadow-luxury transition-shadow duration-300"
                  >
                    <div className="w-10 h-10 bg-white dark:bg-luxury-charcoal-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <IconComponent className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-luxury-charcoal-900 dark:text-white text-sm">
                        {activity.title}
                      </h5>
                      <p className="text-sm text-luxury-charcoal-600 dark:text-luxury-charcoal-300 mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-luxury-charcoal-500 dark:text-luxury-charcoal-400 mt-2">
                        {activity.time}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <EnhancedButton
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Eye className="w-4 h-4" />
                      </EnhancedButton>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="mt-6 text-center">
              <EnhancedButton variant="outline" size="sm">
                View All Activity
              </EnhancedButton>
            </div>
          </CardContent>
        </EnhancedCard>
      </motion.div>

      {/* Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <EnhancedCard variant="elevated" animate>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-luxury-gold-600" />
              Today&apos;s Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'New Messages', value: '3', icon: MessageSquare, color: 'text-luxury-teal-600' },
                { label: 'Pending Bookings', value: '2', icon: Calendar, color: 'text-luxury-gold-600' },
                { label: 'Photos Uploaded', value: '12', icon: Camera, color: 'text-luxury-charcoal-600' },
                { label: 'Reviews Received', value: '1', icon: Star, color: 'text-luxury-gold-500' }
              ].map((item, index) => {
                const IconComponent = item.icon;
                
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 bg-luxury-charcoal-50 dark:bg-luxury-charcoal-800 rounded-2xl flex items-center justify-center">
                      <IconComponent className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-luxury-charcoal-900 dark:text-white">
                      {item.value}
                    </div>
                    <div className="text-sm text-luxury-charcoal-600 dark:text-luxury-charcoal-300">
                      {item.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </EnhancedCard>
      </motion.div>
    </div>
  );
};

export default LuxuryQuickActions;
