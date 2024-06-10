import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

import { AuthGuard } from "./modules/auth/auth.guard";
import { AuthModule } from "./modules/auth/auth.module";
import { RolesGuard } from "./modules/auth/roles.guard";
import { ConfigModule } from "./modules/config/config.module";
import { GraphqlModule } from "./modules/graphql/graphql.module";
import { PropertyModule } from "./modules/property/property.module";
import { MerchantModule } from './modules/merchant/merchant.module';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    ConfigModule.forRoot(),
    GraphqlModule.forRoot(),
    AuthModule,
    PropertyModule,
    MerchantModule,
  ],
})
export class AppModule {}
