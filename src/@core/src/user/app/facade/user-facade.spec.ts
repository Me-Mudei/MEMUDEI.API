import Broker from "../../../@shared/infra/broker/broker";
import UserInMemoryRepository from "../../infra/repository/user-in-memory.repository";
import { CreateUserUseCase } from "../use-cases";
import UserFacade from "./user.facade";

describe("UserFacade Unit tests", () => {
  let useCase: CreateUserUseCase;
  let repository: UserInMemoryRepository;
  let broker: Broker;
  let facade: UserFacade;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    broker = new Broker();
    useCase = new CreateUserUseCase(repository, broker);
    facade = new UserFacade({ createUseCase: useCase });
  });
  it("should create a user facade", async () => {
    const spyFacadeCreate = jest.spyOn(facade, "createUser");
    const spyUseCaseExecute = jest.spyOn(useCase, "execute");
    await facade.createUser({
      name: "Test",
      email: "tes@test.com",
      role_name: "TEST",
    });
    expect(spyFacadeCreate).toHaveBeenCalledTimes(1);
    expect(spyUseCaseExecute).toHaveBeenCalledTimes(1);
  });
});
