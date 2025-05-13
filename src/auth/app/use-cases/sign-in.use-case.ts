import { UseCase } from "#shared/app";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import { AuthProvider as EnumAuthProvider } from "../../domain";
import { AuthProvider } from "../../infra";
import { AuthUserOutput, AuthUserOutputMapper, SignInInput } from "../dto";

export class SignInUseCase implements UseCase<SignInInput, AuthUserOutput> {
  private logger: LoggerInterface;
  constructor(
    readonly prisma: PrismaClient,
    readonly authProviders: AuthProvider[],
  ) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: SignInInput): Promise<AuthUserOutput> {
    this.logger.info({ message: "Start SignIn Use Case" });
    const user = await this.getAuthUser(input);
    return AuthUserOutputMapper.toOutput(user);
  }

  private async getAuthUser(input: SignInInput) {
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
      const provider_user = await providers.google.findUser({
        token: input.google_token,
      });
      const user = await this.prisma.user.findUnique({
        where: {
          email: provider_user.email,
          external_id: provider_user.id,
        },
        include: {
          global_role: {
            select: { name: true },
          },
        },
      });
      const isValid = await providers.google.validate({
        user: {
          provider: user.provider,
          external_id: user.external_id,
          email: user.email,
        },
        provider_user,
      });
      if (!isValid) {
        throw new Error("Invalid credentials");
      }
      return user;
    }
    if (!providers.credentials) {
      throw new Error("Credentials provider not found");
    }
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
      include: {
        global_role: {
          select: { name: true },
        },
      },
    });
    const isValid = await providers.credentials.validate({
      user: {
        provider: user.provider,
        email: user.email,
        password: user.password,
      },
      provider_user: { email: input.email, password: input.password },
    });
    if (!isValid) {
      throw new Error("Invalid credentials");
    }
    return user;
  }
}
