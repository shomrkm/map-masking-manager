import { ValueObject } from './ValueObject';

export abstract class NumberValueObject extends ValueObject<string> {
  isBeggerThan(other: NumberValueObject) {
    return this.value > other.value;
  }
}
