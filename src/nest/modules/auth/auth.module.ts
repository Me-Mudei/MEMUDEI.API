import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthFacade } from "#auth/app";
import { AuthFacadeFactory } from "#auth/infra";
import { EnvironmentVariables } from "#nest/modules/config/env.type";

import { AuthResolver } from "./auth.resolver";
import { AuthStrategy } from "./auth.strategy";

@Module({
  imports: [
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
  providers: [
    AuthResolver,
    AuthStrategy,
    {
      provide: AuthFacade,
      useFactory: () => AuthFacadeFactory.create(),
    },
  ],
  exports: [AuthFacade],
})
export class AuthModule {}
