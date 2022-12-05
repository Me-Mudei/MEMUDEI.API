import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ClassValidatorFields } from '#shared/domain/validators/class-validator-fields';
import { FloorPlanProps } from '../entities/floor-plan.entity';

export class FloorPlanRules {
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @MaxLength(5)
  @IsString()
  @IsOptional()
  unit?: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  constructor({
    name,
    quantity,
    unit,
    created_at,
    updated_at,
  }: FloorPlanProps) {
    Object.assign(this, { name, quantity, unit, created_at, updated_at });
  }
}

export class FloorPlanValidator extends ClassValidatorFields<FloorPlanRules> {
  validate(data: FloorPlanProps): boolean {
    return super.validate(new FloorPlanRules(data ?? ({} as any)));
  }
}

export default class FloorPlanValidatorFactory {
  static create() {
    return new FloorPlanValidator();
  }
}
