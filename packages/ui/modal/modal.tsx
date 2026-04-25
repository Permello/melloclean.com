/**
 * MIT License
 *
 * Copyright (c) 2025-present Eduardo Turcios.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { useRef } from 'react';
import type { ModalProps } from './ts/types';

import { Overlay, useModalOverlay } from 'react-aria';
import { cn } from '../util/cn';
import { backdropBaseClasses } from './ts/constants';
import { modalPanelVariants } from './ts/variants';
/**
 * Accessible modal dialog component with animated transitions.
 * Supports backdrop click and Escape key dismissal, scroll lock, and focus trap.
 *
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onClose={close} title="Confirm">
 *   <p>Are you sure?</p>
 * </Modal>
 * ```
 *
 * @param props - Component props
 * @returns Rendered modal overlay or null when closed
 */
const Modal: React.FC<ModalProps> = ({
  size,
  children,
  state,
  modalStyles,
  ...props
}: ModalProps) => {
  const overlayRef = useRef(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, overlayRef);

  return (
    <Overlay>
      <div className={cn(backdropBaseClasses)} {...underlayProps} />
      <div className='fixed top-0 left-0 z-101 flex h-screen w-full items-center justify-center'>
        <div
          {...modalProps}
          ref={overlayRef}
          className={cn(modalPanelVariants({ size }), modalStyles)}
        >
          {children}
        </div>
      </div>
    </Overlay>
  );
};

export { Modal };
