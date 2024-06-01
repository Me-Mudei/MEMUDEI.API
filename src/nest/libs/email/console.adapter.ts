import { Injectable, LoggerService } from '@nestjs/common';

import { EmailService } from './email.service';

@Injectable()
export class ConsoleAdapter extends EmailService {
  constructor(private logger: LoggerService) {
    super();
  }

  public async sendEmailConfirmationCode(
    email: string,
    code: string,
  ): Promise<void> {
    this.logger.log(`${email} - ${code}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async sendWelcome(_name: string): Promise<void> {}
}
