import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { MerchantFacade } from "#merchant/app";

import { CreateMerchantInput } from "./dto/create-merchant.input";
import { GetMerchantInput } from "./dto/get-merchant.input";
import { MerchantOutput } from "./dto/merchant.output";
import { UpdateMerchantInput } from "./dto/update-merchant.input";

@Resolver()
export class MerchantResolver {
  constructor(private readonly merchantFacade: MerchantFacade) {}

  @Query(() => MerchantOutput)
  getMerchant(@Args("input") input: GetMerchantInput) {
    return this.merchantFacade.getMerchant(input);
  }

  @Mutation(() => MerchantOutput)
  createMerchant(@Args("input") input: CreateMerchantInput) {
    return this.merchantFacade.createMerchant(input);
  }

  @Mutation(() => MerchantOutput)
  updateMerchant(@Args("input") input: UpdateMerchantInput) {
    return this.merchantFacade.updateMerchant(input);
  }
}
