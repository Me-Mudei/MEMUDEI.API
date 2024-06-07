import { ClassValidatorFields } from "#shared/domain";
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

import { ChargeProps } from "../entities/charge.entity";

export class ChargeRules {
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

  constructor(props: ChargeProps) {
    Object.assign(this, props);
  }
}

export class ChargeValidator extends ClassValidatorFields<ChargeRules> {
  validate(data: ChargeProps): boolean {
    return super.validate(new ChargeRules(data ?? ({} as any)));
  }
}

export default class ChargeValidatorFactory {
  static create() {
    return new ChargeValidator();
  }
}
