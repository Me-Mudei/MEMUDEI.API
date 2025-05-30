import { Broker } from "#shared/infra";
import { Auth, UserInMemoryRepository } from "#user/infra/";

import { UserCreatedSendToCrmHandler } from "../../../handlers";
import { CreateUserUseCase } from "../../create-user.use-case";

describe("CreateUserUseCase Unit Tests", () => {
  let useCase: CreateUserUseCase;
  let repository: UserInMemoryRepository;
  let broker: Broker;
  let authService: Auth;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    broker = new Broker();
    authService = {
      signup: jest.fn()
    };
    broker.register(new UserCreatedSendToCrmHandler());
    useCase = new CreateUserUseCase(repository, authService, broker);
  });

  it("should create a user", async () => {
    const spyRepositoryInsert = jest.spyOn(repository, "insert");
    const spyBrokerPublish = jest.spyOn(broker, "publish");
    await useCase.execute({
      email: "test@test.com",
      name: "test"
    });
    expect(spyRepositoryInsert).toHaveBeenCalledTimes(1);
    expect(spyBrokerPublish).toHaveBeenCalledTimes(1);

    await useCase.execute({
      email: "test@test.com",
      name: "test"
    });
    expect(spyRepositoryInsert).toHaveBeenCalledTimes(2);
    expect(spyBrokerPublish).toHaveBeenCalledTimes(2);
  });
});
