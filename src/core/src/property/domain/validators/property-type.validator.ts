import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ClassValidatorFields } from '#shared/domain/validators/class-validator-fields';
import { PropertyTypeProps } from '../entities/property-type.entity';

export class PropertyTypeRules {
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

  constructor({
    name,
    description,
    created_at,
    updated_at,
  }: PropertyTypeProps) {
    Object.assign(this, {
      name,
      description,
      created_at,
      updated_at,
    });
  }
}

export class PropertyTypeValidator extends ClassValidatorFields<PropertyTypeRules> {
  validate(data: PropertyTypeProps): boolean {
    return super.validate(new PropertyTypeRules(data ?? ({} as any)));
  }
}

export default class PropertyTypeValidatorFactory {
  static create() {
    return new PropertyTypeValidator();
  }
}
