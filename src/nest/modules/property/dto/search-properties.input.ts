import { Field, InputType } from '@nestjs/graphql';
import { SortDirection } from '#nest/shared/enums/sort-direction.enum';
import { PropertyStatus } from './property.enum';

@InputType()
export class FilterPropertiesInput {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  query: string;

  @Field(() => PropertyStatus, { nullable: true })
  status: PropertyStatus;

  @Field(() => String, { nullable: true })
  property_type: string;

  @Field(() => String, { nullable: true })
  privacy_type: string;

  @Field(() => [String], { nullable: true })
  property_details: string[];

  @Field(() => [String], { nullable: true })
  condominium_details: string[];

  @Field(() => [String], { nullable: true })
  rules: string[];

  @Field(() => String, { nullable: true })
  value_type: string;

  @Field(() => Number, { nullable: true })
  min_value: number;

  @Field(() => Number, { nullable: true })
  max_value: number;

  @Field(() => Number, { nullable: true })
  min_footage: number;

  @Field(() => Number, { nullable: true })
  max_footage: number;

  @Field(() => Number, { nullable: true })
  qtd_bedrooms: number;

  @Field(() => Number, { nullable: true })
  qtd_bathrooms: number;
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
