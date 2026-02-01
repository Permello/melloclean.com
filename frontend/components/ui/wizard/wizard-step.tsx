import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '~/core/util/cn';
import { useWizard } from './wizard-context';
import type { WizardStepProps } from './ts/types';

export function WizardStep({ id, children, className }: WizardStepProps) {
  const { steps, currentStep } = useWizard();

  const stepIndex = steps.findIndex((step) => step.id === id);
  const isActive = stepIndex === currentStep;

  return (
    <AnimatePresence mode='wait'>
      {isActive && (
        <motion.div
          key={id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className={cn(className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
