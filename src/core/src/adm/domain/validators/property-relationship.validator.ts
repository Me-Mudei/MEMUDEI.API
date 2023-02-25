import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ClassValidatorFields } from '#shared/domain';
import { PropertyRelationshipProps } from '../entities/property-relationship.entity';

export class PropertyRelationshipRules {
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

  constructor(props: PropertyRelationshipProps) {
    Object.assign(this, props);
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
