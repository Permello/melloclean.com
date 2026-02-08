/**
 * @copyright 2026 Eduardo Turcios. All rights reserved.
 * Unauthorized use, reproduction, or distribution of this file is strictly prohibited.
 */

import { type OverlayTriggerProps, useOverlayTriggerState } from '@react-stately/overlays';

import React from 'react';
import { useOverlayTrigger } from 'react-aria';
import { Button, type ButtonProps } from '~/components/ui/button';
import { Modal } from './modal';
interface ModalActivatorProps extends OverlayTriggerProps, Omit<ButtonProps, 'children'> {
  label: string;
  icon?: React.ReactNode;
  children: (close: () => void) => React.JSX.Element;
}

export type ModalTriggerProps = Omit<ModalActivatorProps, 'children'>;
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
