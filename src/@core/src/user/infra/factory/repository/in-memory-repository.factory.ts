import RepositoryFactory from "../../../domain/factory/repository.factory";
import UserInMemoryRepository from "../../repository/user-in-memory.repository";

export default class InMemoryRepositoryFactory implements RepositoryFactory {
  constructor() {}
  createUserRepository() {
    return new UserInMemoryRepository();
  }
}
