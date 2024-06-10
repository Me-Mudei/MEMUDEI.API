import { Module } from "@nestjs/common";
import { MerchantFacade } from "#merchant/app";
import { MerchantFacadeFactory } from "#merchant/infra";

import { MerchantResolver } from "./merchant.resolver";

@Module({
  providers: [
    MerchantResolver,
    {
      provide: MerchantFacade,
      useFactory: () => MerchantFacadeFactory.create(),
    },
  ],
})
export class MerchantModule {}
