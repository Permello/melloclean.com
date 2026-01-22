import type { ElementType } from 'react';
import { cn } from '~/core/util/cn';
import { TextVariants } from './ts/variants';
import type { TextProps } from './ts/types';

const Text = <T extends ElementType>(props: TextProps<T>) => {
  const { as, size, weight, className, ...rest } = props;

  const Component = `${as ?? 'p'}` as ElementType;

  return <Component className={cn(TextVariants({ as, className }))} {...rest} />;
};

export { Text };
