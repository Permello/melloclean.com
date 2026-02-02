import React, { createContext, useContext, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useToastState } from '@react-stately/toast';
import { ToastRegion } from './toast-region';
import type { ToastContent, ToastVariant, ToastActions } from './ts/types';

const ToastContext = createContext<ToastActions | null>(null);

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = useToastState<ToastContent>({ maxVisibleToasts: 5 });

  const addToast = useCallback(
    (message: string, variant: ToastVariant = 'info', duration: number = 5000) => {
      state.add({ message, variant }, { timeout: duration > 0 ? duration : undefined });
    },
    [state],
  );

  const removeToast = useCallback(
    (key: string) => {
      state.close(key);
    },
    [state],
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {typeof document !== 'undefined' &&
        state.visibleToasts.length > 0 &&
        createPortal(<ToastRegion state={state} />, document.body)}
    </ToastContext.Provider>
  );
};

const useToast = (): ToastActions => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export { ToastProvider, useToast };
