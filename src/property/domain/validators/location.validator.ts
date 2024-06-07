import { ClassValidatorFields } from "#shared/domain";
import { IsNotEmpty, IsNumber } from "class-validator";

import { LocationProps } from "../entities/location.entity";

export class LocationRules {
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  lng: number;

  constructor({ lat, lng, created_at, updated_at }: LocationProps) {
    Object.assign(this, {
      lat,
      lng,
      created_at,
      updated_at,
    });
  }
}

export class LocationValidator extends ClassValidatorFields<LocationRules> {
  validate(data: LocationProps): boolean {
    return super.validate(new LocationRules(data ?? ({} as any)));
  }
}

export default class LocationValidatorFactory {
  static create() {
    return new LocationValidator();
  }
}
