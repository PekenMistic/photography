// components/ui/luxury-error.tsx
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, ArrowLeft, Camera, Wifi, Server } from 'lucide-react';
import { EnhancedButton } from './enhanced-button';
import Link from 'next/link';

interface LuxuryErrorProps {
  variant?: '404' | '500' | 'network' | 'generic';
  title?: string;
  message?: string;
  showRetry?: boolean;
  showHome?: boolean;
  showBack?: boolean;
  onRetry?: () => void;
  className?: string;
}

const LuxuryError: React.FC<LuxuryErrorProps> = ({
  variant = 'generic',
  title,
  message,
  showRetry = true,
  showHome = true,
  showBack = false,
  onRetry,
  className = ''
}) => {
  const getErrorConfig = () => {
    switch (variant) {
      case '404':
        return {
          icon: Camera,
          title: title || 'Page Not Found',
          message: message || 'The page you\'re looking for seems to have been moved or doesn\'t exist.',
          code: '404'
        };
      case '500':
        return {
          icon: Server,
          title: title || 'Server Error',
          message: message || 'Something went wrong on our end. Please try again later.',
          code: '500'
        };
      case 'network':
        return {
          icon: Wifi,
          title: title || 'Connection Error',
          message: message || 'Please check your internet connection and try again.',
          code: 'NET'
        };
      default:
        return {
          icon: AlertTriangle,
          title: title || 'Something went wrong',
          message: message || 'An unexpected error occurred. Please try again.',
          code: 'ERR'
        };
    }
  };

  const config = getErrorConfig();
  const IconComponent = config.icon;

  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-luxury-charcoal-50 via-white to-luxury-teal-50 dark:from-luxury-charcoal-950 dark:via-luxury-charcoal-900 dark:to-luxury-charcoal-800 ${className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold-500/10 rounded-full blur-3xl animate-luxury-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-teal-500/5 rounded-full blur-3xl animate-luxury-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-luxury-gold-400/5 rounded-full blur-2xl animate-luxury-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-luxury-gold-500/20 to-luxury-teal-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-luxury-gold-200/30 dark:border-luxury-gold-700/30">
                <IconComponent className="w-16 h-16 text-luxury-gold-600 dark:text-luxury-gold-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-luxury-charcoal-800 dark:bg-luxury-charcoal-200 text-luxury-charcoal-100 dark:text-luxury-charcoal-800 rounded-full flex items-center justify-center text-sm font-bold">
                {config.code}
              </div>
            </div>
          </motion.div>

          {/* Error Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-luxury-charcoal-900 via-luxury-gold-600 to-luxury-teal-600 dark:from-luxury-charcoal-100 dark:via-luxury-gold-400 dark:to-luxury-teal-400 bg-clip-text text-transparent">
              {config.title}
            </h1>
            <p className="text-lg text-luxury-charcoal-600 dark:text-luxury-charcoal-300 max-w-md mx-auto leading-relaxed">
              {config.message}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {showRetry && onRetry && (
              <EnhancedButton
                variant="luxury"
                size="lg"
                icon={<RefreshCw className="w-5 h-5" />}
                onClick={onRetry}
                className="min-w-[160px]"
              >
                Try Again
              </EnhancedButton>
            )}
            
            {showHome && (
              <Link href="/">
                <EnhancedButton
                  variant="glass"
                  size="lg"
                  icon={<Home className="w-5 h-5" />}
                  className="min-w-[160px]"
                >
                  Go Home
                </EnhancedButton>
              </Link>
            )}
            
            {showBack && (
              <EnhancedButton
                variant="outline"
                size="lg"
                icon={<ArrowLeft className="w-5 h-5" />}
                onClick={() => window.history.back()}
                className="min-w-[160px]"
              >
                Go Back
              </EnhancedButton>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Quick Error Component for simple use cases
export const QuickError: React.FC<{
  message?: string;
  onRetry?: () => void;
  className?: string;
}> = ({ message = 'Something went wrong', onRetry, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center space-y-4 ${className}`}>
      <AlertTriangle className="w-12 h-12 text-luxury-gold-500" />
      <p className="text-luxury-charcoal-600 dark:text-luxury-charcoal-300">{message}</p>
      {onRetry && (
        <EnhancedButton
          variant="luxury"
          size="sm"
          icon={<RefreshCw className="w-4 h-4" />}
          onClick={onRetry}
        >
          Retry
        </EnhancedButton>
      )}
    </div>
  );
};

export default LuxuryError;
