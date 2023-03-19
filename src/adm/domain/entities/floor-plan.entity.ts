import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import FloorPlanValidatorFactory from '../validators/floor-plan.validator';

export type FloorPlanProps = {
  id?: UniqueEntityId;
  key: string;
  name: string;
  unit?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class FloorPlan extends Entity<FloorPlanProps> {
  private _key: string;
  private _name: string;
  private _unit?: string;

  constructor(props: FloorPlanProps) {
    FloorPlan.validate(props);
    super(props);
    this._key = props.key;
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

  public get name(): string {
    return this._name;
  }

  public set name(_name: string) {
    this._name = _name;
  }

  public get unit(): string {
    return this._unit;
  }
  public set unit(_unit: string) {
    this._unit = _unit;
  }
}
