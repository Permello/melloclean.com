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

import type { WizardStageConfig } from '@permello/ui';
import { validators } from '~/core/util/validation';

/**
 * Account creation stage config.
 * Validates first name, last name, email, password, and password confirmation.
 */
export const ACCOUNT_CONFIG: WizardStageConfig = {
  id: 'account',
  name: 'Account',
  validate: {
    firstName: [(v) => validators.required(v, 'First name')],
    lastName: [(v) => validators.required(v, 'Last name')],
    email: [(v) => validators.required(v, 'Email'), validators.email],
    password: [(v) => validators.required(v, 'Password'), (v) => validators.minLength(v, 8)],
    confirmPassword: [
      (v) => validators.required(v, 'Confirm password'),
      validators.confirmPassword,
    ],
  },
};

/**
 * Service address stage config.
 * Validates street, city, state, and zip code.
 */
export const ADDRESS_CONFIG: WizardStageConfig = {
  id: 'address',
  name: 'Service Address',
  validate: {
    street: [(v) => validators.required(v, 'Street address')],
    city: [(v) => validators.required(v, 'City')],
    state: [(v) => validators.required(v, 'State')],
    zipCode: [(v) => validators.required(v, 'Zip code'), validators.zipCode],
  },
};
