import {
  GetPropertyAddressUseCase,
  GetPropertyDetailsUseCase,
  GetPropertyMediaUseCase,
  PropertyCreatedSendToCRMHandler,
} from "#property/app";
import { Broker, Connection } from "#shared/infra";

import {
  PropertyFacade,
  CreatePropertyUseCase,
  UpdatePropertyUseCase,
  GetPropertyUseCase,
  SearchPropertiesUseCase,
} from "../../app";
import { HubspotCRM } from "../crm";

export class PropertyFacadeFactory {
  static create() {
    const prisma = Connection.getInstance();
    const broker = new Broker();
    // const crm = new HubspotCRM(prisma);
    // broker.register(new PropertyCreatedSendToCRMHandler(crm));
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
