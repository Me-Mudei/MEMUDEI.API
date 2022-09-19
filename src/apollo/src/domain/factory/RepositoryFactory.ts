import UserRepository from "../../../../@core/user/domain/repository/user.repository";

export default interface RepositoryFactory {
  createUserRepository(): UserRepository.Repository;
}
