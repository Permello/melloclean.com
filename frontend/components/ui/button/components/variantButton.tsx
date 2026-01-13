import React, { useRef, type ForwardedRef } from 'react';
import { cn } from '~/core/util/cn';
import { buttonVariants, loadingVariants } from '../ts/variants';
import type { ButtonProps, LoadingProps } from '../ts/types';
import { mergeProps, useButton, useFocusRing, useHover } from 'react-aria';
import { mergeRefs } from '~/core/util/mergeRef';

const LoadingButton = ({ variant }: LoadingProps) => {
  const loadingClasses = cn(loadingVariants({ variant }));
  return (
    <div className={loadingClasses}>
      <div className='h-4 w-4 animate-spin rounded-full border-2 border-[inherit] border-b-transparent' />
    </div>
  );
};

const ForwardRefButton = (props: ButtonProps, forwardRef: ForwardedRef<HTMLButtonElement>) => {
  const { className, variant, size, disabled, isLoading, children, ...rest } = props;
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton({ ...rest, isDisabled: disabled }, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover({
    ...props,
    isDisabled: disabled,
  });
  const buttonClasses = cn(buttonVariants({ variant, size, className }));
  const mRef = mergeRefs([ref, forwardRef]);

  const ariaProps = mergeProps(buttonProps, focusProps, hoverProps);
  return (
    <button
      ref={mRef}
      className={buttonClasses}
      data-pressed={isPressed || undefined}
      data-hovered={isHovered || undefined}
      data-focus-visible={isFocusVisible || undefined}
      {...ariaProps}
    >
      {isLoading && <LoadingButton variant={variant} />}

      <span
        className={cn(
          'transition',
          {
            'opacity-0': isLoading,
            'opacity-100': !isLoading,
          },
          'inline-flex items-center justify-between gap-4',
        )}
      >
        {children}
      </span>
    </button>
  );
};

const VariantButton = (): React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> => {
  return ForwardRefButton;
};

export { VariantButton };
