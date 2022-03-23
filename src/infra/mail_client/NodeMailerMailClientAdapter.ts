import SendMail from '../../domain/service/send_mail/SendMail';
import MailClient from './MailClient';

export default class NodeMailerMailClientAdapter implements MailClient {
  constructor() {}
  async sendMail(mail: SendMail) {
    console.log('sendMail', mail);
  }
}
