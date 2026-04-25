/**
 * MIT License
 *
 * Copyright (c) 2025-present Eduardo Turcios.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { createContext, useContext, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useToastState } from 'react-stately';
import { ToastRegion } from './toast-region';
import type { ToastContent, ToastVariant, ToastActions } from './ts/types';

/**
 * React context for toast actions.
 */
const ToastContext = createContext<ToastActions | null>(null);

/**
 * Provider component that manages toast state and renders the toast region.
 * Wraps the application to enable toast notifications throughout.
 *
 * @param props - Component props
 * @param props.children - Child components
 * @returns Provider with toast region portal
 */
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

/**
 * Hook to access toast actions from any component.
 *
 * @throws Error if used outside of ToastProvider
 * @returns Toast actions (addToast, removeToast)
 */
const useToast = (): ToastActions => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export { ToastProvider, useToast };
