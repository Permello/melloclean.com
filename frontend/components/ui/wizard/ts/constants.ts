// Step indicator circle classes
export const circleBaseClasses = [
  'flex',
  'items-center',
  'justify-center',
  'w-8',
  'h-8',
  'rounded-full',
  'text-sm',
  'font-semibold',
  'transition-all',
  'duration-300',
];

export const circleActiveClasses = ['bg-emerald-600', 'text-white'];

export const circleCompletedClasses = ['bg-emerald-600', 'text-white'];

export const circlePendingClasses = ['bg-slate-200', 'text-slate-500'];

// Step indicator label classes
export const labelBaseClasses = [
  'text-sm',
  'mt-2',
  'transition-colors',
  'duration-300',
  'max-w-20',
  'text-center',
  'line-clamp-2',
];

export const labelActiveClasses = ['text-emerald-600', 'font-semibold'];

export const labelCompletedClasses = ['text-emerald-600'];

export const labelPendingClasses = ['text-slate-400'];

// Connector line classes
export const connectorBaseClasses = [
  'flex-1',
  'h-0.5',
  'mx-3',
  'transition-colors',
  'duration-300',
];

export const connectorCompletedClasses = ['bg-emerald-600'];

export const connectorPendingClasses = ['bg-slate-200'];
