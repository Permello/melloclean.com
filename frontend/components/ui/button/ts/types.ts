import type { VariantProps } from 'class-variance-authority';
import type { buttonVariants, loadingVariants } from './variants';
import type { AriaButtonProps } from 'react-aria';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { isLoading?: boolean } & AriaButtonProps<'button'>;

type LoadingProps = VariantProps<typeof loadingVariants>;
export type { ButtonProps, LoadingProps };
