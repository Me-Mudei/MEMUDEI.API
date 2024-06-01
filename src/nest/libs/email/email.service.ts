export abstract class EmailService {
  public abstract sendEmailConfirmationCode(
    email: string,
    code: string,
  ): Promise<void>;

  public abstract sendWelcome(email: string, name: string): Promise<void>;
}
