import { ClassValidatorFields } from "#shared/domain";
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength
} from "class-validator";

import { RuleProps } from "../entities/rule.entity";

export class RuleRules {
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  key: string;

  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  description: string;

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
