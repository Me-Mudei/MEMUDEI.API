import { UseCase } from "#shared/app";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import {
  CreateOrganizationInput,
  OrganizationOutput,
  OrganizationOutputMapper,
} from "../dto";

export class CreateOrganizationUseCase
  implements UseCase<CreateOrganizationInput, OrganizationOutput>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: CreateOrganizationInput): Promise<OrganizationOutput> {
    this.logger.info({ message: "Create Organization Use Case" });
    const organization = await this.prisma.organization.create({ data: {} });
    const merchant = await this.prisma.merchant.create({
      data: {
        company_name: "Default",
        organization: { connect: { id: organization.id } },
      },
    });
    await this.prisma.member.create({
      data: {
        merchant: { connect: { id: merchant.id } },
        user: { connect: { id: input.user_id } },
        org_role: { connect: { name: "OWNER" } },
      },
    });
    return OrganizationOutputMapper.toOutput(organization);
  }
}
