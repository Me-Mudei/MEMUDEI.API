import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '../../../shared/domain';
import ScheduleValidatorFactory from '../validators/schedule.validator';

export type ScheduleProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class Schedule extends Entity<ScheduleProps> {
  constructor(props: ScheduleProps) {
    Schedule.validate(props);
    super(props);
  }

  static validate(props: ScheduleProps) {
    const validator = ScheduleValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
