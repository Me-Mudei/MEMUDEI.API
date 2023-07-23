import { ClassValidatorFields } from "#shared/domain";
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength
} from "class-validator";

import { AddressProps } from "../entities/address.entity";

export class AddressRules {
  @MaxLength(9)
  @IsString()
  @IsNotEmpty()
  zip_code: string;

  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  city: string;

  @MaxLength(25)
  @IsString()
  @IsNotEmpty()
  state: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  street: string;

  @MaxLength(25)
  @IsString()
  @IsNotEmpty()
  country: string;

  @MaxLength(25)
  @IsString()
  @IsOptional()
  district?: string;

  @MaxLength(50)
  @IsString()
  @IsOptional()
  complement?: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  constructor({
    zip_code,
    city,
    state,
    street,
    country,
    district,
    complement,
    created_at,
    updated_at
  }: AddressProps) {
    Object.assign(this, {
      zip_code,
      city,
      state,
      street,
      country,
      district,
      complement,
      created_at,
      updated_at
    });
  }
}

export class AddressValidator extends ClassValidatorFields<AddressRules> {
  validate(data: AddressProps): boolean {
    return super.validate(new AddressRules(data ?? ({} as any)));
  }
}

export default class AddressValidatorFactory {
  static create() {
    return new AddressValidator();
  }
}
