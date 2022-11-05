import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '../../../shared/domain';
import HourValidatorFactory from '../validators/hour.validator';

export type HourProps = {
  id?: UniqueEntityId;
  value: number;
  created_at?: Date;
  updated_at?: Date;
};

export class Hour extends Entity<HourProps> {
  private _value: number;
  constructor(props: HourProps) {
    Hour.validate(props);
    super(props);
    this._value = props.value;
  }

  static validate(props: HourProps) {
    const validator = HourValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public availableHour(start: Date) {
    return this.toNumber(start) === this.value;
  }

  private toNumber(date: Date): number {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours * 60 + minutes;
  }

  public get value(): number {
    return this._value;
  }

  public set value(_value: number) {
    this._value = _value;
  }
}
