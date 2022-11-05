import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '../../../shared/domain';
import WeekdayValidatorFactory from '../validators/weekday.validator';
import { Hour } from './hour.entity';

export type WeekdayProps = {
  id?: UniqueEntityId;
  day: number;
  hours?: Hour[];
  created_at?: Date;
  updated_at?: Date;
};

export class Weekday extends Entity<WeekdayProps> {
  private _day: number;
  private _hours: Hour[];
  constructor(props: WeekdayProps) {
    Weekday.validate(props);
    super(props);
    this._day = props.day;
    this._hours = props.hours || [];
  }

  static validate(props: WeekdayProps) {
    const validator = WeekdayValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public availableWeekday(date: Date) {
    if (this.day === date.getDay() && this.hours.length > 0) {
      return this.hours.map((hour) => hour.availableHour(date)).includes(true);
    }
    return false;
  }

  public get day(): number {
    return this._day;
  }

  public set day(_day: number) {
    this._day = _day;
  }

  public get hours(): Hour[] {
    return this._hours;
  }

  public set hours(_hours: Hour[]) {
    this._hours = _hours;
  }
}
