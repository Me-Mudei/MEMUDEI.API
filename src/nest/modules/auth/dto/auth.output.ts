import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthOutput {
  @Field(() => String)
  token: string;

  @Field(() => String)
  refreshToken: string;
}
