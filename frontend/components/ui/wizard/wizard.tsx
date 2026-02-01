import { cn } from '~/core/util/cn';
import { WizardProvider } from './wizard-context';
import type { WizardProps } from './ts/types';

export function Wizard({ steps, children, className }: WizardProps) {
  return (
    <WizardProvider steps={steps}>
      <div className={cn(className)}>{children}</div>
    </WizardProvider>
  );
}
