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
 * Tailwind classes for the slider track background.
 */
export const trackClasses = ['relative', 'h-2', 'w-full', 'rounded-full', 'bg-slate-200'];

/**
 * Tailwind classes for the filled portion of the slider track.
 */
export const fillClasses = ['absolute', 'h-full', 'rounded-full', 'bg-emerald-500'];

/**
 * Base Tailwind classes for the slider thumb.
 */
export const thumbBaseClasses = [
  'w-5',
  'h-5',
  'rounded-full',
  'bg-emerald-600',
  'top-1/2',
  'shadow-md',
  'cursor-pointer',
  'outline-none',
  'transition-shadow',
  'duration-200',
];

/**
 * Tailwind classes for the default slider thumb variant.
 */
export const thumbDefaultClasses = ['hover:shadow-lg'];

/**
 * Tailwind classes for the error slider thumb variant.
 */
export const thumbErrorClasses = ['bg-red-500'];
