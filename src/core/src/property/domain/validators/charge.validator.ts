import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ClassValidatorFields } from '#shared/domain';
import { ChargeProps } from '../entities/charge.entity';

export class ChargeRules {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  constructor(props: ChargeProps) {
    Object.assign(this, props);
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
