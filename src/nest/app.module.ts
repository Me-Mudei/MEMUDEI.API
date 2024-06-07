import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

import { AuthGuard } from "./modules/auth/auth.guard";
import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule } from "./modules/config/config.module";
import { GraphqlModule } from "./modules/graphql/graphql.module";
import { PropertyModule } from "./modules/property/property.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
    ConfigModule.forRoot(),
    GraphqlModule.forRoot(),
    AuthModule,
    PropertyModule,
    UserModule,
  ],
})
export class AppModule {}
