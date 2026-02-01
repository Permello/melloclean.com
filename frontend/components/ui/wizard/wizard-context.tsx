import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { WizardContextValue, WizardStepConfig } from './ts/types';
import type { ValidationErrors } from '~/core/util/validation';

const WizardContext = createContext<WizardContextValue | null>(null);

export function useWizard(): WizardContextValue {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}

interface WizardProviderProps {
  steps: WizardStepConfig[];
  children: ReactNode;
}

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
