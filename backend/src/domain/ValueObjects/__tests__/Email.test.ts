import { ErrorResponse } from '@/shared/core/utils';

import { Email } from '../Email';

describe('Email ValueObject test', () => {
  test('should not throw error if email is valid', () => {
    expect(() => new Email('shomrkm@test.com')).not.toThrowError();
  });

  test('should throw error if email is invalid', () => {
    expect(() => new Email('testmail')).toThrowError(
      new ErrorResponse("Email 'testmail' is invalid", 400)
    );
    expect(() => new Email('(test@test.com')).toThrowError(
      new ErrorResponse("Email '(test@test.com' is invalid", 400)
    );
    expect(() => new Email('test@test@com')).toThrowError(
      new ErrorResponse("Email 'test@test@com' is invalid", 400)
    );
  });
});
