import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariables } from '../config/env.type';

import { BucketService } from './bucket.service';
import { RizaMediaAdapter } from './riza-media.adapter';

@Module({
  providers: [
    {
      provide: BucketService,
      inject: [ConfigService],
      useFactory(config: ConfigService<EnvironmentVariables>) {
        return new RizaMediaAdapter(config);
      },
    },
  ],
  exports: [BucketService],
})
export class BucketModule {}
