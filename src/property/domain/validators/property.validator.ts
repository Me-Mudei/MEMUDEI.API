import { ClassValidatorFields } from "#shared/domain";
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

import {
  PropertyProps,
  PropertyStatus,
  PropertyType,
} from "../entities/property.entity";

export class PropertyRules {
  @MaxLength(200)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(2000)
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  //@IsEnum(PropertyType)
  property_type: PropertyType;

  @IsOptional()
  //@IsEnum(PropertyStatus)
  status?: PropertyStatus;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  constructor({
    title,
    description,
    property_type,
    status,
    created_at,
    updated_at,
  }: PropertyProps) {
    Object.assign(this, {
      title,
      description,
      property_type,
      status,
      created_at,
      updated_at,
    });
  }
}

export class PropertyValidator extends ClassValidatorFields<PropertyRules> {
  validate(data: PropertyProps): boolean {
    return super.validate(new PropertyRules(data ?? ({} as any)));
  }
}

export default class PropertyValidatorFactory {
  static create() {
    return new PropertyValidator();
  }
}
