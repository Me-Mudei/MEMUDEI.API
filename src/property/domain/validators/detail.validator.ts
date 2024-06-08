import { ClassValidatorFields } from "#shared/domain";
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import { DetailProps, DetailType } from "../entities/detail.entity";

export class DetailRules {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  //@IsEnum(DetailType)
  type: DetailType;

  @IsBoolean()
  @IsOptional()
  available: boolean;

  @IsNumber()
  @IsOptional()
  value: number;

  @IsString()
  @IsOptional()
  unit: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  constructor(props: DetailProps) {
    Object.assign(this, props);
  }
}

export class DetailValidator extends ClassValidatorFields<DetailRules> {
  validate(data: DetailProps): boolean {
    return super.validate(new DetailRules(data ?? ({} as any)));
  }
}

export default class DetailValidatorFactory {
  static create() {
    return new DetailValidator();
  }
}
