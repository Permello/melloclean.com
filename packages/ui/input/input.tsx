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

import { Eye, EyeOff } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useTextField } from 'react-aria';
import { cn } from '../util/cn';
import { mergeRefs } from '../util/mergeRef';
import type { InputProps } from './ts/types';
import { inputVariants } from './ts/variants';

/**
 * Accessible input component with label, error, and hint support.
 * Built with React Aria for accessibility. Includes password visibility toggle.
 *
 * @example
 * ```tsx
 * <Input label="Email" type="email" />
 * <Input label="Password" type="password" error="Required" />
 * ```
 *
 * @param props - Component props
 * @returns Rendered input element with optional label and messages
 */
const Input: React.FC<InputProps> = (props: InputProps) => {
  const {
    className,
    variant,
    label,
    errorMessage,
    hint,
    type,
    ref,
    id,
    validate,
    validationBehavior,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
  } = useTextField(
    {
      ...rest,
      description: hint,
    },
    inputRef,
  );

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const inputClasses = cn(
    inputVariants({ variant: errorMessage ? 'error' : variant }),
    isPassword && 'pr-12 ',
    className,
  );
  const mRef = mergeRefs([ref, inputRef]);
  return (
    <div className='flex flex-col gap-1.5'>
      {label && (
        <label {...labelProps} className='text-sm font-medium text-slate-700'>
          {label}
        </label>
      )}
      <div className='relative'>
        <input ref={mRef} className={inputClasses} {...inputProps} type={inputType} />
        {isPassword && (
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600'
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
          </button>
        )}
      </div>
      {hint && !isInvalid && (
        <p {...descriptionProps} className='text-sm text-slate-500 select-none'>
          {hint}
        </p>
      )}
      {isInvalid && (
        <p {...errorMessageProps} className='text-sm text-red-500 select-none'>
          {errorMessage as string}
        </p>
      )}
    </div>
  );
};

export { Input };
