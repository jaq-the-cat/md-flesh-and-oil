export class NumberField<T extends object = any> {
  private value: number;

  constructor(
    public readonly min: number,
    public readonly max: NumberLike<T>,
  ) {
    this.value = min;
  }

  getMaxValue(obj: T) {
    return typeof this.max == "number" ? this.max : this.max(obj);
  }

  setValue(obj: T, n: number) {
    if (this.min <= n && n <= this.getMaxValue(obj)) {
      this.value = n;
    }
  }

  getValue() {
    return this.value;
  }
}

export type NumberLike<T extends object> = number | ((obj: T) => number);
