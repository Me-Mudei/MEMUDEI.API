import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ClassValidatorFields } from '#shared/domain';
import { CondominiumDetailProps } from '../entities/condominium-detail.entity';

export class CondominiumDetailRules {
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

  constructor(props: CondominiumDetailProps) {
    Object.assign(this, props);
  }
}

export class CondominiumDetailValidator extends ClassValidatorFields<CondominiumDetailRules> {
  validate(data: CondominiumDetailProps): boolean {
    return super.validate(new CondominiumDetailRules(data ?? ({} as any)));
  }
}

export default class CondominiumDetailValidatorFactory {
  static create() {
    return new CondominiumDetailValidator();
  }
}
