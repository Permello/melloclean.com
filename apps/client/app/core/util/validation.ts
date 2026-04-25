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
 * Collection of common validation functions for form fields.
 */
export const validators = {
  /** Validates that a field is not empty */
  required: (value: string, fieldName: string): string | null =>
    !value || value.trim() === '' ? `${fieldName} is required` : null,

  /** Validates email format */
  email: (value: string): string | null =>
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : null,

  /** Validates minimum string length */
  minLength: (value: string, min: number): string | null =>
    value.length < min ? `Must be at least ${min} characters` : null,

  /** Validates 5-digit US zip code format */
  zipCode: (value: string): string | null =>
    !/^\d{5}$/.test(value) ? 'Zip code must be 5 digits' : null,

  /** Validates that password confirmation matches */
  confirmPassword: (value: string, data: Record<string, string>): string | null =>
    value !== data.password ? 'Passwords do not match' : null,

  /** Validates that a numeric string meets a minimum value */
  minNumber: (value: string, min: number, message?: string): string | null =>
    isNaN(Number(value)) || Number(value) < min ? message || `Must be at least ${min}` : null,
};

export type ValidatorFn<T extends Record<string, string> = Record<string, string>> = (
  value: string,
  data: T,
) => string | null;
/**
 * Record of field names to error messages.
 */
export type ValidationErrors = Record<string, string>;

/**
 * Validates form data against a set of rules.
 *
 * @param data - Form data object with string values
 * @param rules - Validation rules for each field
 * @returns Object containing validation errors by field name
 */
export function validateForm<T extends Record<string, string>>(
  data: T,
  rules: Record<keyof T, ValidatorFn[]>,
): ValidationErrors {
  const errors: ValidationErrors = {};

  for (const field in rules) {
    const value = data[field] ?? '';

    for (const rule of rules[field]) {
      const error = rule(value, data);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  }

  return errors;
}
