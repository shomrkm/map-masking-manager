import { ValueObject } from '@/shared/domain/ValueObject';
import { ErrorResponse } from '@/shared/core/utils';

export const levelTypes = ['expert', 'intermediate', 'beginner'] as const;
export type LevelType = typeof levelTypes[number];

function isLevel(level: string): level is LevelType {
  return levelTypes.includes(level as LevelType);
}

export class Level extends ValueObject<LevelType> {
  constructor(level: string) {
    if (!isLevel(level)) {
      throw new ErrorResponse(`Level must be ${levelTypes.join(',')}`, 400);
    }
    super(level);
  }
}
