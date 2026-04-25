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
 * Base Tailwind classes for step indicator circles.
 */
export const circleBaseClasses = [
  'flex',
  'items-center',
  'justify-center',
  'w-8',
  'h-8',
  'rounded-full',
  'text-sm',
  'font-semibold',
  'transition-all',
  'duration-300',
  'select-none',
];

/** Tailwind classes for active step circle. */
export const circleActiveClasses = ['bg-emerald-600', 'text-white', 'cursor-default'];

/** Tailwind classes for completed step circle. */
export const circleCompletedClasses = ['bg-emerald-600', 'text-white', 'cursor-pointer'];

/** Tailwind classes for pending step circle. */
export const circlePendingClasses = ['bg-slate-200', 'text-slate-500', 'cursor-not-allowed'];

/**
 * Base Tailwind classes for step indicator labels.
 */
export const labelBaseClasses = [
  'text-sm',
  'mt-2',
  'transition-colors',
  'duration-300',
  'max-w-20',
  'text-center',
  'line-clamp-2',
  'select-none',
];

/** Tailwind classes for active step label. */
export const labelActiveClasses = ['text-emerald-600', 'font-semibold', 'cursor-default'];

/** Tailwind classes for completed step label. */
export const labelCompletedClasses = ['text-emerald-600', 'cursor-pointer'];

/** Tailwind classes for pending step label. */
export const labelPendingClasses = ['text-slate-400', 'cursor-not-allowed'];

/**
 * Base Tailwind classes for connector lines between steps.
 */
export const connectorBaseClasses = [
  'flex-1',
  'h-0.5',
  'mx-3',
  'transition-colors',
  'duration-300',
];

/** Tailwind classes for completed connector line. */
export const connectorCompletedClasses = ['bg-emerald-600'];

/** Tailwind classes for pending connector line. */
export const connectorPendingClasses = ['bg-slate-200'];
