import { Member, OrgRole } from "#merchant/domain";
import { UseCase } from "#shared/app";
import { UniqueEntityId } from "#shared/domain";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import {
  GetMyMerchantMemberInput,
  MemberOutput,
  MemberOutputMapper,
} from "../dto";

export class GetMyMerchantMemberUseCase
  implements UseCase<GetMyMerchantMemberInput, MemberOutput>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: GetMyMerchantMemberInput): Promise<MemberOutput> {
    console.log("GetMyMerchantMemberUseCase -> execute -> input", input);
    this.logger.info({ message: "Start Property Use Case" });
    const foundMember = await this.prisma.member.findUnique({
      where: {
        merchant_id_user_id: {
          merchant_id: input.merchant_id,
          user_id: input.user_id,
        },
      },
      include: {
        org_role: true,
      },
    });
    const member = new Member({
      id: new UniqueEntityId(foundMember.id),
      org_role: foundMember.org_role.name as OrgRole,
    });
    return MemberOutputMapper.toOutput(member);
  }
}
