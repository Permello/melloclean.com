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

import { cva } from 'class-variance-authority';
import {
  baseClasses,
  primaryClasses,
  secondaryClasses,
  destructiveClasses,
  ghostClasses,
  linkClasses,
  smallClasses,
  defualtClasses,
  largeClasses,
} from './constants';

/**
 * CVA variant configuration for the Button component.
 * Defines variant and size options with their corresponding styles.
 */
const buttonVariants = cva(baseClasses, {
  variants: {
    variant: {
      primary: primaryClasses,
      secondary: secondaryClasses,
      destructive: destructiveClasses,
      ghost: ghostClasses,
      link: linkClasses,
    },
    size: {
      small: smallClasses,
      default: defualtClasses,
      large: largeClasses,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
});

/**
 * CVA variant configuration for the loading spinner.
 * Defines border colors that match each button variant.
 */
const loadingVariants = cva(['absolute', 'inline-flex', 'items-center'], {
  variants: {
    variant: {
      primary: ['border-white'],
      secondary: ['border-gray-950'],
      destructive: ['border-white'],
      ghost: ['border-gray-950'],
      link: ['border-indigo-500'],
    },
  },
});

export { buttonVariants, loadingVariants };
