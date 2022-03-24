export default interface MailClient {
  sendMail(
    from: {
      mail: string;
      name: string;
    },
    to: {
      mail: string;
      name: string;
    },
    subject: string,
    message: string,
    variables?: {
      [key: string]: string;
    },
    template?: string
  ): Promise<void>;
}
