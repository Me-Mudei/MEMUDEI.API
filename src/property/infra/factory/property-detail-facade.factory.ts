import { GetPropertyDetailsUseCase, PropertyDetailFacade } from "#property/app";
import { Connection } from "#shared/infra";

export class PropertyDetailFacadeFactory {
  static create() {
    const prisma = Connection.getInstance();
    const getPropertyDetails = new GetPropertyDetailsUseCase(prisma);

    return new PropertyDetailFacade({
      getPropertyDetails,
    });
  }
}
