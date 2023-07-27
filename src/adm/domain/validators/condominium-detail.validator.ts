import { ClassValidatorFields } from "#shared/domain";
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength
} from "class-validator";

import { CondominiumDetailProps } from "../entities/condominium-detail.entity";

export class CondominiumDetailRules {
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

  constructor(props: CondominiumDetailProps) {
    Object.assign(this, props);
  }
}

export class CondominiumDetailValidator extends ClassValidatorFields<CondominiumDetailRules> {
  validate(data: CondominiumDetailProps): boolean {
    return super.validate(new CondominiumDetailRules(data ?? ({} as any)));
  }
}

export default class CondominiumDetailValidatorFactory {
  static create() {
    return new CondominiumDetailValidator();
  }
}
