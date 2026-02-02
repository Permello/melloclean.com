/**
 * @copyright 2026 Eduardo Turcios. All rights reserved.
 * Unauthorized use, reproduction, or distribution of this file is strictly prohibited.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '~/core/util/cn';
import { useWizard } from './wizard-context';
import type { WizardStepProps } from './ts/types';

/**
 * Container for a single wizard step with animated transitions.
 * Only renders when the step is active.
 *
 * @param props - Component props
 * @param props.id - Step identifier matching the wizard configuration
 * @param props.children - Step content
 * @returns Animated step container or null if not active
 */
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
