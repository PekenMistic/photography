"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  DollarSign, 
  Camera, 
  Users, 
  Star,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award
} from 'lucide-react';
import { EnhancedCard, CardHeader, CardTitle, CardContent } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';

interface AnalyticsData {
  revenue: {
    current: number;
    previous: number;
    growth: number;
  };
  bookings: {
    current: number;
    previous: number;
    growth: number;
  };
  portfolio: {
    current: number;
    previous: number;
    growth: number;
  };
  satisfaction: {
    current: number;
    previous: number;
    growth: number;
  };
}

const LuxuryAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  // Mock analytics data - in real app, this would come from API
  const analyticsData: AnalyticsData = {
    revenue: { current: 15420, previous: 12350, growth: 24.8 },
    bookings: { current: 28, previous: 22, growth: 27.3 },
    portfolio: { current: 156, previous: 134, growth: 16.4 },
    satisfaction: { current: 4.8, previous: 4.6, growth: 4.3 }
  };

  const timeRanges = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600 dark:text-green-400';
    if (growth < 0) return 'text-red-600 dark:text-red-400';
    return 'text-luxury-charcoal-500 dark:text-luxury-charcoal-400';
  };

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? TrendingUp : TrendingDown;
  };

  const metrics = [
    {
      title: 'Revenue Growth',
      current: `$${analyticsData.revenue.current.toLocaleString()}`,
      previous: `$${analyticsData.revenue.previous.toLocaleString()}`,
      growth: analyticsData.revenue.growth,
      icon: DollarSign,
      color: 'from-luxury-gold-500 to-luxury-gold-600'
    },
    {
      title: 'Booking Increase',
      current: analyticsData.bookings.current.toString(),
      previous: analyticsData.bookings.previous.toString(),
      growth: analyticsData.bookings.growth,
      icon: Calendar,
      color: 'from-luxury-teal-500 to-luxury-teal-600'
    },
    {
      title: 'Portfolio Growth',
      current: analyticsData.portfolio.current.toString(),
      previous: analyticsData.portfolio.previous.toString(),
      growth: analyticsData.portfolio.growth,
      icon: Camera,
      color: 'from-luxury-charcoal-600 to-luxury-charcoal-700'
    },
    {
      title: 'Satisfaction Score',
      current: analyticsData.satisfaction.current.toFixed(1),
      previous: analyticsData.satisfaction.previous.toFixed(1),
      growth: analyticsData.satisfaction.growth,
      icon: Star,
      color: 'from-luxury-gold-400 to-luxury-gold-500'
    }
  ];

  const insights = [
    {
      title: 'Peak Booking Season',
      description: 'Wedding season (May-September) shows 40% higher booking rates',
      icon: Target,
      trend: 'positive'
    },
    {
      title: 'Top Service Category',
      description: 'Wedding photography accounts for 65% of total revenue',
      icon: Award,
      trend: 'positive'
    },
    {
      title: 'Client Retention',
      description: '78% of clients book additional sessions within 12 months',
      icon: Users,
      trend: 'positive'
    },
    {
      title: 'Portfolio Performance',
      description: 'Portrait sessions have the highest client satisfaction (4.9/5)',
      icon: Camera,
      trend: 'positive'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-luxury-charcoal-900 dark:text-white">
            Business Analytics
          </h2>
          <p className="text-luxury-charcoal-600 dark:text-luxury-charcoal-300">
            Track your photography business performance and growth
          </p>
        </div>
        
        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <EnhancedButton
              key={range.value}
              variant={timeRange === range.value ? 'luxury' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange(range.value as 'week' | 'month' | 'quarter' | 'year')}
              animate
            >
              {range.label}
            </EnhancedButton>
          ))}
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          const GrowthIcon = getGrowthIcon(metric.growth);
          
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <EnhancedCard variant="elevated" hover animate className="group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-luxury group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 ${getGrowthColor(metric.growth)}`}>
                      <GrowthIcon className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        {metric.growth > 0 ? '+' : ''}{metric.growth.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-luxury-charcoal-700 dark:text-luxury-charcoal-300 text-sm">
                      {metric.title}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-luxury-charcoal-900 dark:text-white">
                        {metric.current}
                      </span>
                      <span className="text-sm text-luxury-charcoal-500 dark:text-luxury-charcoal-400">
                        from {metric.previous}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </EnhancedCard>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <EnhancedCard variant="elevated" animate>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-luxury-gold-500" />
                  Revenue Trends
                </CardTitle>
                <EnhancedButton variant="ghost" size="sm">
                  View Details
                </EnhancedButton>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-luxury-gold-50 to-luxury-teal-50 dark:from-luxury-gold-900/10 dark:to-luxury-teal-900/10 rounded-2xl flex items-center justify-center border border-luxury-gold-200/30 dark:border-luxury-gold-800/30">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-luxury-gold-400 mx-auto mb-3" />
                  <p className="text-luxury-charcoal-600 dark:text-luxury-charcoal-300">
                    Revenue chart visualization
                  </p>
                  <p className="text-sm text-luxury-charcoal-500 dark:text-luxury-charcoal-400">
                    Integration with chart library needed
                  </p>
                </div>
              </div>
            </CardContent>
          </EnhancedCard>
        </motion.div>

        {/* Service Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <EnhancedCard variant="elevated" animate>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-luxury-teal-500" />
                  Service Distribution
                </CardTitle>
                <EnhancedButton variant="ghost" size="sm">
                  View Details
                </EnhancedButton>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-luxury-teal-50 to-luxury-charcoal-50 dark:from-luxury-teal-900/10 dark:to-luxury-charcoal-900/10 rounded-2xl flex items-center justify-center border border-luxury-teal-200/30 dark:border-luxury-teal-800/30">
                <div className="text-center">
                  <PieChart className="w-12 h-12 text-luxury-teal-400 mx-auto mb-3" />
                  <p className="text-luxury-charcoal-600 dark:text-luxury-charcoal-300">
                    Service distribution chart
                  </p>
                  <p className="text-sm text-luxury-charcoal-500 dark:text-luxury-charcoal-400">
                    Integration with chart library needed
                  </p>
                </div>
              </div>
            </CardContent>
          </EnhancedCard>
        </motion.div>
      </div>

      {/* Business Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <EnhancedCard variant="elevated" animate>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-luxury-charcoal-600" />
              Business Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {insights.map((insight, index) => {
                const IconComponent = insight.icon;
                
                return (
                  <motion.div
                    key={insight.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-luxury-charcoal-50 dark:bg-luxury-charcoal-800/50 rounded-2xl border border-luxury-charcoal-200/30 dark:border-luxury-charcoal-700/30"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-luxury-gold-100 to-luxury-teal-100 dark:from-luxury-gold-900/30 dark:to-luxury-teal-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-luxury-gold-600 dark:text-luxury-gold-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-luxury-charcoal-900 dark:text-white mb-1">
                        {insight.title}
                      </h4>
                      <p className="text-sm text-luxury-charcoal-600 dark:text-luxury-charcoal-300">
                        {insight.description}
                      </p>
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

export default LuxuryAnalytics;
