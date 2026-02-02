/**
 * @copyright 2026 Eduardo Turcios. All rights reserved.
 * Unauthorized use, reproduction, or distribution of this file is strictly prohibited.
 */

import type { ReactNode } from 'react';
import type { ValidationErrors } from '~/core/util/validation';

/**
 * Configuration for a single wizard step.
 */
export interface WizardStepConfig {
  /** Unique identifier for the step */
  id: string;
  /** Display name shown in the indicator */
  name: string;
  /** Optional validation function for the step */
  validate?: (formData: Record<string, string>) => ValidationErrors;
}

/**
 * Props for the main Wizard component.
 */
export interface WizardProps {
  /** Array of step configurations */
  steps: WizardStepConfig[];
  /** Step content as children */
  children: ReactNode;
  /** Callback when wizard completes */
  onComplete?: (formData: Record<string, string>) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for individual WizardStep components.
 */
export interface WizardStepProps {
  /** Must match a step id from the wizard configuration */
  id: string;
  /** Step content */
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
  /** Maximum number of visible steps before scrolling */
  maxVisibleSteps?: number;
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
  /** Array of step configurations */
  steps: WizardStepConfig[];
  /** Current validation errors */
  errors: ValidationErrors;
  /** Collected form data */
  formData: Record<string, string>;
  /** Whether on the first step */
  isFirstStep: boolean;
  /** Whether on the last step */
  isLastStep: boolean;
  /** Advance to next step, returns success status */
  nextStep: () => boolean;
  /** Go back to previous step */
  prevStep: () => void;
  /** Update form data */
  updateFormData: (data: Record<string, string>) => void;
  /** Set validation errors */
  setErrors: (errors: ValidationErrors) => void;
}
