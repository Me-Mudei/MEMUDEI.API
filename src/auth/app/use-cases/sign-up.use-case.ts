import { UseCase } from "#shared/app";
import { UniqueEntityId } from "#shared/domain";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import { AuthProvider as EnumAuthProvider, User } from "../../domain";
import { AuthProvider } from "../../infra";
import { SignUpInput, AuthUserOutput, AuthUserOutputMapper } from "../dto";

export class SignUpUseCase implements UseCase<SignUpInput, AuthUserOutput> {
  private logger: LoggerInterface;
  constructor(
    readonly prisma: PrismaClient,
    readonly authProviders: AuthProvider[],
  ) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: SignUpInput): Promise<AuthUserOutput> {
    this.logger.info({ message: "Start User Use Case" });
    const providerUser = await this.getProviderUser(input);
    const createdUser = await this.prisma.user.create({
      data: {
        name: providerUser.name,
        email: providerUser.email,
        password: providerUser.password,
        external_id: providerUser.external_id,
        provider: providerUser.provider,
      },
    });
    const user = new User({
      id: new UniqueEntityId(createdUser.id),
      name: createdUser.name,
      email: createdUser.email,
      external_id: createdUser.external_id,
      provider: createdUser.provider,
    });
    return AuthUserOutputMapper.toOutput(user);
  }

  private async getProviderUser(input: SignUpInput) {
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
      return providers.google.authenticate({ token: input.google_token });
    }
    if (!providers.credentials) {
      throw new Error("Credentials provider not found");
    }
    return providers.credentials.authenticate({
      name: input.name,
      email: input.email,
      password: input.password,
    });
  }
}
