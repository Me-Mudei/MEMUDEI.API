import { ObjectType, Field } from "@nestjs/graphql";

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
