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

/**
 * Base Tailwind classes for individual toggle buttons.
 */
export const toggleBaseClasses = [
  'rounded-full',
  'px-4',
  'py-2',
  'text-sm',
  'font-medium',
  'border',
  'transition-all',
  'duration-200',
  'cursor-pointer',
  'outline-none',
  'inline-flex',
  'items-center',
  'gap-1.5',
];

/**
 * Tailwind classes for unselected toggle buttons.
 */
export const toggleUnselectedClasses = [
  'bg-slate-100',
  'text-slate-600',
  'border-slate-200',
  'hover:bg-slate-200',
  'focus:ring-2',
  'focus:ring-emerald-500/20',
];

/**
 * Tailwind classes for selected toggle buttons.
 */
export const toggleSelectedClasses = [
  'bg-emerald-100',
  'text-emerald-700',
  'border-emerald-300',
  'hover:bg-emerald-200',
  'focus:ring-2',
  'focus:ring-emerald-500/20',
];
