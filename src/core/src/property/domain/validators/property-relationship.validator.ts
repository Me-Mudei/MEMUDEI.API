import { IsDate, IsOptional } from 'class-validator';
import { ClassValidatorFields } from '#shared/domain/validators/class-validator-fields';
import { PropertyRelationshipProps } from '../entities/property-relationship.entity';

export class PropertyRelationshipRules {
  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ created_at }: PropertyRelationshipProps) {
    Object.assign(this, { created_at });
  }
}

export class PropertyRelationshipValidator extends ClassValidatorFields<PropertyRelationshipRules> {
  validate(data: PropertyRelationshipProps): boolean {
    return super.validate(new PropertyRelationshipRules(data ?? ({} as any)));
  }
}

export default class PropertyRelationshipValidatorFactory {
  static create() {
    return new PropertyRelationshipValidator();
  }
}
