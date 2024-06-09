import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { AuthFacade } from "#auth/app";
import { AuthUserOutput } from "#auth/app";
import dayjs from "dayjs";

import { AuthOutput } from "./dto/auth.output";
import { RefreshTokenInput } from "./dto/refresh-token.input";
import { SignInInput } from "./dto/sign-in.input";
import { SignUpInput } from "./dto/sign-up.input";
import { Public } from "./public.decorator";

@Resolver(() => AuthOutput)
export class AuthResolver {
  constructor(
    private authFacade: AuthFacade,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Mutation(() => AuthOutput)
  async signUp(@Args("input") input: SignUpInput) {
    const user = await this.authFacade.signUp(input);
    return this.output(user);
  }

  @Public()
  @Mutation(() => AuthOutput)
  async signIn(@Args("input") input: SignInInput) {
    const user = await this.authFacade.signIn(input);
    return this.output(user);
  }

  @Public()
  @Mutation(() => AuthOutput)
  async refreshToken(@Args("input") input: RefreshTokenInput) {
    const payload = await this.jwtService.verifyAsync(input.refreshToken);
    const user = await this.authFacade.validate(payload);
    return this.output(user);
  }

  private async output(user: AuthUserOutput): Promise<AuthOutput> {
    const accessToken = await this.jwtService.signAsync(
      {
        iat: dayjs().valueOf(),
        sub: user.id,
        user,
      },
      {
        expiresIn: "1d",
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        iat: dayjs().valueOf(),
      },
      {
        expiresIn: "30d",
      },
    );

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
