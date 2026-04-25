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
 * Represents a single option in the toggle button group.
 */
export interface ToggleOption {
  /** Unique key for the option */
  key: string;
  /** Display label for the option */
  label: string;
}

/**
 * Props for the ToggleButtonGroup component.
 */
export interface ToggleButtonGroupProps {
  /** Label text displayed above the group */
  label?: string;
  /** Error message displayed below the group */
  errorMessage?: string;
  /** Hint text displayed below the group when no error */
  hint?: string;
  /** Available options to toggle */
  options: ToggleOption[];
  /** Keys of currently selected options */
  selectedKeys: string[];
  /** Callback fired when the selection changes */
  onSelectionChange: (keys: string[]) => void;
  /** Additional CSS classes */
  className?: string;
}
