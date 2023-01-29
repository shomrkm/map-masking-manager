import { ErrorResponse } from '@/shared/core/utils';

import { Description } from '../Description';

describe('domain/ValueObjects/Description', () => {
  test('should not throw error if description is valid', () => {
    const Length500String = 'a'.repeat(500);

    expect(() => new Description('')).not.toThrowError();
    expect(() => new Description('aaaaa')).not.toThrowError();
    expect(() => new Description(Length500String)).not.toThrowError();
  });

  test('should throw error if description is invalid', () => {
    const Length501String = 'a'.repeat(501)

    expect(() => new Description(Length501String)).toThrowError(
      new ErrorResponse('Description can not be more than 500 characters', 400)
    );
  });
});
