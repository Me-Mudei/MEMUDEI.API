import { OrgRole } from "#organization/domain";
import { UseCase } from "#shared/app";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import { AuthProvider as EnumAuthProvider } from "../../domain";
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
    const authUser = await this.getAuthUser(input);
    const user = await this.prisma.user.create({
      data: {
        provider: authUser.provider,
        email: authUser.email,
        password: authUser.password,
        external_id: authUser.external_id,
        members: {
          create: {
            org_role: {
              connect: {
                name: OrgRole.OWNER,
              },
            },
            merchant: {
              create: {
                company_name: "Personal",
                organization: {
                  create: {},
                },
              },
            },
          },
        },
      },
    });
    return AuthUserOutputMapper.toOutput(user);
  }

  private async getAuthUser(input: SignUpInput) {
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
      email: input.email,
      password: input.password,
    });
  }
}
