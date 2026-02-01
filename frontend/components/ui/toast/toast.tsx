import React from 'react';
import { cn } from '~/core/util/cn';
import { toastVariants } from './ts/variants';
import type { ToastProps } from './ts/types';
import { motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const Toast: React.FC<ToastProps> = ({ message, variant = 'info', onClose }) => {
  const Icon = icons[variant || 'info'];
  const toastClasses = cn(toastVariants({ variant }));

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={toastClasses}
    >
      <Icon className='h-5 w-5 flex-shrink-0' />
      <p className='flex-1 text-sm font-medium'>{message}</p>
      <button
        onClick={onClose}
        className='flex-shrink-0 rounded-full p-1 transition-colors hover:bg-black/10'
        aria-label='Close notification'
      >
        <X className='h-4 w-4' />
      </button>
    </motion.div>
  );
};

export { Toast };
