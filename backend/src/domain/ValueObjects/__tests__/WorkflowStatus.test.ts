import { ErrorResponse } from '@/shared/core/utils';

import { WorkflowStatus } from '../WorkflowStatus';

describe('domain/ValueObjects/TaskStatus', () => {
  test('should not throw error if task status is valid', () => {
    expect(() => new WorkflowStatus('todo')).not.toThrowError();
    expect(() => new WorkflowStatus('inprogress')).not.toThrowError();
    expect(() => new WorkflowStatus('completed')).not.toThrowError();
    expect(() => new WorkflowStatus('closed')).not.toThrowError();
  });

  test('should throw error if task status is invalid', () => {
    expect(() => new WorkflowStatus('')).toThrowError(
      new ErrorResponse('Status must be todo,inprogress,completed,closed', 400)
    );
    expect(() => new WorkflowStatus('unexpected-status')).toThrowError(
      new ErrorResponse('Status must be todo,inprogress,completed,closed', 400)
    );
  });
});
