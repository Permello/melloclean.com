import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '~/core/util/cn';
import { useWizard } from './wizard-context';
import { circleVariants, labelVariants, connectorVariants } from './ts/variants';
import type { WizardIndicatorProps } from './ts/types';

export function WizardIndicator({ className }: WizardIndicatorProps) {
  const { steps, currentStep } = useWizard();

  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isCompleted = status === 'completed';

        return (
          <div key={step.id} className='flex items-center'>
            <div className='flex flex-col items-center'>
              <motion.div
                className={cn(circleVariants({ status }))}
                initial={false}
                animate={{
                  scale: status === 'active' ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className='h-4 w-4' />
                  </motion.div>
                ) : (
                  index + 1
                )}
              </motion.div>
              <span className={cn(labelVariants({ status }))}>{step.name}</span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  connectorVariants({
                    status: index < currentStep ? 'completed' : 'pending',
                  }),
                  'self-start mt-4'
                )}
                style={{ minWidth: '3rem' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
