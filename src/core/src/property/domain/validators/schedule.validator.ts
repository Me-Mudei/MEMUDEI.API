import { IsDate, IsOptional } from 'class-validator';
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields';
import { ScheduleProps } from '../entities/schedule.entity';

export class ScheduleRules {
  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ created_at }: ScheduleProps) {
    Object.assign(this, { created_at });
  }
}

export class ScheduleValidator extends ClassValidatorFields<ScheduleRules> {
  validate(data: ScheduleProps): boolean {
    return super.validate(new ScheduleRules(data ?? ({} as any)));
  }
}

export default class ScheduleValidatorFactory {
  static create() {
    return new ScheduleValidator();
  }
}
