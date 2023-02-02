import { ErrorResponse } from '@/shared/core/utils';

import { Targets, targetTypes } from '../Targets';

describe('domain/ValueObjects/Targets', () => {
  test('should not throw error if targets is valid', () => {
    expect(() => new Targets(['road'], targetTypes)).not.toThrowError();
    expect(() => new Targets(['map', 'poi'], targetTypes)).not.toThrowError();
    expect(() => new Targets(['map', 'poi', 'road'], targetTypes)).not.toThrowError();
    expect(() => new Targets([], targetTypes)).not.toThrowError();
  });

  test('should throw error if targets is invalid', () => {
    expect(() => new Targets([''], targetTypes)).toThrowError(
      new ErrorResponse('Target must be road,map,poi', 400)
    );
    expect(() => new Targets(['road', 'unexpected-target', 'map'], targetTypes)).toThrowError(
      new ErrorResponse('Target must be road,map,poi', 400)
    );
  });
});
