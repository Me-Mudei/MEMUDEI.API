import { Connection } from "#shared/infra";

import { MerchantFacade, CreateMerchantUseCase, GetMerchantUseCase, UpdateMerchantUseCase } from "../../app";

export class MerchantFacadeFactory {
  static create() {
    const prisma = Connection.getInstance();
    const createUseCase = new CreateMerchantUseCase(prisma);
    const updateUseCase = new UpdateMerchantUseCase(prisma);
    const getUseCase = new GetMerchantUseCase(prisma);
    return new MerchantFacade({
      createUseCase,
      updateUseCase,
      getUseCase,
    });
  }
}
