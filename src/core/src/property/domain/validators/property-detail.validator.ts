import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import ClassValidatorFields from '../../../shared/domain/validators/class-validator-fields';
import { PropertyDetailProps } from '../entities/property-detail.entity';

export class PropertyDetailRules {
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  available: boolean;

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
    available,
    description,
    created_at,
    updated_at,
  }: PropertyDetailProps) {
    Object.assign(this, {
      name,
      available,
      description,
      created_at,
      updated_at,
    });
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
