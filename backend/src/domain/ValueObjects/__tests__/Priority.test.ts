import { ErrorResponse } from '@/shared/core/utils';

import { Priority } from '../Priority';

describe('domain/ValueObjects/Priority', () => {
  test('should not throw error if priority is valid', () => {
    expect(() => new Priority('high')).not.toThrowError();
    expect(() => new Priority('normal')).not.toThrowError();
    expect(() => new Priority('low')).not.toThrowError();
  });

  test('should throw error if priority is invalid', () => {
    expect(() => new Priority('')).toThrowError(
      new ErrorResponse('Priority must be high,normal,low', 400)
    );
    expect(() => new Priority('unexpected-level')).toThrowError(
      new ErrorResponse('Priority must be high,normal,low', 400)
    );
  });
});
