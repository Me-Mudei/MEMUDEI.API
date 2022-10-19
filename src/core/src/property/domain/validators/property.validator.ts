import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import ClassValidatorFields from '../../../shared/domain/validators/class-validator-fields';
import { PropertyProps } from '../entities/property.entity';

export class PropertyRules {
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(500)
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ title, description, created_at }: PropertyProps) {
    Object.assign(this, { title, description, created_at });
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
