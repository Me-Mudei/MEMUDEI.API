import { Entity, EntityValidationError, UniqueEntityId } from "#shared/domain";

import DetailValidatorFactory from "../validators/detail.validator";

export enum DetailType {
  CONDOMINIUM = "CONDOMINIUM",
  FLOOR_PLAN = "FLOOR_PLAN",
  PROPERTY = "PROPERTY",
  CHARGE = "CHARGE",
  RULE = "RULE",
}

export type DetailProps = {
  id?: UniqueEntityId;
  key: string;
  type: DetailType;
  available?: boolean;
  value?: number;
  unit?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Detail extends Entity<DetailProps> {
  private _key: string;
  private _type: DetailType;
  private _available?: boolean;
  private _value?: number;
  private _unit?: string;

  constructor(props: DetailProps) {
    Detail.validate(props);
    super(props);
    this._key = props.key;
    this._type = props.type;
    this._available = props.available;
    this._value = props.value;
    this._unit = props.unit;
  }

  static validate(props: DetailProps) {
    const validator = DetailValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public get key() {
    return this._key;
  }

  public get type() {
    return this._type;
  }

  public get available() {
    return this._available ?? false;
  }

  public get value() {
    return this._value;
  }

  public get unit() {
    return this._unit;
  }
}
