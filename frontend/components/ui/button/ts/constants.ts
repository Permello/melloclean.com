export const baseClasses = [
  'inline-flex',
  'items-center',
  'justify-center',
  'relative',
  'cursor-pointer',
  'disabled:cursor-not-allowed',
  'tracking-wide',
  'transition-[background-color,box-shadow,text-color,transform]',
  'duration-200',
  'rounded-full',
  'outline-none',
];
export const primaryClasses = [
  'font-semibold',
  'bg-emerald-600',
  'text-white',
  'shadow',
  'data-[hovered=true]:bg-emerald-700',
  'data-[hovered=true]:shadow-md',
  'disabled:bg-emerald-500/50',
  'disabled:shadow',
  'data-[pressed=true]:scale-[0.98]',
  'data-[focus-visible=true]:ring-emerald-500/70',
  'data-[focus-visible=true]:ring-2',
  'data-[focus-visible=true]:ring-offset-2',
];
export const secondaryClasses = [
  'font-medium',
  'bg-gray-50',
  'data-[hovered=true]:bg-gray-100',
  'disabled:bg-gray-50',
  'text-gray-950',
  'shadow',
  'border',
  'border-neutral-200/50',
  'data-[focus-visible=true]:ring-gray-200',
  'data-[pressed=true]:scale-[0.98]',
  'data-[focus-visible=true]:ring-2',
  'data-[focus-visible=true]:ring-offset-2',
];
export const destructiveClasses = [
  'font-semibold',
  'bg-red-500',
  'data-[hovered=true]:bg-red-600',
  'text-white',
  'rounded-full',
  'shadow',
  'hover:shadow-md',
  'disabled:bg-red-500/50',
  'disabled:shadow',
  'data-[pressed=true]:scale-[0.98]',
  'data-[focus-visible=true]:ring-red-500',
  'data-[focus-visible=true]:ring-2',
  'data-[focus-visible=true]:ring-offset-2',
];
export const ghostClasses = [
  'font-light',
  'text-gray-950',
  'data-[hovered=true]:text-gray-600',
  'disabled:text-gray-950',
  'data-[focus-visible=true]:ring-gray-500/30',
  'data-[focus-visible=true]:ring-1',
];
export const linkClasses = [
  'font-light',
  'text-emerald-500',
  'data-[hovered=true]:text-emerald-600',
  'data-[hovered=true]:underline',
  'disabled:text-emerald-500/50',
  'disabled:no-underline',
  'data-[focus-visible=true]:ring-emerald-500/30',
  'data-[focus-visible=true]:ring-1',
];
export const smallClasses = ['text-sm', 'py-2', 'px-6'];
export const defualtClasses = ['text-lg', 'py-3', 'px-8'];
export const largeClasses = ['text-lg', 'py-4', 'px-12'];
