export abstract class EnumValueObject<T> {
  protected value: T;

  constructor(value: T, public readonly validValues: T[]) {
    this.value = value;
    this.checkValueIsValid(value);
  }

  public checkValueIsValid(value: T): void {
    if (!this.validValues.includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }

  public toPrimitive(): T {
    return this.value;
  }

  protected abstract throwErrorForInvalidValue(value: T): void;
}
