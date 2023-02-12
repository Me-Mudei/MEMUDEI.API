import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import FloorPlanValidatorFactory from '../validators/floor-plan.validator';

export type FloorPlanProps = {
  id?: UniqueEntityId;
  value: number;
  created_at?: Date;
  updated_at?: Date;
};

export class FloorPlan extends Entity<FloorPlanProps> {
  private _value: number;

  constructor(props: FloorPlanProps) {
    FloorPlan.validate(props);
    super(props);
    this._value = props.value;
  }

  static validate(props: FloorPlanProps) {
    const validator = FloorPlanValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public get value(): number {
    return this._value;
  }

  public set value(_value: number) {
    this._value = _value;
  }
}
