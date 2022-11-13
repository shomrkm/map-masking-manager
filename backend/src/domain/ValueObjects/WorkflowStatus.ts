import { ValueObject } from '@/shared/domain/ValueObject';
import { ErrorResponse } from '@/shared/core/utils';

export const workflowStatusTypes = ['todo', 'inprogress', 'completed', 'closed'] as const;
export type WorkflowStatusType = typeof workflowStatusTypes[number];

function isStatus(status: string): status is WorkflowStatusType {
  return workflowStatusTypes.includes(status as WorkflowStatusType);
}

export class WorkflowStatus extends ValueObject<WorkflowStatusType> {
  constructor(status: string) {
    if (!isStatus(status)) {
      throw new ErrorResponse(`Status must be ${workflowStatusTypes.join(',')}`, 400);
    }
    super(status);
  }
}
