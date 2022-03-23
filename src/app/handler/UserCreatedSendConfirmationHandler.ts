import UserCreated from '../../domain/event/UserCreated';
import SendMail from '../../domain/service/send_mail/SendMail';
import MailClient from '../../infra/mail_client/MailClient';

export default class UserCreatedSendConfirmationHandler {
  name = 'UserCreated';

  constructor(readonly mailClient: MailClient) {}

  handle(event: UserCreated): void {
    const mail = new SendMail(
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
    this.mailClient.sendMail(mail);
  }
}
