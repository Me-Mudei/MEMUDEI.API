import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import CondominiumDetailValidatorFactory from '../validators/condominium-detail.validator';

export type CondominiumDetailProps = {
  id?: UniqueEntityId;
  key: string;
  available: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export class CondominiumDetail extends Entity<CondominiumDetailProps> {
  private _key: string;
  private _available: boolean;

  constructor(props: CondominiumDetailProps) {
    CondominiumDetail.validate(props);
    super(props);
    this._key = props.key;
    this._available = props.available;
  }

  static validate(props: CondominiumDetailProps) {
    const validator = CondominiumDetailValidatorFactory.create();
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

  public get available(): boolean {
    return this._available;
  }

  public set available(_available: boolean) {
    this._available = _available;
  }
}
