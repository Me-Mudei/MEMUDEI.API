import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '../../../shared/domain';
import { OverlapScheduleError } from '../errors/overlap-schedule.error';
import ScheduleValidatorFactory from '../validators/schedule.validator';
import { Calendar, Property, User } from './';

export type ScheduleStatus = 'pending' | 'approved' | 'rejected';

export type ScheduleProps = {
  id?: UniqueEntityId;
  start: Date;
  calendar?: Calendar;
  obs?: string;
  status?: ScheduleStatus;
  property: Property;
  scheduler: User;
  created_at?: Date;
  updated_at?: Date;
};

export class Schedule extends Entity<ScheduleProps> {
  private _start: Date;
  private _calendar?: Calendar;
  private _obs?: string;
  private _status: ScheduleStatus;
  private _property: Property;
  private _scheduler: User;

  constructor(props: ScheduleProps) {
    Schedule.validate(props);
    super(props);
    this._start = props.start;
    this._calendar = props.calendar;
    this._obs = props.obs;
    this._status = props.status || 'pending';
    this._property = props.property;
    this._scheduler = props.scheduler;
    this.overlapOnCalendar(this._calendar);
  }

  static validate(props: ScheduleProps) {
    const validator = ScheduleValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public overlapOnCalendar(calendar?: Calendar): void {
    if (calendar && !calendar.available(this)) {
      throw new OverlapScheduleError('Calendar is not available');
    }
    return;
  }

  public overlapSchedule(other: Schedule, durationInMinutes: number): boolean {
    const startInMinutes = this.dateToTimeInMinutes(this.start);
    const endInMinutes = startInMinutes + durationInMinutes;
    const otherStartInMinutes = this.dateToTimeInMinutes(other.start);
    const otherEndInMinutes = otherStartInMinutes + durationInMinutes;

    return (
      (otherStartInMinutes >= startInMinutes &&
        otherStartInMinutes <= endInMinutes) ||
      (otherStartInMinutes < startInMinutes &&
        otherEndInMinutes > startInMinutes)
    );
  }

  public dateToTimeInMinutes(date: Date): number {
    return date.getHours() * 60 + date.getMinutes();
  }

  public get start(): Date {
    return this._start;
  }

  public set start(_start: Date) {
    this._start = _start;
  }

  public get calendar(): Calendar {
    return this._calendar;
  }

  public set calendar(_calendar: Calendar) {
    this._calendar = _calendar;
  }

  public get obs(): string {
    return this._obs;
  }

  public set obs(_obs: string) {
    this._obs = _obs;
  }

  public get status(): ScheduleStatus {
    return this._status;
  }

  public set status(_status: ScheduleStatus) {
    this._status = _status;
  }

  public get property(): Property {
    return this._property;
  }

  public set property(_property: Property) {
    this._property = _property;
  }

  public get scheduler(): User {
    return this._scheduler;
  }

  public set scheduler(_scheduler: User) {
    this._scheduler = _scheduler;
  }
}
