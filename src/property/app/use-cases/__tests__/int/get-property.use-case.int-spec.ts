import { RepositoryFactory } from "#property/domain";
import { PrismaRepositoryFactory } from "#property/infra";
import { NotFoundError } from "#shared/domain";
import { Broker } from "#shared/infra";

import { GetPropertyUseCase } from "../../get-property.use-case";

describe("GetPropertyUseCase Unit Tests", () => {
  let useCase: GetPropertyUseCase;
  let repositoryFactory: RepositoryFactory;
  let broker: Broker;

  beforeEach(() => {
    repositoryFactory = new PrismaRepositoryFactory();
    broker = new Broker();
    useCase = new GetPropertyUseCase(repositoryFactory, broker);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`),
    );
  });

  it("should create a property", async () => {
    const input = { id: "9micktlceY2WicUyvJKq3" };
    const property = await useCase.execute(input);

    expect(property).toMatchObject(input);
  });
});
