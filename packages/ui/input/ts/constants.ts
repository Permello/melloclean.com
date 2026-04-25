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
 * Base Tailwind classes applied to all input variants.
 */
export const baseClasses = [
  'w-full',
  'rounded-lg',
  'border',
  'px-4',
  'py-3',
  'text-base',
  'text-slate-900',
  'placeholder:text-slate-400',
  'outline-none',
  'transition-[border-color,box-shadow]',
  'duration-200',
  'disabled:cursor-not-allowed',
  'disabled:bg-slate-50',
  'disabled:text-slate-500',
  'select-none',
];

/**
 * Tailwind classes for the default input variant.
 */
export const defaultClasses = [
  'border-slate-300',
  'bg-white',
  'focus:border-emerald-500',
  'focus:ring-2',
  'focus:ring-emerald-500/20',
];

/**
 * Tailwind classes for the error input variant.
 */
export const errorClasses = [
  'border-red-500',
  'bg-white',
  'focus:border-red-500',
  'focus:ring-2',
  'focus:ring-red-500/20',
];
