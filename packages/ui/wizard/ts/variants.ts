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

import { cva } from 'class-variance-authority';
import {
  circleBaseClasses,
  circleActiveClasses,
  circleCompletedClasses,
  circlePendingClasses,
  labelBaseClasses,
  labelActiveClasses,
  labelCompletedClasses,
  labelPendingClasses,
  connectorBaseClasses,
  connectorCompletedClasses,
  connectorPendingClasses,
} from './constants';

/**
 * CVA variant configuration for step indicator circles.
 */
export const circleVariants = cva(circleBaseClasses, {
  variants: {
    status: {
      active: circleActiveClasses,
      completed: circleCompletedClasses,
      pending: circlePendingClasses,
    },
  },
  defaultVariants: {
    status: 'pending',
  },
});

/**
 * CVA variant configuration for step indicator labels.
 */
export const labelVariants = cva(labelBaseClasses, {
  variants: {
    status: {
      active: labelActiveClasses,
      completed: labelCompletedClasses,
      pending: labelPendingClasses,
    },
  },
  defaultVariants: {
    status: 'pending',
  },
});

/**
 * CVA variant configuration for step connector lines.
 */
export const connectorVariants = cva(connectorBaseClasses, {
  variants: {
    status: {
      completed: connectorCompletedClasses,
      pending: connectorPendingClasses,
    },
  },
  defaultVariants: {
    status: 'pending',
  },
});
