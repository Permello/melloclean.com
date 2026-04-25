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

import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import type { modalPanelVariants } from './variants';
import type { AriaModalOverlayProps, OverlayTriggerProps } from 'react-aria';
import { type OverlayTriggerState } from 'react-stately';

/**
 * Style props for the Modal component controlling panel size and custom styles.
 */
export interface ModalStyleProps extends VariantProps<typeof modalPanelVariants> {
  /** Additional CSS classes applied to the modal panel */
  modalStyles?: string;
}

/**
 * Props for the Modal component combining React Aria overlay behavior
 * with style and content props.
 *
 * @extends AriaModalOverlayProps - React Aria modal overlay accessibility props
 * @extends ModalStyleProps - Size variant and custom style props
 */
export interface ModalProps extends AriaModalOverlayProps, ModalStyleProps {
  /** Content rendered inside the modal panel */
  children: React.ReactNode;
  /** Overlay trigger state controlling open/close behavior */
  state: OverlayTriggerState;
}
