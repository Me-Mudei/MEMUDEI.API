import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { AuthService } from "./auth.service";
import { AuthOutput } from "./dto/auth.output";
import { RefreshTokenInput } from "./dto/refresh-token.input";
import { SignInInput } from "./dto/sign-in.input";
import { SignUpInput } from "./dto/sign-up.input";
import { Public } from "./public.decorator";

@Resolver(() => AuthOutput)
export class AuthResolver {
  constructor(private service: AuthService) {}

  @Public()
  @Mutation(() => AuthOutput)
  async signUp(@Args("input") input: SignUpInput) {
    return this.service.signUp(input);
  }

  @Public()
  @Mutation(() => AuthOutput)
  async signIn(@Args("input") input: SignInInput) {
    return this.service.signIn(input);
  }

  @Public()
  @Mutation(() => AuthOutput)
  async refreshToken(@Args("input") input: RefreshTokenInput) {
    return this.service.refreshToken(input);
  }
}
