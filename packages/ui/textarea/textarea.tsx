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

import React, { useId } from 'react';
import { cn } from '../util/cn';
import { textareaVariants } from './ts/variants';
import type { TextareaProps } from './ts/types';

/**
 * Accessible textarea component with label, error, and hint support.
 * Mirrors the Input component pattern with a native textarea element.
 *
 * @example
 * ```tsx
 * <Textarea label="Description" rows={4} />
 * <Textarea label="Notes" errorMessage="Required" />
 * ```
 *
 * @param props - Component props
 * @returns Rendered textarea element with optional label and messages
 */
const Textarea: React.FC<TextareaProps> = ({
  className,
  variant,
  label,
  errorMessage,
  hint,
  rows = 4,
  value,
  onChange,
  placeholder,
  isDisabled,
}: TextareaProps) => {
  const id = useId();

  const textareaClasses = cn(
    textareaVariants({ variant: errorMessage ? 'error' : variant }),
    className,
  );

  return (
    <div className='flex flex-col gap-1.5'>
      {label && (
        <label htmlFor={id} className='text-sm font-medium text-slate-700'>
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={textareaClasses}
        rows={rows}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={isDisabled}
        aria-describedby={hint ? `${id}-hint` : undefined}
        aria-errormessage={errorMessage ? `${id}-error` : undefined}
        aria-invalid={!!errorMessage || undefined}
      />
      {hint && !errorMessage && (
        <p id={`${id}-hint`} className='text-sm text-slate-500'>
          {hint}
        </p>
      )}
      {errorMessage && (
        <p id={`${id}-error`} className='text-sm text-red-500'>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export { Textarea };
