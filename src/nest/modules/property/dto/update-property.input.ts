import { Field, InputType } from "@nestjs/graphql";
import { UpdatePropertyInput as CoreUpdatePropertyInput } from "#property/app";

import {
  CreatePropertyChargeInput,
  CreatePropertyCondominiumDetailInput,
  CreatePropertyFloorPlanInput,
  CreatePropertyPhotoInput,
  CreatePropertyPropertyDetailInput,
  CreatePropertyRuleInput,
} from "./create-property.input";
import { PropertyStatus } from "./property.enum";

@InputType()
export class UpdateAddressLocationInput {
  @Field(() => Number, { nullable: true })
  lat?: number;

  @Field(() => Number, { nullable: true })
  lng?: number;
}

@InputType()
export class UpdatePropertyAddressInput {
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

  @Field(() => UpdateAddressLocationInput, { nullable: true })
  location?: UpdateAddressLocationInput;

  @Field(() => String, { nullable: true })
  district?: string;

  @Field(() => String, { nullable: true })
  complement?: string;
}

@InputType()
export class UpdatePropertyFloorPlanInput {
  @Field(() => [String], { nullable: true })
  remove?: string[];

  @Field(() => [CreatePropertyFloorPlanInput], { nullable: true })
  update?: CreatePropertyFloorPlanInput[];

  @Field(() => [CreatePropertyFloorPlanInput], { nullable: true })
  insert?: CreatePropertyFloorPlanInput[];
}

@InputType()
export class UpdatePropertyPropertyDetailInput {
  @Field(() => [String], { nullable: true })
  remove?: string[];

  @Field(() => [CreatePropertyPropertyDetailInput], { nullable: true })
  update?: CreatePropertyPropertyDetailInput[];

  @Field(() => [CreatePropertyPropertyDetailInput], { nullable: true })
  insert?: CreatePropertyPropertyDetailInput[];
}

@InputType()
export class UpdatePropertyCondominiumDetailInput {
  @Field(() => [String], { nullable: true })
  remove?: string[];

  @Field(() => [CreatePropertyCondominiumDetailInput], { nullable: true })
  update?: CreatePropertyCondominiumDetailInput[];

  @Field(() => [CreatePropertyCondominiumDetailInput], { nullable: true })
  insert?: CreatePropertyCondominiumDetailInput[];
}

@InputType()
export class UpdatePropertyRuleInput {
  @Field(() => [String], { nullable: true })
  remove?: string[];

  @Field(() => [CreatePropertyRuleInput], { nullable: true })
  update?: CreatePropertyRuleInput[];

  @Field(() => [CreatePropertyRuleInput], { nullable: true })
  insert?: CreatePropertyRuleInput[];
}

@InputType()
export class UpdatePropertyChargeInput {
  @Field(() => [String], { nullable: true })
  remove?: string[];

  @Field(() => [CreatePropertyChargeInput], { nullable: true })
  update?: CreatePropertyChargeInput[];

  @Field(() => [CreatePropertyChargeInput], { nullable: true })
  insert?: CreatePropertyChargeInput[];
}

@InputType()
export class UpdatePropertyPhotoInput {
  @Field(() => [String], { nullable: true })
  remove?: string[];

  @Field(() => [CreatePropertyPhotoInput], { nullable: true })
  update?: CreatePropertyPhotoInput[];

  @Field(() => [CreatePropertyPhotoInput], { nullable: true })
  insert?: CreatePropertyPhotoInput[];
}

@InputType()
export class UpdatePropertyInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => PropertyStatus, { nullable: true })
  status?: PropertyStatus;

  @Field(() => String, { nullable: true })
  property_type?: string;

  @Field(() => String, { nullable: true })
  property_relationship?: string;

  @Field(() => String, { nullable: true })
  privacy_type?: string;

  @Field(() => UpdatePropertyAddressInput, { nullable: true })
  address?: UpdatePropertyAddressInput;

  @Field(() => UpdatePropertyFloorPlanInput, { nullable: true })
  floor_plan?: UpdatePropertyFloorPlanInput;

  @Field(() => UpdatePropertyPropertyDetailInput, { nullable: true })
  property_detail?: UpdatePropertyPropertyDetailInput;

  @Field(() => UpdatePropertyCondominiumDetailInput, { nullable: true })
  condominium_detail?: UpdatePropertyCondominiumDetailInput;

  @Field(() => UpdatePropertyRuleInput, { nullable: true })
  rule?: UpdatePropertyRuleInput;

  @Field(() => UpdatePropertyPhotoInput, { nullable: true })
  photo?: UpdatePropertyPhotoInput;

  @Field(() => UpdatePropertyChargeInput, { nullable: true })
  charge?: UpdatePropertyChargeInput;
}

export class UpdatePropertyInputMapper {
  static toInput(input: UpdatePropertyInput): CoreUpdatePropertyInput {
    const property = input as any;
    return property;
  }
}
