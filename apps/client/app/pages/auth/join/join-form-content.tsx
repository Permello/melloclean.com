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
import { useActionData, useNavigation } from 'react-router';
import { useWizard, WizardIndicator, WizardNavigation, WizardStage } from '@permello/ui';
import { AccountSection, AddressSection } from './components';
import { ACCOUNT_CONFIG, ADDRESS_CONFIG } from './ts/constants';
import type { ActionData } from './ts/types';

/**
 * Internal component containing the wizard form fields.
 * Manages form state and renders step content.
 *
 * @returns Wizard form with indicator, steps, and navigation
 */
export function JoinFormContent() {
  const { errors, formData, updateFormData } = useWizard();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const combinedErrors = { ...errors, ...actionData?.errors };

  /**
   * Updates a single form field in the wizard's shared form state.
   *
   * @param name - The field name to update
   * @param value - The new value for the field
   */
  const handleChange = (name: string, value: string) => {
    updateFormData({ [name]: value });
  };

  return (
    <React.Fragment>
      <WizardIndicator className='mb-6' />

      <WizardStage id={ACCOUNT_CONFIG.id}>
        <AccountSection
          formData={formData}
          handleChange={handleChange}
          combinedErrors={combinedErrors}
        />
      </WizardStage>

      <WizardStage id={ADDRESS_CONFIG.id}>
        <AddressSection
          formData={formData}
          handleChange={handleChange}
          combinedErrors={combinedErrors}
        />
      </WizardStage>

      <WizardNavigation
        isSubmitting={isSubmitting}
        completeLabel='Create Account'
        className='mt-6'
      />
    </React.Fragment>
  );
}
