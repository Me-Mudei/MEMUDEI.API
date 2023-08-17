import { Entity, EntityValidationError, UniqueEntityId } from "#shared/domain";

import ScheduleValidatorFactory from "../validators/schedule.validator";

import { User } from "./";

export type ScheduleStatus = "pending" | "approved" | "rejected";

export type ScheduleProps = {
  id?: UniqueEntityId;
  property_id: UniqueEntityId;
  date_time: Date;
  note?: string;
  status?: ScheduleStatus;
  visitor?: User;
  created_at?: Date;
  updated_at?: Date;
};

export class Schedule extends Entity<ScheduleProps> {
  private _property_id?: UniqueEntityId;
  private _date_time: Date;
  private _note?: string;
  private _status: ScheduleStatus;
  private _visitor?: User;

  constructor(props: ScheduleProps) {
    Schedule.validate(props);
    super(props);
    this._date_time = props.date_time;
    this._note = props.note;
    this._status = props.status || "pending";
    this._property_id = props.property_id;
    this._visitor = props.visitor;
  }

  static validate(props: ScheduleProps) {
    const validator = ScheduleValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public get date_time(): Date {
    return this._date_time;
  }

  public get note(): string {
    return this._note;
  }

  public get status(): ScheduleStatus {
    return this._status;
  }

  public get property_id(): string {
    return this._property_id.value;
  }

  public get visitor(): User {
    return this._visitor;
  }

  public set visitor(_visitor: User) {
    this._visitor = _visitor;
  }
}
