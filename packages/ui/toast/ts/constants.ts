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
 * Base Tailwind classes applied to all toast variants.
 */
export const baseClasses = [
  'flex',
  'items-center',
  'gap-3',
  'rounded-lg',
  'px-4',
  'py-3',
  'shadow-lg',
  'min-w-[300px]',
  'max-w-[400px]',
];

/** Tailwind classes for the success toast variant. */
export const successClasses = ['bg-emerald-50', 'text-emerald-800', 'border', 'border-emerald-200'];

/** Tailwind classes for the error toast variant. */
export const errorClasses = ['bg-red-50', 'text-red-800', 'border', 'border-red-200'];

/** Tailwind classes for the warning toast variant. */
export const warningClasses = ['bg-amber-50', 'text-amber-800', 'border', 'border-amber-200'];

/** Tailwind classes for the info toast variant. */
export const infoClasses = ['bg-blue-50', 'text-blue-800', 'border', 'border-blue-200'];
