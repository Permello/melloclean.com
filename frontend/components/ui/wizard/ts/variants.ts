import { cva } from 'class-variance-authority';
import {
  circleBaseClasses,
  circleActiveClasses,
  circleCompletedClasses,
  circlePendingClasses,
  labelBaseClasses,
  labelActiveClasses,
  labelCompletedClasses,
  labelPendingClasses,
  connectorBaseClasses,
  connectorCompletedClasses,
  connectorPendingClasses,
} from './constants';

export const circleVariants = cva(circleBaseClasses, {
  variants: {
    status: {
      active: circleActiveClasses,
      completed: circleCompletedClasses,
      pending: circlePendingClasses,
    },
  },
  defaultVariants: {
    status: 'pending',
  },
});

export const labelVariants = cva(labelBaseClasses, {
  variants: {
    status: {
      active: labelActiveClasses,
      completed: labelCompletedClasses,
      pending: labelPendingClasses,
    },
  },
  defaultVariants: {
    status: 'pending',
  },
});

export const connectorVariants = cva(connectorBaseClasses, {
  variants: {
    status: {
      completed: connectorCompletedClasses,
      pending: connectorPendingClasses,
    },
  },
  defaultVariants: {
    status: 'pending',
  },
});
