import { Connection } from "#shared/infra";

import { UserFacade } from "../../app/facade";
import { SearchUsersUseCase, FindFirstUserUseCase } from "../../app/use-cases";

export class UserInMemoryFacadeFactory {
  static create() {
    const prisma = Connection.getInstance("prismock");

    const searchUseCase = new SearchUsersUseCase(prisma);
    const findFirstUseCase = new FindFirstUserUseCase(prisma);

    return new UserFacade({
      searchUseCase,
      findFirstUseCase,
    });
  }
}
