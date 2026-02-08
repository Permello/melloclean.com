/**
 * @copyright 2026 Eduardo Turcios. All rights reserved.
 * Unauthorized use, reproduction, or distribution of this file is strictly prohibited.
 */

import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import type { modalPanelVariants } from './variants';
import type { AriaModalOverlayProps, OverlayTriggerProps } from 'react-aria';
import { type OverlayTriggerState } from '@react-stately/overlays';

export interface ModalStyleProps extends VariantProps<typeof modalPanelVariants> {
  modalStyles?: string;
}
/**
 * Props for the Modal component.
 */
export interface ModalProps extends AriaModalOverlayProps, ModalStyleProps {
  children: React.ReactNode;
  state: OverlayTriggerState;
}
