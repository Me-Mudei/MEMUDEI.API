import UserCreated from '../../domain/event/UserCreated';
import MailClient from '../../infra/mail_client/MailClient';

export default class UserCreatedSendConfirmationHandler {
  name = 'UserCreated';

  constructor(readonly mailClient: MailClient) {}

  async handle(event: UserCreated): Promise<void> {
    await this.mailClient.sendMail(
      {
        mail: '',
        name: '',
      },
      {
        mail: event.user.email,
        name: event.user.name,
      },
      'Confirm your email',
      ''
    );
  }
}
