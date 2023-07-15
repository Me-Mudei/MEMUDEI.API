import { Entity, EntityValidationError, UniqueEntityId } from "#shared/domain";

import FloorPlanValidatorFactory from "../validators/floor-plan.validator";

export type FloorPlanProps = {
  id?: UniqueEntityId;
  key: string;
  value: number;
  name?: string;
  unit?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class FloorPlan extends Entity<FloorPlanProps> {
  private _key: string;
  private _value: number;
  private _name?: string;
  private _unit?: string;

  constructor(props: FloorPlanProps) {
    FloorPlan.validate(props);
    super(props);
    this._key = props.key;
    this._value = props.value;
    this._name = props.name;
    this._unit = props.unit;
  }

  static validate(props: FloorPlanProps) {
    const validator = FloorPlanValidatorFactory.create();
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

  public get value(): number {
    return this._value;
  }

  public set value(_value: number) {
    this._value = _value;
  }

  public get name(): string | undefined {
    return this._name;
  }

  public set name(_name: string | undefined) {
    this._name = _name;
  }

  public get unit(): string | undefined {
    return this._unit;
  }

  public set unit(_unit: string | undefined) {
    this._unit = _unit;
  }
}
