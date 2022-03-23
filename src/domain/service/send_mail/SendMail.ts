export default class SendMail {
  constructor(
    readonly from: {
      mail: string;
      name: string;
    },
    readonly to: {
      mail: string;
      name: string;
    },
    readonly subject: string,
    readonly message: string,
    readonly variables?: {
      [key: string]: string;
    },
    readonly template?: string
  ) {}
}
