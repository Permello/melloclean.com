import { cva } from 'class-variance-authority';

export const TextVariants = cva('', {
  variants: {
    as: {
      p: 'text-slate-600',
      span: 'bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent',
      em: 'font-semibold tracking-wider text-emerald-600 uppercase not-italic',
      strong: 'font-bold text-slate-900',
    },
  },
  defaultVariants: {
    as: 'p',
  },
});
