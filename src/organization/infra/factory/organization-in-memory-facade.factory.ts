import { Connection } from "#shared/infra";

import { OrganizationFacade, CreateOrganizationUseCase } from "../../app";

export class OrganizationInMemoryFacadeFactory {
  static create() {
    const prisma = Connection.getInstance("prismock");
    const createUseCase = new CreateOrganizationUseCase(prisma);
    return new OrganizationFacade({
      createUseCase,
    });
  }
}
