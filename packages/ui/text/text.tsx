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

import type { ElementType } from 'react';
import { cn } from '../util/cn';
import { TextVariants } from './ts/variants';
import type { TextProps } from './ts/types';

/**
 * Polymorphic text component that renders different HTML elements with variant styling.
 * Supports paragraph, span, emphasis, and strong text elements.
 *
 * @example
 * ```tsx
 * <Text>Default paragraph text</Text>
 * <Text as="span">Gradient highlighted text</Text>
 * <Text as="em">Emphasized uppercase text</Text>
 * ```
 *
 * @param props - Component props
 * @param props.as - HTML element to render (p, span, em, strong)
 * @returns Rendered text element
 */
const Text = <T extends ElementType>(props: TextProps<T>) => {
  const { as, size, weight, className, ...rest } = props;

  const Component = `${as ?? 'p'}` as ElementType;

  return <Component className={cn(TextVariants({ as, className }))} {...rest} />;
};

export { Text };
