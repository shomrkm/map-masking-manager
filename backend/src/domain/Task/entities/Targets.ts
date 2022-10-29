import { ErrorResponse } from '@/interface/controller/errorResponse';
import { EnumArrayValueObject } from '../../ValueoObject/EnumArrayValueObject';

export const targetTypes = ['road', 'map', 'poi'];
export type TargetType = typeof targetTypes[number];
export type TargetTypes = TargetType[];

export class Targets extends EnumArrayValueObject<TargetType> {
  protected throwErrorForInvalidValue(value: TargetType): void {
    throw new ErrorResponse(`Target must be ${targetTypes.join(',')}`, 400);
  }
}
