import { Field, ObjectType } from "@nestjs/graphql";
import { AuthUserOutput as CoreAuthUserOutput } from "#auth/app";

import { GlobalRole } from "./global-role.enum";
import { AuthProvider } from "./provider.enum";

@ObjectType()
export class AuthUserOutput implements CoreAuthUserOutput {
  @Field(() => String)
  id: string;

  @Field(() => AuthProvider)
  provider: AuthProvider;

  @Field(() => String)
  email: string;

  @Field(() => GlobalRole, { nullable: true })
  global_role?: string;
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
