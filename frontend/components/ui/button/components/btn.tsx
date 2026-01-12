import React from 'react';
import { cn } from '~/core/util/cn';
import { buttonVariants } from '../ts/variants';
import type { ButtonProps } from '../ts/types';

function Btn(): React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> {
  return (props: ButtonProps, fwdRef) => {
    const { className, variant, size, ...rest } = props;
    const buttonClasses = cn(buttonVariants({ variant, size, className }));
    return <button ref={fwdRef} className={buttonClasses} {...rest} />;
  };
}

export { Btn };
