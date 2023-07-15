import { nanoid } from "nanoid";

import { InvalidNanoidError } from "../errors";

import { ValueObject } from "./value-object";

export class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || nanoid());
    this.validate();
  }
  private validate() {
    const isValid = this.value.length === 21;
    if (!isValid) {
      throw new InvalidNanoidError();
    }
  }
}
