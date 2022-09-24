import { RepositoryFactory } from "../../../domain/factory";
import { UserInMemoryRepository } from "../../repository";

export class InMemoryRepositoryFactory implements RepositoryFactory {
  constructor() {}
  createUserRepository() {
    return new UserInMemoryRepository();
  }
}
