import React from 'react';
import type { ButtonProps } from './ts/types';
import { Btn } from './components/btn';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(Btn());

Button.displayName = 'Button';
export { Button };

// 'bg-emerald-500 text-white',
//         'px-8 py-2 leading-6',
//         'rounded-full',
//         'font-semibold tracking-wide',
//         'cursor-pointer',
//         'inline-flex items-center justify-center',
//         'relative shadow-lg shadow-emerald-200',
//         'gap-2',
//         //hover
//         'transition-colors',
//         'hover:text-accent-foreground hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-300',
//         //focus
//         'ring-emerald-400 outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
//         'focus:scale-[0.98]',
//         //disabled
//         'disabled:cursor-not-allowed disabled:bg-emerald-300 disabled:shadow-none',
