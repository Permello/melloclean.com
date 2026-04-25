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

import { AnimatePresence } from 'motion/react';
import React, { useRef } from 'react';
import { useToastRegion } from 'react-aria';
import { Toast } from './toast';
import type { ToastRegionProps } from './ts/types';

/**
 * Container region for displaying toast notifications.
 * Positioned in the top-right corner with animated transitions.
 *
 * @param props - Component props
 * @param props.state - Toast state containing visible toasts
 * @returns Rendered toast region with all visible toasts
 */
const ToastRegion: React.FC<ToastRegionProps> = ({ state }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { regionProps } = useToastRegion({}, state, ref);

  return (
    <div {...regionProps} ref={ref} className='fixed top-4 right-4 z-50 flex flex-col gap-2'>
      <AnimatePresence mode='popLayout'>
        {state.visibleToasts.map((toast) => (
          <Toast key={toast.key} toast={toast} state={state} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export { ToastRegion };
