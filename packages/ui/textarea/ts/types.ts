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

import type { VariantProps } from 'class-variance-authority';
import type { textareaVariants } from './variants';

/**
 * Props for the Textarea component combining CVA variants and behavioral props.
 */
export interface TextareaProps extends VariantProps<typeof textareaVariants> {
  /** Label text displayed above the textarea */
  label?: string;
  /** Error message displayed below the textarea */
  errorMessage?: string;
  /** Hint text displayed below the textarea when no error */
  hint?: string;
  /** Number of visible text rows */
  rows?: number;
  /** Current textarea value */
  value?: string;
  /** Callback fired when the value changes */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the textarea is disabled */
  isDisabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}
