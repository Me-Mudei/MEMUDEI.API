import { Field, InputType, Float } from "@nestjs/graphql";
import { SortDirection } from "#nest/shared/enums/sort-direction.enum";
import { PropertyFilter } from "#property/domain";
import { SearchInputDto } from "#shared/app";

import { PropertyStatus, PropertyType } from "./property.enum";

@InputType()
export class FilterPropertiesInput implements PropertyFilter {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  merchant_id: string;

  @Field(() => String, { nullable: true })
  query: string;

  @Field(() => PropertyStatus, { nullable: true })
  status: PropertyStatus;

  @Field(() => PropertyType, { nullable: true })
  property_type?: PropertyType;

  @Field(() => [String], { nullable: true })
  property_details?: string[];

  @Field(() => [String], { nullable: true })
  condominium_details?: string[];

  @Field(() => [String], { nullable: true })
  rules?: string[];

  @Field(() => Float, { nullable: true })
  lat?: number;

  @Field(() => Float, { nullable: true })
  lng?: number;

  @Field(() => Float, { nullable: true })
  radius?: number;

  @Field(() => String, { nullable: true })
  value_type?: string;

  @Field(() => Number, { nullable: true })
  min_value?: number;

  @Field(() => Number, { nullable: true })
  max_value?: number;

  @Field(() => Number, { nullable: true })
  min_footage?: number;

  @Field(() => Number, { nullable: true })
  max_footage?: number;

  @Field(() => Number, { nullable: true })
  qtd_bedrooms?: number;

  @Field(() => Number, { nullable: true })
  qtd_bathrooms?: number;
}

@InputType()
export class SearchPropertiesInput
  implements SearchInputDto<FilterPropertiesInput>
{
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
