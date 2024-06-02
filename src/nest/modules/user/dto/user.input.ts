import { InputType, Int, Field } from '@nestjs/graphql';
import { SortDirection } from '#nest/shared/enums/sort-direction.enum';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  password: string;
}

@InputType()
export class CreateUserByAuthInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  external_id: string;
}

@InputType()
export class UserFilterInput {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  external_id: string;

  @Field(() => String, { nullable: true })
  property_id: string;
}

@InputType()
export class UserSearchInput {
  @Field(() => Int, { nullable: true })
  page: number;

  @Field(() => Int, { nullable: true })
  per_page: number;

  @Field(() => String, { nullable: true })
  sort: string;

  @Field(() => SortDirection, { nullable: true })
  sort_dir: SortDirection;

  @Field(() => UserFilterInput, { nullable: true })
  filter: UserFilterInput;
}

@InputType()
export class ValidateUserInput {
  @Field(() => String)
  email: string;

  // @Field(() => String, { nullable: true })
  // external_id: string;
}
