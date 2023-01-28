import { ErrorResponse } from '@/shared/core/utils';

import { Level } from '../Level';

describe('domain/ValueObjects/Level', () => {
  test('should not throw error if level is valid', () => {
    expect(() => new Level('expert')).not.toThrowError();
    expect(() => new Level('intermediate')).not.toThrowError();
    expect(() => new Level('beginner')).not.toThrowError();
  });

  test('should throw error if level is invalid', () => {
    expect(() => new Level('')).toThrowError(
      new ErrorResponse('Level must be expert,intermediate,beginner', 400)
    );
    expect(() => new Level('unexpected-level')).toThrowError(
      new ErrorResponse('Level must be expert,intermediate,beginner', 400)
    );
  });
});
