import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '../../../shared/domain';
import ScheduleHourValidatorFactory from '../validators/schedule-hour.validator';

export type ScheduleHourProps = {
  id?: UniqueEntityId;
  hour: number;
  created_at?: Date;
  updated_at?: Date;
};

export class ScheduleHour extends Entity<ScheduleHourProps> {
  constructor(props: ScheduleHourProps) {
    ScheduleHour.validate(props);
    super(props);
  }

  static validate(props: ScheduleHourProps) {
    const validator = ScheduleHourValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
