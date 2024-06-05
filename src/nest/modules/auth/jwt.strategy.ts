import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { EnvironmentVariables } from "#nest/modules/config/env.type";
import { UserFacade } from "#user/app";
import { ExtractJwt, Strategy } from "passport-jwt";

import { JwtPayload } from "./dto/jwt-payload.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userFacade: UserFacade,
    private config: ConfigService<EnvironmentVariables>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow("AUTH_SECRET"),
    });
  }

  async validate(payload: JwtPayload) {
    if (Object.keys(payload).length < 1) {
      throw new Error("Unauthorized");
    }

    const user = await this.userFacade.findFirstUser({
      filter: {
        id: payload.sub,
      },
    });

    if (!user) {
      throw new Error("Unauthorized");
    }

    return user;
  }
}
