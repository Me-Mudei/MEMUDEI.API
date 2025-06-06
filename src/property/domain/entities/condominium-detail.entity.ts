import { Entity, EntityValidationError, UniqueEntityId } from "#shared/domain";

import CondominiumDetailValidatorFactory from "../validators/condominium-detail.validator";

export type CondominiumDetailProps = {
  id?: UniqueEntityId;
  key: string;
  available: boolean;
  name?: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class CondominiumDetail extends Entity<CondominiumDetailProps> {
  private _key: string;
  private _available: boolean;
  private _name?: string;
  private _description?: string;

  constructor(props: CondominiumDetailProps) {
    CondominiumDetail.validate(props);
    super(props);
    this._key = props.key;
    this._available = props.available;
    this._name = props.name;
    this._description = props.description;
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

  public get name(): string | undefined {
    return this._name;
  }

  public set name(_name: string | undefined) {
    this._name = _name;
  }

  public get description(): string | undefined {
    return this._description;
  }

  public set description(_description: string | undefined) {
    this._description = _description;
  }
}
