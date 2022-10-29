export abstract class EnumArrayValueObject<T> {
  readonly value: T[];

  constructor(value: T[], public readonly validValues: T[]) {
    this.value = value;
    value.forEach((v) => this.checkValueIsValid(v));
  }

  public checkValueIsValid(value: T): void {
    if (!this.validValues.includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }

  protected abstract throwErrorForInvalidValue(value: T): void;
}
