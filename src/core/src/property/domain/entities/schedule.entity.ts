import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '../../../shared/domain';
import ScheduleValidatorFactory from '../validators/schedule.validator';
import { ScheduleHour } from './schedule-hour.entity';

export type ScheduleProps = {
  id?: UniqueEntityId;
  weekday: number;
  hours: ScheduleHour[];
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
