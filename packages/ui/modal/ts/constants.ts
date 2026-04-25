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
 * Base Tailwind classes for the modal backdrop overlay.
 */
export const backdropBaseClasses = [
  'fixed',
  'inset-0',
  'z-50',
  'flex',
  'items-center',
  'justify-center',
  'bg-black/50',
  'backdrop-blur-sm',
  'p-4',
];

/**
 * Base Tailwind classes for the modal panel container.
 */
export const panelBaseClasses = [
  'relative',
  'bg-white',
  'rounded-2xl',
  'shadow-2xl',
  'w-full',
  'max-h-[90vh]',
  'overflow-y-auto',
  'outline-none',
  'px-6 py-4',
];

/**
 * Tailwind classes for the default-size modal panel.
 */
export const panelDefaultClasses = ['max-w-lg'];

/**
 * Tailwind classes for the large-size modal panel.
 */
export const panelLargeClasses = ['max-w-2xl'];
