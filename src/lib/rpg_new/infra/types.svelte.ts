import type { Species } from "./species/species.svelte";

export class NumberField<T extends Species = any> {
  private value = $state(0);

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

export type NumberLike<T extends Species> = number | ((obj: T) => number);
