import React from 'react';
import { Input } from '~/components/ui/input';
import type { InputProps } from '~/components/ui/input';

interface PasswordInputProps extends Omit<InputProps, 'type'> {
  showRequirements?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  showRequirements = false,
  hint,
  ...props
}) => {
  return <Input {...props} type='password' hint={showRequirements ? 'Min 8 characters' : hint} />;
};

export { PasswordInput };
