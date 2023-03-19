import { nanoid } from 'nanoid';
import { ValueObject } from './value-object';
import { InvalidNanoidError } from '../errors';

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
