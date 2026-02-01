import type { VariantProps } from 'class-variance-authority';
import type { toastVariants } from './variants';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (message: string, variant?: ToastVariant, duration?: number) => void;
  removeToast: (id: string) => void;
}

type ToastProps = VariantProps<typeof toastVariants> & {
  message: string;
  onClose: () => void;
};

export type { Toast, ToastVariant, ToastContextValue, ToastProps };
