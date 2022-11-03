import { IsDate, IsOptional } from 'class-validator';
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields';
import { CalendarProps } from '../entities/calendar.entity';

export class CalendarRules {
  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ created_at }: CalendarProps) {
    Object.assign(this, { created_at });
  }
}

export class CalendarValidator extends ClassValidatorFields<CalendarRules> {
  validate(data: CalendarProps): boolean {
    return super.validate(new CalendarRules(data ?? ({} as any)));
  }
}

export default class CalendarValidatorFactory {
  static create() {
    return new CalendarValidator();
  }
}
