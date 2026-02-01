import { cn } from '~/core/util/cn';
import { Button } from '~/components/ui/button';
import { useWizard } from './wizard-context';
import type { WizardNavigationProps } from './ts/types';

export function WizardNavigation({
  isSubmitting = false,
  nextLabel = 'Next',
  backLabel = 'Back',
  completeLabel = 'Complete',
  className,
}: WizardNavigationProps) {
  const { isFirstStep, isLastStep, nextStep, prevStep } = useWizard();

  const handleNext = () => {
    if (!isLastStep) {
      nextStep();
    }
  };

  return (
    <div className={cn('flex gap-3', isFirstStep ? 'justify-end' : 'justify-between', className)}>
      {!isFirstStep && (
        <Button type='button' variant='secondary' onPress={prevStep}>
          {backLabel}
        </Button>
      )}

      {isLastStep ? (
        <Button type='submit' disabled={isSubmitting} isLoading={isSubmitting}>
          {completeLabel}
        </Button>
      ) : (
        <Button type='button' onPress={handleNext}>
          {nextLabel}
        </Button>
      )}
    </div>
  );
}
