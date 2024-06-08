import { Broker, Connection } from "#shared/infra";

import {
  PropertyFacade,
  CreatePropertyUseCase,
  UpdatePropertyUseCase,
  GetPropertyUseCase,
  SearchPropertiesUseCase,
} from "../../app";

export class PropertyInMemoryFacadeFactory {
  static create() {
    const prisma = Connection.getInstance("prismock");
    const broker = new Broker();
    const createProperty = new CreatePropertyUseCase(prisma, broker);
    const updateProperty = new UpdatePropertyUseCase(prisma);
    const getProperty = new GetPropertyUseCase(prisma);
    const searchProperties = new SearchPropertiesUseCase(prisma);

    return new PropertyFacade({
      createProperty,
      updateProperty,
      getProperty,
      searchProperties,
    });
  }
}
