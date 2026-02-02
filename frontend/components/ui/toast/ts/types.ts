import type { QueuedToast, ToastState } from '@react-stately/toast';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastContent {
  message: string;
  variant: ToastVariant;
}

interface ToastActions {
  addToast: (message: string, variant?: ToastVariant, duration?: number) => void;
  removeToast: (key: string) => void;
}

type ToastProps = {
  toast: QueuedToast<ToastContent>;
  state: ToastState<ToastContent>;
};

interface ToastRegionProps {
  state: ToastState<ToastContent>;
}

export type { ToastVariant, ToastContent, ToastActions, ToastProps, ToastRegionProps };
