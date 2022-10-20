import { IsDate, IsOptional } from 'class-validator';
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields';
import { ReportProps } from '../entities/report.entity';

export class ReportRules {
  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ created_at }: ReportProps) {
    Object.assign(this, { created_at });
  }
}

export class ReportValidator extends ClassValidatorFields<ReportRules> {
  validate(data: ReportProps): boolean {
    return super.validate(new ReportRules(data ?? ({} as any)));
  }
}

export default class ReportValidatorFactory {
  static create() {
    return new ReportValidator();
  }
}
