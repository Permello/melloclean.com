import { cva } from 'class-variance-authority';
import {
  baseClasses,
  successClasses,
  errorClasses,
  warningClasses,
  infoClasses,
} from './constants';

const toastVariants = cva(baseClasses, {
  variants: {
    variant: {
      success: successClasses,
      error: errorClasses,
      warning: warningClasses,
      info: infoClasses,
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

export { toastVariants };
