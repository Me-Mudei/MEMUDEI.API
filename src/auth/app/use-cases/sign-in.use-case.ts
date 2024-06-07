import { AuthProvider } from "#auth/infra";
import { UseCase } from "#shared/app";
import { LoggerInterface, WinstonLogger } from "#shared/infra";

import { AuthProvider as EnumAuthProvider } from "../../domain";
import { AuthUserOutput, AuthUserOutputMapper, SignInInput } from "../dto";

export class SignInUseCase implements UseCase<SignInInput, AuthUserOutput> {
  private logger: LoggerInterface;
  constructor(readonly authProviders: AuthProvider[]) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: SignInInput): Promise<AuthUserOutput> {
    this.logger.info({ message: "Start SignIn Use Case" });
    const user = await this.getProviderUser(input);
    return AuthUserOutputMapper.toOutput(user);
  }

  private async getProviderUser(input: SignInInput) {
    const providers = {
      google: this.authProviders.find(
        (provider) => provider.provider === EnumAuthProvider.GOOGLE,
      ),
      credentials: this.authProviders.find(
        (provider) => provider.provider === EnumAuthProvider.CREDENTIALS,
      ),
    };
    if (input.google_token) {
      if (!providers.google) {
        throw new Error("Google provider not found");
      }
      return providers.google.validate({ token: input.google_token });
    }
    if (!providers.credentials) {
      throw new Error("Credentials provider not found");
    }
    return providers.credentials.validate({
      email: input.email,
      password: input.password,
    });
  }
}
