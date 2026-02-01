import React, { useRef, useState } from 'react';
import { cn } from '~/core/util/cn';
import { inputVariants } from './ts/variants';
import type { InputProps } from './ts/types';
import { useTextField } from 'react-aria';
import { mergeRefs } from '~/core/util/mergeRef';
import { Eye, EyeOff } from 'lucide-react';

const Input: React.FC<InputProps> = (props: InputProps) => {
  const {
    className,
    variant,
    label,
    error,
    hint,
    type,
    ref,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const { labelProps, inputProps, errorMessageProps, descriptionProps } = useTextField(
    {
      ...rest,
      type,
      label,
      errorMessage: error,
      description: hint,
      isInvalid: !!error,
    },
    inputRef
  );

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const inputClasses = cn(
    inputVariants({ variant: error ? 'error' : variant }),
    isPassword && 'pr-12',
    className
  );
  const mRef = mergeRefs([ref, inputRef]);

  return (
    <div className='flex flex-col gap-1.5'>
      {label && (
        <label
          {...labelProps}
          className='text-sm font-medium text-slate-700'
        >
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          ref={mRef}
          className={inputClasses}
          {...inputProps}
          type={inputType}
        />
        {isPassword && (
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors'
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className='h-5 w-5' />
            ) : (
              <Eye className='h-5 w-5' />
            )}
          </button>
        )}
      </div>
      {hint && !error && (
        <p {...descriptionProps} className='text-sm text-slate-500'>
          {hint}
        </p>
      )}
      {error && (
        <p {...errorMessageProps} className='text-sm text-red-500'>
          {error}
        </p>
      )}
    </div>
  );
};

export { Input };
