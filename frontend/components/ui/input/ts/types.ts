import type { VariantProps } from 'class-variance-authority';
import type { inputVariants } from './variants';
import type { AriaTextFieldProps } from 'react-aria';
import type { RefObject } from 'react';

interface InputBehaviorProps {
  label?: string;
  error?: string;
  hint?: string;
  ref?: RefObject<HTMLInputElement | null>;
  className?: string;
}

type InputProps = VariantProps<typeof inputVariants> &
  InputBehaviorProps &
  AriaTextFieldProps;

export type { InputProps };
