import { ValueObject } from '@/shared/domain/ValueObject';
import { ErrorResponse } from '@/shared/core/utils';

export const priorityTypes = ['high', 'normal', 'low'] as const;
export type PriorityType = typeof priorityTypes[number];

function isPriority(status: string): status is PriorityType {
  return priorityTypes.includes(status as PriorityType);
}

export class Priority extends ValueObject<PriorityType> {
  constructor(priority: string) {
    if (!isPriority(priority)) {
      throw new ErrorResponse(`Priority must be ${priorityTypes.join(',')}`, 400);
    }
    super(priority);
  }
}
