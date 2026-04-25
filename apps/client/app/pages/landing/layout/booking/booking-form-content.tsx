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

import { useCallback } from 'react';
import { WizardIndicator, WizardNavigation, WizardStage, useWizard } from '@permello/ui';
import { GeneralSection, HomeSection, SummarySection, VisitSection } from './components';
import { GENERAL_CONFIG, HOME_CONFIG, SUMMARY_CONFIG, VISIT_CONFIG } from './ts/constants';
/**
 * Internal form content component rendered inside the Wizard.
 * Provides access to wizard context for form data and error state.
 * Contains all 4 booking stages: General Info, Home Details, Your Visit, and Summary.
 *
 * @returns Rendered wizard stages with form fields
 */
export function BookingFormContent() {
  const { formData, updateFormData, errors } = useWizard();

  /** Updates a single form field by key. */
  const setField = useCallback(
    (key: string, value: string) => {
      updateFormData({ [key]: value });
    },
    [updateFormData],
  );

  const priorityKeys = formData.priorityAreas
    ? formData.priorityAreas.split(',').filter(Boolean)
    : [];

  return (
    <>
      <WizardIndicator maxVisibleStages={4} className='mb-6' />

      {/* Stage 1: General Info */}
      <WizardStage id={GENERAL_CONFIG.id}>
        <GeneralSection formData={formData} setField={setField} errors={errors} />
      </WizardStage>

      {/* Stage 2: Home Details */}
      <WizardStage id={HOME_CONFIG.id}>
        <HomeSection formData={formData} setField={setField} errors={errors} />
      </WizardStage>

      {/* Stage 3: About Your Visit */}
      <WizardStage id={VISIT_CONFIG.id}>
        <VisitSection
          priorityKeys={priorityKeys}
          setField={setField}
          errors={errors}
          formData={formData}
        />
      </WizardStage>

      {/* Stage 4: Summary */}
      <WizardStage id={SUMMARY_CONFIG.id}>
        <SummarySection formData={formData} />
      </WizardStage>

      <WizardNavigation className='mt-8' completeLabel='Confirm & Create Account' />
    </>
  );
}
