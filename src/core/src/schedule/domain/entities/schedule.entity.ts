import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '../../../shared/domain';
import ScheduleValidatorFactory from '../validators/schedule.validator';
import { Calendar, Property, User } from './';

export type ScheduleProps = {
  id?: UniqueEntityId;
  start: Date;
  end: Date;
  title: string;
  obs?: string;
  calendar: Calendar;
  property: Property;
  scheduler: User;
  created_at?: Date;
  updated_at?: Date;
};

export class Schedule extends Entity<ScheduleProps> {
  private _start: Date;
  private _end: Date;
  private _title: string;
  private _obs?: string;
  private _calendar: Calendar;
  private _property: Property;
  private _scheduler: User;

  constructor(props: ScheduleProps) {
    Schedule.validate(props);
    super(props);
    this._start = props.start;
    this._end = props.end;
    this._title = props.title;
    this._obs = props.obs;
    this._calendar = props.calendar;
    this._property = props.property;
    this._scheduler = props.scheduler;
  }

  static validate(props: ScheduleProps) {
    const validator = ScheduleValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public get start(): Date {
    return this._start;
  }

  public set start(_start: Date) {
    this._start = _start;
  }

  public get end(): Date {
    return this._end;
  }

  public set end(_end: Date) {
    this._end = _end;
  }

  public get title(): string {
    return this._title;
  }

  public set title(_title: string) {
    this._title = _title;
  }

  public get obs(): string {
    return this._obs;
  }

  public set obs(_obs: string) {
    this._obs = _obs;
  }

  public get calendar(): Calendar {
    return this._calendar;
  }

  public set calendar(_calendar: Calendar) {
    this._calendar = _calendar;
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
