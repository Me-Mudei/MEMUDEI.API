import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import ChargeValidatorFactory from '../validators/charge.validator';

export type ChargeProps = {
  id?: UniqueEntityId;
  key: string;
  amount: number;
  created_at?: Date;
  updated_at?: Date;
};

export class Charge extends Entity<ChargeProps> {
  private _key: string;
  private _amount: number;

  constructor(props: ChargeProps) {
    Charge.validate(props);
    super(props);
    this._key = props.key;
    this._amount = props.amount;
  }

  static validate(props: ChargeProps) {
    const validator = ChargeValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public get key(): string {
    return this._key;
  }

  public set key(_key: string) {
    this._key = _key;
  }

  public get amount(): number {
    return this._amount;
  }

  public set amount(_amount: number) {
    this._amount = _amount;
  }
}
