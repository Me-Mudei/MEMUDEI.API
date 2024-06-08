import { Connection } from "#shared/infra";

import { OrganizationFacade, CreateOrganizationUseCase } from "../../app";

export class OrganizationFacadeFactory {
  static create() {
    const prisma = Connection.getInstance();
    const createUseCase = new CreateOrganizationUseCase(prisma);
    return new OrganizationFacade({
      createUseCase,
    });
  }
}
