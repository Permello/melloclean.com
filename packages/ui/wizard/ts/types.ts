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

import type { ReactNode } from 'react';
import type { ValidationErrors, ValidatorFn } from '../../util/validation';

/**
 * Configuration for a single wizard stage.
 */
export interface WizardStageConfig {
  /** Unique identifier for the stage */
  id: string;
  /** Display name shown in the indicator */
  name: string;
  /** Optional validation function for the stage */
  validate?: Record<string, ValidatorFn[]>;
}

/**
 * Props for the main Wizard component.
 */
export interface WizardProps {
  /** Array of stage configurations */
  stages: WizardStageConfig[];
  /** Stage content as children */
  children: ReactNode;
  /** Callback when wizard completes */
  onComplete?: (formData: Record<string, string>) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for individual WizardStage components.
 */
export interface WizardStageProps {
  /** Must match a stage id from the wizard configuration */
  id: string;
  /** Stage content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the WizardIndicator component.
 */
export interface WizardIndicatorProps {
  /** Additional CSS classes */
  className?: string;
  /** Maximum number of visible stages before scrolling */
  maxVisibleStages?: number;
}

/**
 * Props for the WizardNavigation component.
 */
export interface WizardNavigationProps {
  /** Whether form submission is in progress */
  isSubmitting?: boolean;
  /** Label for the next button */
  nextLabel?: string;
  /** Label for the back button */
  backLabel?: string;
  /** Label for the complete/submit button */
  completeLabel?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Context value providing wizard state and actions.
 */
export interface WizardContextValue {
  /** Current step index (0-based) */
  currentStep: number;
  /** Highest step index that has been validated (0-based). -1 means none completed. */
  maxCompletedStep: number;
  /** Array of stage configurations */
  stages: WizardStageConfig[];
  /** Current validation errors */
  errors: ValidationErrors;
  /** Collected form data */
  formData: Record<string, string>;
  /** Whether on the first stage */
  isFirstStage: boolean;
  /** Whether on the last stage */
  isLastStage: boolean;
  /** Advance to next stage, returns success status */
  nextStage: () => boolean;
  /** Go back to previous stage */
  prevStage: () => void;
  /**
   * Navigates directly to a previously completed stage.
   * Only allows navigation to previously completed stages.
   *
   * @param index - The 0-based index of the target stage
   */
  goToStage: (index: number) => void;
  /** Update form data */
  updateFormData: (data: Record<string, string>) => void;
  /** Set validation errors */
  setErrors: (errors: ValidationErrors) => void;
}
