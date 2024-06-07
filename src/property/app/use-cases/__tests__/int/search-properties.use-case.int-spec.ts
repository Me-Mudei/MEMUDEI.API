import { RepositoryFactory } from "#property/domain";
import { PrismaRepositoryFactory } from "#property/infra";
import { Broker } from "#shared/infra";

import { SearchPropertiesUseCase } from "../../search-properties.use-case";

describe("SearchPropertiesUseCase Unit Tests", () => {
  let useCase: SearchPropertiesUseCase;
  let repositoryFactory: RepositoryFactory;
  let broker: Broker;

  beforeEach(() => {
    repositoryFactory = new PrismaRepositoryFactory();
    broker = new Broker();
    useCase = new SearchPropertiesUseCase(repositoryFactory, broker);
  });

  it("should search a property", async () => {
    const output = await useCase.execute({});
    expect(output).toMatchObject({
      total: 15,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });
});
