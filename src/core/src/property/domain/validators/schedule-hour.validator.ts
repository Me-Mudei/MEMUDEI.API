import { IsDate, IsOptional } from 'class-validator';
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields';
import { ScheduleHourProps } from '../entities/schedule-hour.entity';

export class ScheduleHourRules {
  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ created_at }: ScheduleHourProps) {
    Object.assign(this, { created_at });
  }
}

export class ScheduleHourValidator extends ClassValidatorFields<ScheduleHourRules> {
  validate(data: ScheduleHourProps): boolean {
    return super.validate(new ScheduleHourRules(data ?? ({} as any)));
  }
}

export default class ScheduleHourValidatorFactory {
  static create() {
    return new ScheduleHourValidator();
  }
}
