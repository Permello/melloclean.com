import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import type { headingVariants } from './variants';

type HeadingProps<T extends ElementType> = ComponentPropsWithoutRef<T> &
  VariantProps<typeof headingVariants>;

export type { HeadingProps };
