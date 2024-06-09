import { Field, ObjectType } from "@nestjs/graphql";
import { AuthUserOutput as CoreAuthUserOutput } from "#auth/app";

@ObjectType()
export class AuthUserOutput implements CoreAuthUserOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;
}

@ObjectType()
export class AuthOutput {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;

  @Field(() => AuthUserOutput)
  user: AuthUserOutput;
}
