import {
  CacheStore,
  CacheStoreFactory,
  CacheModule as NestCacheModule,
} from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

import { EnvironmentVariables } from '../config/env.type';

import { CacheService } from './cache.service';

@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService<EnvironmentVariables>) => {
        let store: string | CacheStoreFactory | CacheStore = 'memory';
        if (config.getOrThrow('CACHE_VENDOR') === 'redis') {
          // @ts-expect-error - redisStore is not typed correctly
          store = await redisStore({
            socket: {
              host: config.getOrThrow('REDIS_HOST'),
              port: config.getOrThrow('REDIS_PORT'),
            },
          });
        }
        return {
          ttl: 600,
          max: 10,
          store,
        };
      },
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
