import { PropertyCreatedSendToCRMHandler } from "#property/app";
import { Broker } from "#shared/infra";

import { PropertyFacade } from "../../../app/facade";
import {
  CreatePropertyUseCase,
  UpdatePropertyUseCase,
  GetPropertyUseCase,
  SearchPropertiesUseCase,
} from "../../../app/use-cases";
import { PrismaRepositoryFactory } from "../repository";

export class PropertyFacadeFactory {
  static create() {
    const repositoryFactory = new PrismaRepositoryFactory();
    const broker = new Broker();
    broker.register(new PropertyCreatedSendToCRMHandler());
    const createPropertyUseCase = new CreatePropertyUseCase(
      repositoryFactory,
      broker,
    );
    const updatePropertyUseCase = new UpdatePropertyUseCase(
      repositoryFactory,
      broker,
    );
    const getPropertyUseCase = new GetPropertyUseCase(
      repositoryFactory,
      broker,
    );
    const searchPropertiesUseCase = new SearchPropertiesUseCase(
      repositoryFactory,
      broker,
    );

    return new PropertyFacade({
      createProperty: createPropertyUseCase,
      updateProperty: updatePropertyUseCase,
      getProperty: getPropertyUseCase,
      searchProperties: searchPropertiesUseCase,
    });
  }
}
