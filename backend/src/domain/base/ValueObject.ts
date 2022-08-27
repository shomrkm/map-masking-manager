export abstract class ValueObject<T> {
  protected constructor(protected readonly value: T) {}

  get(): T {
    return this.value;
  }

  equal(vo: ValueObject<T>): boolean {
    if (this.constructor.name !== vo.constructor.name) return false;
    return this.get() === vo.get();
  }
}
