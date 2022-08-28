import { ErrorResponse } from '@/interface/controller/errorResponse';
import { ValueObject } from '../../base/ValueObject';

export const targetTypes = ['road', 'map', 'poi'] as const;
export type TargetType = typeof targetTypes[number];
export type TargetTypes = TargetType[];

function isTarget(target: string): target is TargetType {
  return targetTypes.includes(target as TargetType);
}
function isTargets(targets: string[]): targets is TargetTypes {
  return targets.every((t) => isTarget(t));
}

export class Targets extends ValueObject<TargetType[]> {
  constructor(targets: string[]) {
    if (!isTargets(targets)) {
      throw new ErrorResponse(`Target must be ${targetTypes.join(',')}`, 400);
    }
    super(targets);
  }

  public add(target: string) {
    if (!isTarget(target)) {
      throw new ErrorResponse(`Target must be ${targetTypes.join(',')}`, 400);
    }
    this.value.push(target);
  }
}
