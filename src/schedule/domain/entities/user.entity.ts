import {
  Entity,
  EntityValidationError,
  NotFoundError,
  UniqueEntityId,
} from '#shared/domain';
import UserValidatorFactory from '../validators/user.validator';
import { Calendar } from './';

export type UserProps = {
  id?: UniqueEntityId;
  calendars?: Calendar[];
  created_at?: Date;
  updated_at?: Date;
};

export class User extends Entity<UserProps> {
  private _calendars?: Calendar[];
  constructor(props: UserProps) {
    User.validate(props);
    super(props);
    this._calendars = props.calendars;
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public findCalendarIsActive(): Calendar {
    if (this.calendars.length === 0) {
      throw new NotFoundError('Calendar not found');
    }
    const calendar = this.calendars.find(
      (calendar) => calendar.is_active === true,
    );
    if (!calendar) {
      throw new NotFoundError('Calendar not found');
    }
    return calendar;
  }

  get calendars(): Calendar[] | undefined {
    return this._calendars;
  }
}
