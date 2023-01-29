import { ErrorResponse } from '@/shared/core/utils';

import { Text } from '../Text';

describe('domain/ValueObjects/Text', () => {
  test('should not throw error if text is valid', () => {
    const Length500String = 'a'.repeat(500);

    expect(() => new Text('')).not.toThrowError();
    expect(() => new Text('aaaaa')).not.toThrowError();
    expect(() => new Text(Length500String)).not.toThrowError();
  });

  test('should throw error if text is invalid', () => {
    const Length501String = 'a'.repeat(501);

    expect(() => new Text(Length501String)).toThrowError(
      new ErrorResponse('Text can not be more than 500 characters', 400)
    );
  });
});
