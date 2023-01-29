import { ErrorResponse } from '@/shared/core/utils';

import { TaskStatus } from '../TaskStatus';

describe('domain/ValueObjects/TaskStatus', () => {
  test('should not throw error if task status is valid', () => {
    expect(() => new TaskStatus('todo')).not.toThrowError();
    expect(() => new TaskStatus('inprogress')).not.toThrowError();
    expect(() => new TaskStatus('inReview')).not.toThrowError();
    expect(() => new TaskStatus('completed')).not.toThrowError();
  });

  test('should throw error if task status is invalid', () => {
    expect(() => new TaskStatus('')).toThrowError(
      new ErrorResponse('Status must be todo,inprogress,inReview,completed', 400)
    );
    expect(() => new TaskStatus('unexpected-status')).toThrowError(
      new ErrorResponse('Status must be todo,inprogress,inReview,completed', 400)
    );
  });
});
