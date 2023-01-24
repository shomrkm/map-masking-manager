import { ErrorResponse } from '@/shared/core/utils';

import { Title } from '../Title';

describe('domain/ValueObjects/Title', () => {
  test('should not throw error if title is valid', () => {
    const Length50String = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

    expect(() => new Title('')).not.toThrowError();
    expect(() => new Title('aaaaa')).not.toThrowError();
    expect(() => new Title(Length50String)).not.toThrowError();
  });

  test('should throw error if description is invalid', () => {
    const Length51String = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

    expect(() => new Title(Length51String)).toThrowError(
      new ErrorResponse('Title can not be more than 50 characters', 400)
    );
  });
});
