import type { VariantProps } from 'class-variance-authority';
import type { ElementType, ComponentPropsWithoutRef } from 'react';
import type { TextVariants } from '../ts/variants';

export type TextProps<T extends ElementType> = ComponentPropsWithoutRef<T> &
  VariantProps<typeof TextVariants>;
