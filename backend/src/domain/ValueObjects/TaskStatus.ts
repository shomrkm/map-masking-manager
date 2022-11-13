import { ValueObject } from '@/shared/domain/ValueObject';
import { ErrorResponse } from '@/shared/core/utils';

export const taskStatusTypes = ['todo', 'inprogress', 'inReview', 'completed'] as const;
export type TaskStatusType = typeof taskStatusTypes[number];

function isStatus(status: string): status is TaskStatusType {
  return taskStatusTypes.includes(status as TaskStatusType);
}

export class TaskStatus extends ValueObject<TaskStatusType> {
  constructor(status: string) {
    if (!isStatus(status)) {
      throw new ErrorResponse(`Status must be ${taskStatusTypes.join(',')}`, 400);
    }
    super(status);
  }
}
