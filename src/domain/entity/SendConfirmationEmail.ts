export default class SendConfirmationEmail {
  constructor(
    readonly from: {
      email: string;
      name: string;
    },
    readonly to: {
      email: string;
      name: string;
    },
    readonly subject: string,
    readonly message: string
  ) {}
}
