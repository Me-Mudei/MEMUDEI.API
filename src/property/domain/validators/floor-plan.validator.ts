import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ClassValidatorFields } from '#shared/domain';
import { FloorPlanProps } from '../entities/floor-plan.entity';

export class FloorPlanRules {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  constructor(props: FloorPlanProps) {
    Object.assign(this, props);
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
