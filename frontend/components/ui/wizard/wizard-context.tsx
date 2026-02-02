/**
 * @copyright 2026 Eduardo Turcios. All rights reserved.
 * Unauthorized use, reproduction, or distribution of this file is strictly prohibited.
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { WizardContextValue, WizardStepConfig } from './ts/types';
import type { ValidationErrors } from '~/core/util/validation';

/**
 * React context for wizard state and actions.
 */
const WizardContext = createContext<WizardContextValue | null>(null);

/**
 * Hook to access wizard context from child components.
 *
 * @throws Error if used outside of WizardProvider
 * @returns Wizard context value with state and actions
 */
export function useWizard(): WizardContextValue {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}

/**
 * Props for the WizardProvider component.
 */
interface WizardProviderProps {
  /** Step configurations */
  steps: WizardStepConfig[];
  /** Child components */
  children: ReactNode;
}

/**
 * Provider component that manages wizard state and provides context to children.
 *
 * @param props - Component props
 * @returns Provider wrapping children with wizard context
 */
export function WizardProvider({ steps, children }: WizardProviderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<ValidationErrors>({});

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const updateFormData = useCallback((data: Record<string, string>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const nextStep = useCallback((): boolean => {
    const currentStepConfig = steps[currentStep];

    if (currentStepConfig.validate) {
      const validationErrors = currentStepConfig.validate(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return false;
      }
    }

    setErrors({});

    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }

    return true;
  }, [currentStep, steps, formData, isLastStep]);

  const prevStep = useCallback(() => {
    if (!isFirstStep) {
      setErrors({});
      setCurrentStep((prev) => prev - 1);
    }
  }, [isFirstStep]);

  const value: WizardContextValue = {
    currentStep,
    steps,
    errors,
    formData,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    updateFormData,
    setErrors,
  };

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}
