import { IsDate, IsOptional } from 'class-validator';
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields';
import { HourProps } from '../entities/hour.entity';

export class HourRules {
  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ created_at }: HourProps) {
    Object.assign(this, { created_at });
  }
}

export class HourValidator extends ClassValidatorFields<HourRules> {
  validate(data: HourProps): boolean {
    return super.validate(new HourRules(data ?? ({} as any)));
  }
}

export default class HourValidatorFactory {
  static create() {
    return new HourValidator();
  }
}
