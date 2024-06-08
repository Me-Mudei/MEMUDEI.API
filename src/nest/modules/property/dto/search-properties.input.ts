import { Field, InputType } from "@nestjs/graphql";
import { SortDirection } from "#nest/shared/enums/sort-direction.enum";

import { PropertyStatus } from "./property.enum";

@InputType()
export class FilterPropertiesInput {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  query: string;

  @Field(() => PropertyStatus, { nullable: true })
  status: PropertyStatus;
}

@InputType()
export class SearchPropertiesInput {
  @Field(() => Number, { nullable: true })
  page: number;

  @Field(() => Number, { nullable: true })
  per_page: number;

  @Field(() => String, { nullable: true })
  sort: string;

  @Field(() => SortDirection, { nullable: true })
  sort_dir: SortDirection;

  @Field(() => FilterPropertiesInput, { nullable: true })
  filter: FilterPropertiesInput;
}
