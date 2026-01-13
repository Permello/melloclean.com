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
