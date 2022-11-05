import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields';
import { ScheduleProps } from '../entities/schedule.entity';
import { UserRules, PropertyRules, CalendarRules } from './';

export class ScheduleRules {
  @IsDate()
  @IsNotEmpty()
  start: Date;

  @IsString()
  @IsOptional()
  obs: string;

  @IsEnum(['pending', 'approved', 'rejected'])
  @IsOptional()
  status: string;

  @ValidateNested()
  @IsOptional()
  calendar?: CalendarRules;

  @ValidateNested()
  property: PropertyRules;

  @ValidateNested()
  scheduler: UserRules;

  constructor({ created_at, start }: ScheduleProps) {
    Object.assign(this, { created_at, start });
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
