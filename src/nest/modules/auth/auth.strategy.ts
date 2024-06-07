import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { AuthFacade } from "#auth/app";
import { EnvironmentVariables } from "#nest/modules/config/env.type";
import { ExtractJwt, Strategy } from "passport-jwt";

import { ValidateDto } from "./dto/validate.input";

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authFacade: AuthFacade,
    config: ConfigService<EnvironmentVariables>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow("AUTH_SECRET"),
    });
  }

  async validate(payload: ValidateDto) {
    return this.authFacade.validate(payload);
  }
}
