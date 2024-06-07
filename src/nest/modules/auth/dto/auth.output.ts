import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthOutput {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
