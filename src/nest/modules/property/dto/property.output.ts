import { Field, ObjectType } from "@nestjs/graphql";
import { PropertyOutput as CorePropertyOutput } from "#property/app";

import { PropertyStatus, PropertyType } from "./property.enum";

@ObjectType()
export class PropertyOutput implements CorePropertyOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => PropertyType)
  property_type: PropertyType;

  @Field(() => PropertyStatus)
  status: PropertyStatus;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}
