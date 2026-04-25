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

import React from 'react';
import { Input, type InputProps } from '@permello/ui';

/**
 * Props for the PasswordInput component.
 */
interface PasswordInputProps extends Omit<InputProps, 'type'> {
  /** Whether to show password requirements hint */
  showRequirements?: boolean;
}

/**
 * Password input field with optional requirements hint.
 * Wraps the base Input component with password-specific behavior.
 *
 * @param props - Component props
 * @returns Password input with visibility toggle
 */
const PasswordInput: React.FC<PasswordInputProps> = ({
  showRequirements = false,
  hint,
  ...props
}) => {
  return <Input {...props} type='password' hint={showRequirements ? 'Min 8 characters' : hint} />;
};

export { PasswordInput };
