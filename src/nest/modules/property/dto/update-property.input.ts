import { Field, InputType, OmitType } from "@nestjs/graphql";
import {
  UpdatePropertyInput as CoreUpdatePropertyInput,
  AddressUpdateInput,
  LocationUpdateInput,
  DetailUpdateInput,
  MediaUpdateInput,
} from "#property/app";

import { CreateDetailInput, CreateMediaInput } from "./create-property.input";
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
export class UpdateFieldMediaInput extends OmitType(CreateMediaInput, [
  "file",
]) {
  @Field(() => String)
  file_id: string;
}

@InputType()
export class UpdateMediaInput implements MediaUpdateInput {
  @Field(() => [String], { nullable: true })
  remove?: string[];

  @Field(() => [UpdateFieldMediaInput], { nullable: true })
  update?: Array<UpdateFieldMediaInput>;

  @Field(() => [CreateMediaInput], { nullable: true })
  insert?: CreateMediaInput[];
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

  @Field(() => UpdateAddressInput, { nullable: true })
  address?: UpdateAddressInput;

  @Field(() => UpdateDetailInput, { nullable: true })
  details?: UpdateDetailInput;

  @Field(() => UpdateMediaInput, { nullable: true })
  media?: UpdateMediaInput;
}

export class UpdatePropertyInputMapper {
  static toInput(input: UpdatePropertyInput): CoreUpdatePropertyInput {
    const property = input as any;
    return property;
  }
}
