export abstract class ValueObject<Value = any> {
  protected _value: Value;

  constructor(value: Value) {
    this._value = value;
  }
  get value(): Value {
    return this._value;
  }

  toString = (): string => {
    if (typeof this._value !== "object" || this._value === null) {
      try {
        return this.value.toString();
      } catch (error) {
        return this.value + "";
      }
    }
    const valueStr = this.value.toString();
    return valueStr === "[object Object]"
      ? JSON.stringify(this.value)
      : valueStr;
  };
}
