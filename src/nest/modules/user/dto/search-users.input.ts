import { Field, InputType } from '@nestjs/graphql';
import { SortDirection } from '#nest/shared/enums/sort-direction.enum';

@InputType()
export class FilterUsersInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  external_id?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  property_id?: string;
}

@InputType()
export class SearchUsersInput {
  @Field(() => Number, { nullable: true })
  page: number;

  @Field(() => Number, { nullable: true })
  per_page: number;

  @Field(() => String, { nullable: true })
  sort: string;

  @Field(() => SortDirection, { nullable: true })
  sort_dir: SortDirection;

  @Field(() => FilterUsersInput, { nullable: true })
  filter: FilterUsersInput;
}
