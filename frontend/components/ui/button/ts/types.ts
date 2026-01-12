import type { VariantProps } from 'class-variance-authority';
import type { buttonVariants } from './variants';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export type { ButtonProps };
