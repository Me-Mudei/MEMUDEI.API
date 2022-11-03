import { IsDate, IsOptional } from 'class-validator';
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields';
import { PropertyProps } from '../entities/property.entity';

export class PropertyRules {
  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ created_at }: PropertyProps) {
    Object.assign(this, { created_at });
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
