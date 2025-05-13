import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthUserOutput } from "#auth/app";
import { MerchantFacade } from "#merchant/app";

import { User } from "../auth/user.decorator";

import { MerchantOutput } from "./dto/merchant.output";
import { PaginateMerchantsOutput } from "./dto/paginate-merchants.output";
import { MemberOutput } from "./member/dto/member.output";

@Resolver(() => MerchantOutput)
export class MerchantResolver {
  constructor(private readonly merchantFacade: MerchantFacade) {}

  @ResolveField(() => MemberOutput, { nullable: true })
  member(@Parent() merchant: MerchantOutput, @User() user: AuthUserOutput) {
    return this.merchantFacade.getMyMerchantMember({
      merchant_id: merchant.id,
      user_id: user.id,
    });
  }

  @Query(() => PaginateMerchantsOutput)
  myMerchants(@User() user: AuthUserOutput) {
    return this.merchantFacade.searchMerchants({
      filter: { user_id: user.id },
    });
  }
}
