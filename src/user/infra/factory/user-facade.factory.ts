import { Connection } from "#shared/infra";

import { UserFacade } from "../../app/facade";
import { SearchUsersUseCase, FindFirstUserUseCase } from "../../app/use-cases";

export class UserFacadeFactory {
  static create() {
    const prisma = Connection.getInstance();

    const searchUseCase = new SearchUsersUseCase(prisma);
    const findFirstUseCase = new FindFirstUserUseCase(prisma);

    return new UserFacade({
      searchUseCase,
      findFirstUseCase,
    });
  }
}
