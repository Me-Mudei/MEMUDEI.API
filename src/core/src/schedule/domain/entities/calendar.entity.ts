import { Schedule, Weekday, User } from './';
import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '../../../shared/domain';
import CalendarValidatorFactory from '../validators/calendar.validator';

export type CalendarProps = {
  id?: UniqueEntityId;
  is_active?: boolean;
  weekdays?: Weekday[];
  schedule_duration?: number;
  events?: Schedule[];
  expired_at?: Date;
  deleted_at?: Date;
  created_at?: Date;
  updated_at?: Date;
};

export class Calendar extends Entity<CalendarProps> {
  private VALIDITY_PERIOD = 30;
  private _is_active: boolean;
  private _expired_at: Date;
  private _weekdays: Weekday[];
  private _events?: Schedule[];
  private _schedule_duration: number;

  constructor(props: CalendarProps) {
    Calendar.validate(props);
    super(props);
    this._is_active = props.is_active || false;
    this._expired_at =
      props.expired_at ||
      new Date(new Date().setDate(new Date().getDate() + this.VALIDITY_PERIOD));
    this._weekdays = props.weekdays || [];
    this._events = props.events || [];
    this._schedule_duration = props.schedule_duration || 30;
  }

  static validate(props: CalendarProps) {
    const validator = CalendarValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public availableToSchedule(schedule: Schedule): boolean {
    if (schedule.start > this.expired_at || this.weekdays.length <= 0) {
      return false;
    }
    return this.weekdays
      .map((weekday) => {
        if (weekday.availableWeekday(schedule.start)) {
          if (this.events.length === 0) {
            return true;
          }
          return this.events
            .map((event) =>
              event.overlapSchedule(schedule, this.schedule_duration),
            )
            .includes(false);
        }
        return false;
      })
      .includes(true);
  }

  public get is_active(): boolean {
    return this._is_active;
  }

  public set is_active(_is_active: boolean) {
    this._is_active = _is_active;
  }

  public get expired_at(): Date {
    return this._expired_at;
  }

  public set expired_at(_expired_at: Date) {
    this._expired_at = _expired_at;
  }

  public get weekdays(): Weekday[] {
    return this._weekdays;
  }

  public set weekdays(_weekdays: Weekday[]) {
    this._weekdays = _weekdays;
  }

  public get events(): Schedule[] {
    return this._events;
  }

  public addEvent(_event: Schedule) {
    this._events.push(_event);
  }

  public get schedule_duration(): number {
    return this._schedule_duration;
  }

  public set schedule_duration(_schedule_duration: number) {
    this._schedule_duration = _schedule_duration;
  }
}
