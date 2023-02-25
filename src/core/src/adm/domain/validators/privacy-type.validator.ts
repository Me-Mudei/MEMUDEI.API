import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ClassValidatorFields } from '#shared/domain';
import { PrivacyTypeProps } from '../entities/privacy-type.entity';

export class PrivacyTypeRules {
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

  constructor(props: PrivacyTypeProps) {
    Object.assign(this, props);
  }
}

export class PrivacyTypeValidator extends ClassValidatorFields<PrivacyTypeRules> {
  validate(data: PrivacyTypeProps): boolean {
    return super.validate(new PrivacyTypeRules(data ?? ({} as any)));
  }
}

export default class PrivacyTypeValidatorFactory {
  static create() {
    return new PrivacyTypeValidator();
  }
}
