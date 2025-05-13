import { Connection } from "#shared/infra";

import {
  GetMyMerchantMemberUseCase,
  MerchantFacade,
  SearchMerchantsUseCase,
} from "../../app";

export class MerchantInMemoryFacadeFactory {
  static create() {
    const prisma = Connection.getInstance("prismock");
    const searchMerchants = new SearchMerchantsUseCase(prisma);
    const getMyMerchantMember = new GetMyMerchantMemberUseCase(prisma);

    return new MerchantFacade({
      searchMerchants,
      getMyMerchantMember,
    });
  }
}
