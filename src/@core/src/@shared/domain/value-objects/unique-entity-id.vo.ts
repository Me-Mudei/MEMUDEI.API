import { nanoid } from "nanoid";
import ValueObject from "./value-object";

export default class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || nanoid());
  }
}
