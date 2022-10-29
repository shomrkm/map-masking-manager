import { ErrorResponse } from '@/interface/controller/errorResponse';
import { ValueObject } from '../../ValueoObject/ValueObject';

export const statusTypes = ['todo', 'inprogress', 'inReview', 'completed'] as const;
export type StatusType = typeof statusTypes[number];

function isStatus(status: string): status is StatusType {
  return statusTypes.includes(status as StatusType);
}

export class Status extends ValueObject<StatusType> {
  constructor(status: string) {
    if (!isStatus(status)) {
      throw new ErrorResponse(`Status must be ${statusTypes.join(',')}`, 400);
    }
    super(status);
  }
}
