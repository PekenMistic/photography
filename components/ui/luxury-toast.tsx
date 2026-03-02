"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);

    if (toast.duration !== 0) {
      setTimeout(() => removeToast(id), toast.duration || 5000);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer: React.FC<{
  toasts: Toast[];
  removeToast: (id: string) => void;
}> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem: React.FC<{
  toast: Toast;
  onRemove: (id: string) => void;
}> = ({ toast, onRemove }) => {
  const getToastConfig = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          iconColor: 'text-green-600 dark:text-green-400',
          titleColor: 'text-green-900 dark:text-green-100',
          messageColor: 'text-green-700 dark:text-green-300'
        };
      case 'error':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          iconColor: 'text-red-600 dark:text-red-400',
          titleColor: 'text-red-900 dark:text-red-100',
          messageColor: 'text-red-700 dark:text-red-300'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          iconColor: 'text-yellow-600 dark:text-yellow-400',
          titleColor: 'text-yellow-900 dark:text-yellow-100',
          messageColor: 'text-yellow-700 dark:text-yellow-300'
        };
      case 'info':
        return {
          icon: Info,
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          iconColor: 'text-blue-600 dark:text-blue-400',
          titleColor: 'text-blue-900 dark:text-blue-100',
          messageColor: 'text-blue-700 dark:text-blue-300'
        };
    }
  };

  const config = getToastConfig(toast.type);
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${config.bgColor} ${config.borderColor} border rounded-2xl shadow-luxury backdrop-blur-sm p-4 relative overflow-hidden`}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-gold-500/5 to-luxury-teal-500/5"></div>
      
      <div className="relative z-10">
        <div className="flex items-start space-x-3">
          <div className={`flex-shrink-0 w-6 h-6 ${config.iconColor}`}>
            <IconComponent className="w-full h-full" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className={`font-semibold ${config.titleColor} text-sm`}>
              {toast.title}
            </h4>
            {toast.message && (
              <p className={`${config.messageColor} text-sm mt-1 leading-relaxed`}>
                {toast.message}
              </p>
            )}
            
            {toast.action && (
              <button
                onClick={toast.action.onClick}
                className={`${config.iconColor} hover:underline text-sm font-medium mt-2 block`}
              >
                {toast.action.label}
              </button>
            )}
          </div>
          
          <button
            onClick={() => onRemove(toast.id)}
            className={`flex-shrink-0 ${config.iconColor} hover:opacity-70 transition-opacity`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Luxury Toast Hook with predefined methods
export const useLuxuryToast = () => {
  const { addToast } = useToast();

  return {
    success: (title: string, message?: string, action?: Toast['action']) => {
      addToast({ type: 'success', title, message, action });
    },
    error: (title: string, message?: string, action?: Toast['action']) => {
      addToast({ type: 'error', title, message, action });
    },
    warning: (title: string, message?: string, action?: Toast['action']) => {
      addToast({ type: 'warning', title, message, action });
    },
    info: (title: string, message?: string, action?: Toast['action']) => {
      addToast({ type: 'info', title, message, action });
    },
    photography: (title: string, message?: string) => {
      addToast({
        type: 'success',
        title,
        message,
        duration: 4000
      });
    }
  };
};

// Photography-specific toast messages
export const usePhotographyToast = () => {
  const toast = useLuxuryToast();

  return {
    bookingSuccess: () => toast.success(
      'Booking Confirmed!',
      'Your photography session has been successfully booked. We&apos;ll contact you soon with details.'
    ),
    messageSuccess: () => toast.success(
      'Message Sent!',
      'Thank you for reaching out. We&apos;ll get back to you within 24 hours.'
    ),
    portfolioLiked: () => toast.photography(
      'Added to Favorites',
      'This photo has been added to your favorites.'
    ),
    downloadStarted: () => toast.info(
      'Download Started',
      'Your high-resolution image is being prepared for download.'
    ),
    shareSuccess: () => toast.success(
      'Shared Successfully',
      'The portfolio link has been copied to your clipboard.'
    ),
    loginSuccess: () => toast.success(
      'Welcome Back!',
      'You have successfully logged into your account.'
    ),
    uploadSuccess: () => toast.success(
      'Upload Complete',
      'Your images have been successfully uploaded to the portfolio.'
    ),
    networkError: () => toast.error(
      'Connection Error',
      'Please check your internet connection and try again.'
    ),
    serverError: () => toast.error(
      'Server Error',
      'Something went wrong on our end. Please try again later.'
    )
  };
};

export default ToastProvider;

