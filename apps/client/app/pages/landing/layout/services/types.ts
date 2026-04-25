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

/**
 * Available color variants for service cards.
 */
type Color = 'emerald' | 'teal' | 'amber' | 'slate';

/**
 * Configuration for a single service offering.
 */
type ServiceOption = {
  /** Icon component to display */
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Service title */
  title: string;
  /** Service description */
  description: string;
  /** Price display text */
  price: string;
  /** Color theme for the card */
  color: Color;
  /** List of included features */
  features: string[];
};

/**
 * Tailwind class mappings for a color variant.
 */
type ColorClassesOptions = {
  /** Background color class */
  bg: string;
  /** Icon container classes */
  icon: string;
  /** Hover state classes */
  hover: string;
};
