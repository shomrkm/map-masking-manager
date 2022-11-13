import { ErrorResponse } from '../core/utils';

export type Primitives = String | string | number | Boolean | boolean | Date;

export abstract class ValueObject<T extends Primitives> {
  readonly value: T;

  protected constructor(value: T) {
    this.value = value;
    this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new ErrorResponse('Value must be defined', 400);
    }
  }

  toPrimitive(): T {
    return this.value;
  }

  equal(other: ValueObject<T>): boolean {
    return other.constructor.name === this.constructor.name && other.value === this.value;
  }
}
