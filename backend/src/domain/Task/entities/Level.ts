import { ErrorResponse } from '@/interface/controller/errorResponse';
import { ValueObject } from '../../base/ValueObject';

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
