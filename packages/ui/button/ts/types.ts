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
import type { buttonVariants, loadingVariants } from './variants';
import type { AriaButtonProps } from 'react-aria';
import type { ComponentPropsWithRef } from 'react';

/**
 * Behavioral props specific to the Button component.
 */
interface ButtonBehaviorProp {
  /** Whether the button is in a loading state */
  isLoading?: boolean;
}

/**
 * Props for the Button component combining HTML button attributes,
 * CVA variants, and React Aria accessibility props.
 */
type ButtonProps = ComponentPropsWithRef<'button'> &
  VariantProps<typeof buttonVariants> &
  ButtonBehaviorProp &
  AriaButtonProps<'button'>;

/**
 * Props for the loading indicator component.
 */
type LoadingProps = VariantProps<typeof loadingVariants>;
export type { ButtonProps, LoadingProps };
