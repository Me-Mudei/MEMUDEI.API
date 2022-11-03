import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '../../../shared/domain';
import CalendarValidatorFactory from '../validators/calendar.validator';

export type CalendarProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class Calendar extends Entity<CalendarProps> {
  constructor(props: CalendarProps) {
    Calendar.validate(props);
    super(props);
  }

  static validate(props: CalendarProps) {
    const validator = CalendarValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
