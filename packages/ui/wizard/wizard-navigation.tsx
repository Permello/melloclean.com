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

import { cn } from '../util/cn';
import { Button } from '../button';
import { useWizard } from './wizard-context';
import type { WizardNavigationProps } from './ts/types';

/**
 * Navigation buttons for wizard step transitions.
 * Provides back, next, and complete buttons with automatic state handling.
 *
 * @param props - Component props
 * @returns Navigation button container
 */
export function WizardNavigation({
  isSubmitting = false,
  nextLabel = 'Next',
  backLabel = 'Back',
  completeLabel = 'Complete',
  className,
}: WizardNavigationProps) {
  const { isFirstStage, isLastStage, nextStage, prevStage } = useWizard();

  /** Advances to the next stage without submitting the form. */
  const handleNext = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!isLastStage) {
      nextStage();
    }
  };

  /** Validates the final stage and allows form submission if valid. */
  const handleSubmit = (event: React.MouseEvent) => {
    const isValid = nextStage();
    if (!isValid) {
      event.preventDefault();
    }
  };

  return (
    <div
      className={cn('flex gap-3', isFirstStage ? 'justify-center' : 'justify-between', className)}
    >
      {!isFirstStage && (
        <Button
          type='button'
          variant='secondary'
          onPress={prevStage}
          aria-label='Go to previous step'
        >
          {backLabel}
        </Button>
      )}

      {isLastStage ? (
        <Button
          type='submit'
          disabled={isSubmitting}
          isLoading={isSubmitting}
          onClick={handleSubmit}
          aria-label={completeLabel}
        >
          {completeLabel}
        </Button>
      ) : (
        <Button type='button' onClick={handleNext} aria-label='Go to next step'>
          {nextLabel}
        </Button>
      )}
    </div>
  );
}
