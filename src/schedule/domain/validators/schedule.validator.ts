import { ClassValidatorFields } from "#shared/domain";
import { IsDate, IsOptional } from "class-validator";

import { ScheduleProps } from "../entities/schedule.entity";

export class ScheduleRules {
  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor(props: ScheduleProps) {
    Object.assign(this, props);
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
