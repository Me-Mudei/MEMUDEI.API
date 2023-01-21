import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ClassValidatorFields } from '#shared/domain';
import { ChargeProps } from '../entities/charge.entity';

export class ChargeRules {
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  constructor({ name, amount, created_at, updated_at }: ChargeProps) {
    Object.assign(this, {
      name,
      amount,
      created_at,
      updated_at,
    });
  }
}

export class ChargeValidator extends ClassValidatorFields<ChargeRules> {
  validate(data: ChargeProps): boolean {
    return super.validate(new ChargeRules(data ?? ({} as any)));
  }
}

export default class ChargeValidatorFactory {
  static create() {
    return new ChargeValidator();
  }
}
