import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PropertyOutput } from "./property.output";

@ObjectType()
export class PaginatePropertiesOutput {
  @Field(() => [PropertyOutput])
  items: PropertyOutput[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  current_page: number;

  @Field(() => Int)
  last_page: number;

  @Field(() => Int)
  per_page: number;
}
