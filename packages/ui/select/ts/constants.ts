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
 * Base Tailwind classes applied to the select trigger button.
 */
export const triggerBaseClasses = [
  'w-full',
  'rounded-lg',
  'border',
  'px-4',
  'py-3',
  'text-base',
  'text-left',
  'outline-none',
  'transition-[border-color,box-shadow]',
  'duration-200',
  'disabled:cursor-not-allowed',
  'disabled:bg-slate-50',
  'disabled:text-slate-500',
  'flex',
  'items-center',
  'justify-between',
  'cursor-pointer',
];

/**
 * Tailwind classes for the default select trigger variant.
 */
export const defaultClasses = [
  'border-slate-300',
  'bg-white',
  'focus:border-emerald-500',
  'focus:ring-2',
  'focus:ring-emerald-500/20',
];

/**
 * Tailwind classes for the error select trigger variant.
 */
export const errorClasses = [
  'border-red-500',
  'bg-white',
  'focus:border-red-500',
  'focus:ring-2',
  'focus:ring-red-500/20',
];

/**
 * Tailwind classes for the select dropdown listbox.
 */
export const listboxClasses = [
  'mt-1',
  'w-full',
  'rounded-lg',
  'border',
  'border-slate-200',
  'bg-white',
  'py-1',
  'shadow-lg',
  'outline-none',
  'max-h-60',
  'overflow-y-auto',
  'z-50',
];

/**
 * Tailwind classes for individual select option items.
 */
export const optionBaseClasses = [
  'px-4',
  'py-2.5',
  'text-base',
  'cursor-pointer',
  'outline-none',
  'transition-colors',
  'duration-100',
];
