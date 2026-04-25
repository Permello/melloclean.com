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
import type { HeadingProps } from './ts/types';
import { headingVariants } from './ts/variants';

/**
 * Polymorphic heading component that renders the appropriate HTML heading element.
 * Automatically maps the level prop to the corresponding h1-h6 element.
 *
 * @example
 * ```tsx
 * <Heading level={1}>Main Title</Heading>
 * <Heading level={2}>Section Title</Heading>
 * ```
 *
 * @param props - Component props
 * @param props.level - Heading level (1-6), determines both the HTML element and text size
 * @returns Rendered heading element
 */
const Heading = <T extends ElementType>(props: HeadingProps<T>) => {
  const { level, className, ...rest } = props;
  const Component = `h${level ?? 1}` as ElementType;

  return <Component className={cn(headingVariants({ level, className }))} {...rest} />;
};

export { Heading };
