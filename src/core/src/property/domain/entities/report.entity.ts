import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '../../../shared/domain';
import ReportValidatorFactory from '../validators/report.validator';

export type ReportProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class Report extends Entity<ReportProps> {
  constructor(props: ReportProps) {
    Report.validate(props);
    super(props);
  }

  static validate(props: ReportProps) {
    const validator = ReportValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
