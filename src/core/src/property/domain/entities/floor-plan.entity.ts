import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import FloorPlanValidatorFactory from '../validators/floor-plan.validator';

export type FloorPlanProps = {
  id?: UniqueEntityId;
  key: string;
  value: number;
  created_at?: Date;
  updated_at?: Date;
};

export class FloorPlan extends Entity<FloorPlanProps> {
  private _key: string;
  private _value: number;

  constructor(props: FloorPlanProps) {
    FloorPlan.validate(props);
    super(props);
    this._key = props.key;
    this._value = props.value;
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
}
