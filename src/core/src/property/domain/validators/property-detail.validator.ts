import { IsBoolean, IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { ClassValidatorFields } from '#shared/domain';
import { PropertyDetailProps } from '../entities/property-detail.entity';

export class PropertyDetailRules {
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
