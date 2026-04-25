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

import { type OverlayTriggerProps, useOverlayTriggerState } from 'react-stately';

import React from 'react';
import { useOverlayTrigger } from 'react-aria';
import { Button, type ButtonProps } from '../button';
import { Modal } from './modal';

/**
 * Internal props for the ModalTrigger component combining overlay trigger
 * behavior with button styling.
 *
 * @extends OverlayTriggerProps - React Aria overlay trigger state props
 * @extends Omit<ButtonProps, 'children'> - Button styling props (variant, size, etc.)
 */
interface ModalActivatorProps extends OverlayTriggerProps, Omit<ButtonProps, 'children'> {
  /** Text label displayed on the trigger button */
  label: string;
  /** Optional icon rendered next to the label */
  icon?: React.ReactNode;
  /** Render function receiving a close callback, returns modal content */
  children: (close: () => void) => React.JSX.Element;
}

/**
 * Public props for the ModalTrigger component, excluding the children render function.
 * Used when typing the trigger button externally without the modal content.
 */
export type ModalTriggerProps = Omit<ModalActivatorProps, 'children'>;

/**
 * Compound component that pairs a Button trigger with a Modal overlay.
 * Manages overlay state internally using React Aria's useOverlayTriggerState.
 *
 * @example
 * ```tsx
 * <ModalTrigger label="Open" variant="primary">
 *   {(close) => <div><p>Modal content</p><button onClick={close}>Close</button></div>}
 * </ModalTrigger>
 * ```
 *
 * @param props - Component props
 * @param props.label - Text displayed on the trigger button
 * @param props.icon - Optional icon rendered next to the label
 * @param props.children - Render function that receives a close callback
 * @returns Trigger button and conditionally rendered modal
 */
const ModalTrigger = ({ label, icon, children, ...props }: ModalActivatorProps) => {
  const state = useOverlayTriggerState(props);
  let { triggerProps, overlayProps } = useOverlayTrigger({ type: 'dialog' }, state);

  return (
    <>
      <Button {...triggerProps} {...props}>
        {label} {icon}
      </Button>
      {state.isOpen && (
        <Modal size='large' state={state}>
          {React.cloneElement(children(state.close), overlayProps)}
        </Modal>
      )}
    </>
  );
};

export { ModalTrigger };
