import {
  GetPropertyAddressUseCase,
  PropertyAddressFacade,
} from "#property/app";
import { Connection } from "#shared/infra";

export class PropertyAddressFacadeFactory {
  static create() {
    const prisma = Connection.getInstance();
    const getPropertyAddress = new GetPropertyAddressUseCase(prisma);

    return new PropertyAddressFacade({
      getPropertyAddress,
    });
  }
}
