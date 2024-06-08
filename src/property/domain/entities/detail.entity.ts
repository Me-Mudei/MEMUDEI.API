import { Entity, EntityValidationError, UniqueEntityId } from "#shared/domain";

import DetailValidatorFactory from "../validators/detail.validator";

export enum DetailType {
  CONDOMINIUM = "condominium",
  FLOOR_PLAN = "floor_plan",
  PROPERTY = "property",
  CHARGE = "charge",
  RULE = "rule",
}

export type DetailProps = {
  id?: UniqueEntityId;
  key: string;
  type: string;
  available?: boolean;
  value?: number;
  unit?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Detail extends Entity<DetailProps> {
  private _key: string;
  private _type: string;
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

  public get key(): string {
    return this._key;
  }

  public get type(): string {
    return this._type;
  }

  public get available(): boolean {
    return this._available ?? false;
  }

  public get value(): number | undefined {
    return this._value;
  }

  public get unit(): string | undefined {
    return this._unit;
  }
}
