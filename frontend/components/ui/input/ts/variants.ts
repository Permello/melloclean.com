import { cva } from 'class-variance-authority';
import { baseClasses, defaultClasses, errorClasses } from './constants';

const inputVariants = cva(baseClasses, {
  variants: {
    variant: {
      default: defaultClasses,
      error: errorClasses,
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export { inputVariants };
