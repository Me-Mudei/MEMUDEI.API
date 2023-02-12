import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import CondominiumDetailValidatorFactory from '../validators/condominium-detail.validator';

export type CondominiumDetailProps = {
  id?: UniqueEntityId;
  available: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export class CondominiumDetail extends Entity<CondominiumDetailProps> {
  private _available: boolean;

  constructor(props: CondominiumDetailProps) {
    CondominiumDetail.validate(props);
    super(props);
    this._available = props.available;
  }

  static validate(props: CondominiumDetailProps) {
    const validator = CondominiumDetailValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public get available(): boolean {
    return this._available;
  }

  public set available(_available: boolean) {
    this._available = _available;
  }
}
