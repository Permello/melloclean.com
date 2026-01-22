import type { ElementType } from 'react';
import type { HeadingProps } from './ts/types';
import { cn } from '~/core/util/cn';
import { headingVariants } from './ts/variants';

const Heading = <T extends ElementType>(props: HeadingProps<T>) => {
  const { level, className, ...rest } = props;
  const Component = `h${level ?? 1}` as ElementType;

  return <Component className={cn(headingVariants({ level, className }))} {...rest} />;
};

export { Heading };
