import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '../../../shared/domain';
import FloorPlanValidatorFactory from '../validators/floor-plan.validator';

export type FloorPlanProps = {
  id?: UniqueEntityId;
  name: string;
  quantity: number;
  unit?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class FloorPlan extends Entity<FloorPlanProps> {
  private _name: string;
  private _quantity: number;
  private _unit?: string;

  constructor(props: FloorPlanProps) {
    FloorPlan.validate(props);
    super(props);
    this._name = props.name;
    this._quantity = props.quantity;
    this._unit = props.unit;
  }

  static validate(props: FloorPlanProps) {
    const validator = FloorPlanValidatorFactory.create();
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

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(_quantity: number) {
    this._quantity = _quantity;
  }

  public get unit(): string {
    return this._unit;
  }
  public set unit(_unit: string) {
    this._unit = _unit;
  }
}
