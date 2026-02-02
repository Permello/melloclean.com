import React, { useRef } from 'react';
import { useToastRegion } from '@react-aria/toast';
import { AnimatePresence } from 'framer-motion';
import { Toast } from './toast';
import type { ToastRegionProps } from './ts/types';

const ToastRegion: React.FC<ToastRegionProps> = ({ state }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { regionProps } = useToastRegion({}, state, ref);

  return (
    <div {...regionProps} ref={ref} className='fixed top-4 right-4 z-50 flex flex-col gap-2'>
      <AnimatePresence mode='popLayout'>
        {state.visibleToasts.map((toast) => (
          <Toast key={toast.key} toast={toast} state={state} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export { ToastRegion };
