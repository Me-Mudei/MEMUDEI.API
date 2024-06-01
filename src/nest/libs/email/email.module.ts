import { Logger, LoggerService, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariables } from '../config/env.type';

import { ConsoleAdapter } from './console.adapter';
import { EmailService } from './email.service';
import { SendGridAdapter } from './sendgrid.adapter';

@Module({
  providers: [
    {
      provide: EmailService,
      inject: [ConfigService, Logger],
      useFactory(
        config: ConfigService<EnvironmentVariables>,
        logger: LoggerService,
      ) {
        if (config.getOrThrow('MAIL_VENDOR') === 'console') {
          return new ConsoleAdapter(logger);
        }
        return new SendGridAdapter(config);
      },
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}
