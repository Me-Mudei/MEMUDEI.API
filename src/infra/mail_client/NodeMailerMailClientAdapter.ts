import { Transporter, createTransport, SendMailOptions } from 'nodemailer';
import MailClient from './MailClient';

export default class NodeMailerMailClientAdapter implements MailClient {
  transporter: Transporter;
  constructor() {
    this.transporter = createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT!),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendMail(
    from: { mail: string; name: string },
    to: { mail: string; name: string },
    subject: string,
    message: string,
    _variables?: { [key: string]: string },
    _template?: string
  ) {
    const mailOptions: SendMailOptions = {
      from: {
        name: from.name,
        address: from.mail,
      },
      to: {
        name: to.name,
        address: to.mail,
      },
      subject,
      text: message,
    };
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log('SEND MAIL ERROR', error);
    }
  }
}
