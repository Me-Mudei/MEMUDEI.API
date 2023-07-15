import { ClassValidatorFields } from "#shared/domain";
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength
} from "class-validator";

import { FloorPlanProps } from "../entities/floor-plan.entity";

export class FloorPlanRules {
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  key: string;

  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  name: string;

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
