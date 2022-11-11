export abstract class EnumArrayValueObject<T> {
  protected value: T[];

  constructor(value: T[], public readonly validValues: T[]) {
    this.value = value;
    value.forEach((v) => this.checkValueIsValid(v));
  }

  public checkValueIsValid(value: T): void {
    if (!this.validValues.includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }

  public toPrimitive(): T[] {
    return this.value ?? [];
  }

  protected abstract throwErrorForInvalidValue(value: T): void;
}
