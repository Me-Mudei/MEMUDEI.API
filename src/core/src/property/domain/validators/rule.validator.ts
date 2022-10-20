import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields';
import { RuleProps } from '../entities/rule.entity';

export class RuleRules {
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  allowed: boolean;

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
    allowed,
    description,
    created_at,
    updated_at,
  }: RuleProps) {
    Object.assign(this, {
      name,
      allowed,
      description,
      created_at,
      updated_at,
    });
  }
}

export class RuleValidator extends ClassValidatorFields<RuleRules> {
  validate(data: RuleProps): boolean {
    return super.validate(new RuleRules(data ?? ({} as any)));
  }
}

export default class RuleValidatorFactory {
  static create() {
    return new RuleValidator();
  }
}
