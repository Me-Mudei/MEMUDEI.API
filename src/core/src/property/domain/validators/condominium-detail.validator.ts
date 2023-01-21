import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ClassValidatorFields } from '#shared/domain';
import { CondominiumDetailProps } from '../entities/condominium-detail.entity';

export class CondominiumDetailRules {
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
  }: CondominiumDetailProps) {
    Object.assign(this, {
      name,
      available,
      description,
      created_at,
      updated_at,
    });
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
