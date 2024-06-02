import { Module } from '@nestjs/common';

import { CacheModule } from './libs/cache/cache.module';
import { ConfigModule } from './libs/config/config.module';
import { GraphqlModule } from './libs/graphql/graphql.module';
import { LoggerModule } from './libs/logger/logger.module';
import { WinstonModule } from './libs/winston/winston.module';
import { FileModule } from './modules/file/file.module';
import { HealthModule } from './modules/health/health.module';
import { UserModule } from './modules/user/user.module';
import { BucketModule } from './libs/bucket/bucket.module';
import { PropertyModule } from './modules/property/property.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphqlModule.forRoot(),
    WinstonModule.forRoot(),
    HealthModule,
    LoggerModule,
    CacheModule,
    UserModule,
    BucketModule,
    FileModule,
    PropertyModule,
  ],
})
export class AppModule {}
