import { ClassValidatorFields } from "#shared/domain";
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

import { MerchantProps } from "../entities/merchant.entity";

export class MerchantRules {
  @MaxLength(200)
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @MaxLength(2000)
  @IsString()
  @IsNotEmpty()
  organization_id: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  constructor({
    company_name,
    organization_id,
    created_at,
    updated_at,
  }: MerchantProps) {
    Object.assign(this, {
      company_name,
      organization_id,
      created_at,
      updated_at,
    });
  }
}

export class MerchantValidator extends ClassValidatorFields<MerchantRules> {
  validate(data: MerchantProps): boolean {
    return super.validate(new MerchantRules(data ?? ({} as any)));
  }
}

export default class MerchantValidatorFactory {
  static create() {
    return new MerchantValidator();
  }
}
