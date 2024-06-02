import { Module } from '@nestjs/common';

import { ConfigModule } from './modules/config/config.module';
import { GraphqlModule } from './modules/graphql/graphql.module';
import { UserModule } from './modules/user/user.module';
import { PropertyModule } from './modules/property/property.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphqlModule.forRoot(),
    UserModule,
    PropertyModule,
  ],
})
export class AppModule {}
