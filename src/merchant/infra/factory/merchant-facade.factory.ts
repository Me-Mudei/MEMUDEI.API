import { Connection } from "#shared/infra";

import {
  SearchMerchantsUseCase,
  MerchantFacade,
  GetMyMerchantMemberUseCase,
} from "../../app";

export class MerchantFacadeFactory {
  static create() {
    const prisma = Connection.getInstance();
    const searchMerchants = new SearchMerchantsUseCase(prisma);
    const getMyMerchantMember = new GetMyMerchantMemberUseCase(prisma);

    return new MerchantFacade({
      searchMerchants,
      getMyMerchantMember,
    });
  }
}
