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

import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../util/cn';
import type { WizardStageProps } from './ts/types';
import { useWizard } from './wizard-context';

/**
 * Container for a single wizard stage with animated transitions.
 * Only renders when the stage is active.
 *
 * @param props - Component props
 * @param props.id - Stage identifier matching the wizard configuration
 * @param props.children - Stage content
 * @returns Animated step container or null if not active
 */
export function WizardStage({ id, children, className }: WizardStageProps) {
  const { stages, currentStep } = useWizard();

  const stageIndex = stages.findIndex((stage) => stage.id === id);
  const isActive = stageIndex === currentStep;

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
