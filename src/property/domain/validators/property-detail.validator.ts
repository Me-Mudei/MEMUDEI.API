import { ClassValidatorFields } from "#shared/domain";
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";

import { PropertyDetailProps } from "../entities/property-detail.entity";

export class PropertyDetailRules {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsBoolean()
  @IsNotEmpty()
  available: boolean;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  constructor(props: PropertyDetailProps) {
    Object.assign(this, props);
  }
}

export class PropertyDetailValidator extends ClassValidatorFields<PropertyDetailRules> {
  validate(data: PropertyDetailProps): boolean {
    return super.validate(new PropertyDetailRules(data ?? ({} as any)));
  }
}

export default class PropertyDetailValidatorFactory {
  static create() {
    return new PropertyDetailValidator();
  }
}
