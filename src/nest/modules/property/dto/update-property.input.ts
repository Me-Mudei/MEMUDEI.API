import { Field, InputType, OmitType } from "@nestjs/graphql";
import {
  UpdatePropertyInput as CoreUpdatePropertyInput,
  AddressUpdateInput,
  LocationUpdateInput,
  DetailUpdateInput,
  FileUpdateInput,
} from "#property/app";

import { CreateDetailInput, CreateFileInput } from "./create-property.input";
import { PropertyStatus, PropertyType } from "./property.enum";

@InputType()
export class UpdateLocationInput implements LocationUpdateInput {
  @Field(() => Number, { nullable: true })
  lat?: number;

  @Field(() => Number, { nullable: true })
  lng?: number;
}

@InputType()
export class UpdateAddressInput implements AddressUpdateInput {
  @Field(() => String, { nullable: true })
  zip_code?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  state?: string;

  @Field(() => String, { nullable: true })
  street?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => UpdateLocationInput, { nullable: true })
  location?: UpdateLocationInput;

  @Field(() => String, { nullable: true })
  district?: string;

  @Field(() => String, { nullable: true })
  complement?: string;
}

@InputType()
export class UpdateFieldDetailInput extends OmitType(CreateDetailInput, [
  "type",
]) {}

@InputType()
export class UpdateDetailInput implements DetailUpdateInput {
  @Field(() => [String], { nullable: true })
  remove?: string[];

  @Field(() => [UpdateFieldDetailInput], { nullable: true })
  update?: UpdateFieldDetailInput[];

  @Field(() => [CreateDetailInput], { nullable: true })
  insert?: CreateDetailInput[];
}

@InputType()
export class UpdateFieldFileInput extends OmitType(CreateFileInput, [
  "external_id",
  "url",
  "filename",
  "type",
  "subtype",
]) {
  @Field(() => String)
  id: string;
}

@InputType()
export class UpdateFileInput implements FileUpdateInput {
  @Field(() => [String], { nullable: true })
  remove?: string[];

  @Field(() => [UpdateFieldFileInput], { nullable: true })
  update?: Array<UpdateFieldFileInput>;

  @Field(() => [CreateFileInput], { nullable: true })
  insert?: CreateFileInput[];
}

@InputType()
export class UpdatePropertyInput implements CoreUpdatePropertyInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => PropertyStatus, { nullable: true })
  status?: PropertyStatus;

  @Field(() => PropertyType, { nullable: true })
  property_type?: PropertyType;

  @Field(() => String, { nullable: true })
  property_relationship?: string;

  @Field(() => String, { nullable: true })
  privacy_type?: string;

  @Field(() => UpdateAddressInput, { nullable: true })
  address?: UpdateAddressInput;

  @Field(() => UpdateDetailInput, { nullable: true })
  property_detail?: UpdateDetailInput;

  @Field(() => UpdateFileInput, { nullable: true })
  media?: UpdateFileInput;
}

export class UpdatePropertyInputMapper {
  static toInput(input: UpdatePropertyInput): CoreUpdatePropertyInput {
    const property = input as any;
    return property;
  }
}
