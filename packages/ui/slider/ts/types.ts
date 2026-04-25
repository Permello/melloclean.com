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
 * Props for the Slider component.
 */
export interface SliderProps {
  /** Label text displayed above the slider */
  label?: string;
  /** Error message displayed below the slider */
  errorMessage?: string;
  /** Hint text displayed below the slider when no error */
  hint?: string;
  /** Whether to show the current value */
  showValue?: boolean;
  /** Custom formatter for the displayed value */
  formatValue?: (value: number) => string;
  /** Minimum allowed value */
  minValue: number;
  /** Maximum allowed value */
  maxValue: number;
  /** Step increment between values */
  step: number;
  /** Current slider value */
  value: number;
  /** Callback fired when the value changes */
  onChange: (value: number) => void;
  /** Additional CSS classes */
  className?: string;
}
