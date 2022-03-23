import SendMail from '../../domain/service/send_mail/SendMail';

export default interface MailClient {
  sendMail(mail: SendMail): Promise<void>;
}
