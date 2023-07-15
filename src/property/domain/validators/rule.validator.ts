import { ClassValidatorFields } from "#shared/domain";
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";

import { RuleProps } from "../entities/rule.entity";

export class RuleRules {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  allowed: boolean;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  constructor(props: RuleProps) {
    Object.assign(this, props);
  }
}

export class RuleValidator extends ClassValidatorFields<RuleRules> {
  validate(data: RuleProps): boolean {
    return super.validate(new RuleRules(data ?? ({} as any)));
  }
}

export default class RuleValidatorFactory {
  static create() {
    return new RuleValidator();
  }
}
