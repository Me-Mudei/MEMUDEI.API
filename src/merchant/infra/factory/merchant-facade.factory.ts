import { Connection } from "#shared/infra";

import {
  MerchantFacade,
  CreateMerchantUseCase,
  GetMerchantUseCase,
  UpdateMerchantUseCase,
  RemoveMerchantUseCase,
} from "../../app";

export class MerchantFacadeFactory {
  static create() {
    const prisma = Connection.getInstance();
    const createUseCase = new CreateMerchantUseCase(prisma);
    const getUseCase = new GetMerchantUseCase(prisma);
    const updateUseCase = new UpdateMerchantUseCase(prisma);
    const removeUseCase = new RemoveMerchantUseCase(prisma);
    return new MerchantFacade({
      createUseCase,
      getUseCase,
      updateUseCase,
      removeUseCase,
    });
  }
}
