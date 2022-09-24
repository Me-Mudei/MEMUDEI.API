import { nanoid } from "nanoid";
import ValueObject from "./value-object";

export class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || nanoid());
  }
}
