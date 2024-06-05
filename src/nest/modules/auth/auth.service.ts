import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CryptoService } from "#nest/shared/crypto/crypto.service";
import { CreateUserInput, UserFacade } from "#user/app";
import { UserFilter } from "#user/domain";
import axios from "axios";
import dayjs from "dayjs";

import { GoogleUserInfoOutput } from "./dto/google-user-info.output";
import { RefreshTokenInput } from "./dto/refresh-token.input";
import { SignInInput } from "./dto/sign-in.input";
import { SignUpInput } from "./dto/sign-up.input";
import { AuthError } from "./error/error.entity";
import { AuthErrorType } from "./error/error.enum";

@Injectable()
export class AuthService {
  constructor(
    private cryptoService: CryptoService,
    private jwtService: JwtService,
    private userFacade: UserFacade,
  ) {}

  async signUp(input: SignUpInput) {
    let filter: UserFilter = { email: input.email };
    let createInput: CreateUserInput | undefined = undefined;
    if (input.googleToken) {
      const { data } = await axios.get<GoogleUserInfoOutput>(
        `https://www.googleapis.com/oauth2/v2/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${input.googleToken}`,
          },
        },
      );
      filter = {
        OR: [
          {
            external_id: data.id,
            provider: "Google",
          },
          {
            email: data.email,
          },
        ],
      };
      createInput = {
        external_id: data.id,
        email: data.email,
        provider: "Google",
        name: `${data.given_name} ${data.family_name}`,
      };
    }

    const existingUser = await this.userFacade.findFirstUser({ filter });

    if (existingUser) {
      throw new AuthError(
        "Email already registered",
        AuthErrorType.EMAIL_ALREADY_REGISTERED,
        "BAD_REQUEST",
      );
    }

    if (!input.googleToken) {
      const hash = await this.cryptoService.hash(input.password);
      createInput = {
        email: input.email,
        password: hash,
        name: input.name,
      };
    }

    const user = await this.userFacade.createUser(createInput);

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        iat: dayjs().valueOf(),
        roles: user.roles,
      },
      {
        expiresIn: "1d",
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        iat: dayjs().valueOf(),
        roles: user.roles,
      },
      {
        expiresIn: "30d",
      },
    );

    return {
      token: accessToken,
      refreshToken,
    };
  }

  async signIn({ email, password, googleToken }: SignInInput) {
    let filter: UserFilter = { email };
    if (googleToken) {
      const { data } = await axios.get<GoogleUserInfoOutput>(
        `https://www.googleapis.com/oauth2/v2/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${googleToken}`,
          },
        },
      );

      filter = {
        OR: [
          {
            external_id: data.id,
            provider: "Google",
          },
          {
            email: data.email,
          },
        ],
      };
    }
    const user = await this.userFacade.findFirstUser({ filter });

    if (!user) {
      throw new AuthError(
        "User not found",
        AuthErrorType.USER_NOT_FOUND,
        "BAD_REQUEST",
      );
    }

    if (!googleToken) {
      if (!user?.password) {
        throw new AuthError(
          "Password not set",
          AuthErrorType.PASSWORD_NOT_SET,
          "BAD_REQUEST",
        );
      }

      const match = await this.cryptoService.compare(password, user.password);

      if (!match) {
        throw new AuthError(
          "Wrong password",
          AuthErrorType.WRONG_PASSWORD,
          "BAD_REQUEST",
        );
      }
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        iat: dayjs().valueOf(),
        roles: user.roles,
      },
      {
        expiresIn: "1d",
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        iat: dayjs().valueOf(),
        roles: user.roles,
      },
      {
        expiresIn: "30d",
      },
    );

    return {
      token: accessToken,
      refreshToken,
    };
  }

  async refreshToken(input: RefreshTokenInput) {
    const payload = await this.jwtService.verifyAsync(input.token);

    if (Object.keys(payload).length > 3) {
      throw new AuthError(
        "Invalid refresh token",
        AuthErrorType.INVALID_REFRESH_TOKEN,
        "UNAUTHORIZED",
      );
    }

    const user = await this.userFacade.findFirstUser({
      filter: { id: payload.user },
    });

    if (!user) {
      throw new AuthError(
        "User not found",
        AuthErrorType.USER_NOT_FOUND,
        "BAD_REQUEST",
      );
    }

    const newToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        iat: dayjs().valueOf(),
        roles: user.roles,
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
      token: newToken,
      refreshToken,
    };
  }
}
