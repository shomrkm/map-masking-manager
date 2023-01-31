import { ErrorResponse } from '@/shared/core/utils';

import { Role } from '../Role';

describe('domain/ValueObjects/Role', () => {
  test('should not throw error if role is valid', () => {
    expect(() => new Role('admin')).not.toThrowError();
    expect(() => new Role('publisher')).not.toThrowError();
    expect(() => new Role('mapper')).not.toThrowError();
  });

  test('should throw error if role is invalid', () => {
    expect(() => new Role('')).toThrowError(
      new ErrorResponse('Role must be admin,publisher,mapper', 400)
    );
    expect(() => new Role('unexpected-level')).toThrowError(
      new ErrorResponse('Role must be admin,publisher,mapper', 400)
    );
  });
});
