import { ClassValidatorFields } from "#shared/domain";
import { IsDate, IsOptional } from "class-validator";

import { WeekdayProps } from "../entities/weekday.entity";

export class WeekdayRules {
  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ created_at }: WeekdayProps) {
    Object.assign(this, { created_at });
  }
}

export class WeekdayValidator extends ClassValidatorFields<WeekdayRules> {
  validate(data: WeekdayProps): boolean {
    return super.validate(new WeekdayRules(data ?? ({} as any)));
  }
}

export default class WeekdayValidatorFactory {
  static create() {
    return new WeekdayValidator();
  }
}
