import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import ChargeValidatorFactory from '../validators/charge.validator';

export type ChargeProps = {
  id?: UniqueEntityId;
  name: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Charge extends Entity<ChargeProps> {
  private _name: string;

  constructor(props: ChargeProps) {
    Charge.validate(props);
    super(props);
    this._name = props.name;
  }

  static validate(props: ChargeProps) {
    const validator = ChargeValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public get name(): string {
    return this._name;
  }

  public set name(_name: string) {
    this._name = _name;
  }
}
