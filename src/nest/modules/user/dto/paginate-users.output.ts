import { Field, Int, ObjectType } from "@nestjs/graphql";

import { UserOutput } from "./user.output";

@ObjectType()
export class PaginateUsersOutput {
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
