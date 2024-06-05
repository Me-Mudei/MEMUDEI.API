import { Module, forwardRef } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { EnvironmentVariables } from "#nest/modules/config/env.type";
import { UserModule } from "#nest/modules/user/user.module";
import { CryptoModule } from "#nest/shared/crypto/crypto.module";

import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    forwardRef(() => UserModule),
    CryptoModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        secret: configService.getOrThrow("AUTH_SECRET"),
        signOptions: {
          expiresIn: "1d",
        },
      }),
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
