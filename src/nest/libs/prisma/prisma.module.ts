import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../config/env.type';
import { PrismockClient } from 'prismock';

@Module({
  providers: [
    {
      inject: [ConfigService],
      provide: PrismaService,
      useFactory: (config: ConfigService<EnvironmentVariables>) => {
        if (config.getOrThrow('PRISMA_VENDOR') === 'memory') {
          return new PrismockClient();
        }
        return new PrismaService();
      },
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
