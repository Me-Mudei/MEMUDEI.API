import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class UserOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}

@ObjectType()
export class UserPaginationOutput {
  @Field(() => [UserOutput])
  items: UserOutput[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  current_page: number;

  @Field(() => Int)
  last_page: number;

  @Field(() => Int)
  per_page: number;
}

@ObjectType()
export class DenyOutput {
  @Field(() => String)
  reason: string;

  @Field(() => String)
  user_facing_message: string;
}

@ObjectType()
export class ValidateUserOutput {
  @Field(() => Boolean)
  already_exists: boolean;

  @Field(() => DenyOutput, { nullable: true })
  deny?: DenyOutput;
}
