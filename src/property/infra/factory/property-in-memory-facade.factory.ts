import { Broker, Connection } from "#shared/infra";

import {
  PropertyFacade,
  CreatePropertyUseCase,
  UpdatePropertyUseCase,
  GetPropertyUseCase,
  SearchPropertiesUseCase,
  GetPropertyDetailsUseCase,
  GetPropertyMediaUseCase,
  GetPropertyAddressUseCase,
} from "../../app";

export class PropertyInMemoryFacadeFactory {
  static create() {
    const prisma = Connection.getInstance("prismock");
    const broker = new Broker();
    const createProperty = new CreatePropertyUseCase(prisma, broker);
    const updateProperty = new UpdatePropertyUseCase(prisma);
    const getProperty = new GetPropertyUseCase(prisma);
    const searchProperties = new SearchPropertiesUseCase(prisma);
    const getPropertyDetails = new GetPropertyDetailsUseCase(prisma);
    const getPropertyMedia = new GetPropertyMediaUseCase(prisma);
    const getPropertyAddress = new GetPropertyAddressUseCase(prisma);

    return new PropertyFacade({
      createProperty,
      updateProperty,
      getProperty,
      searchProperties,
      getPropertyDetails,
      getPropertyMedia,
      getPropertyAddress,
    });
  }
}
