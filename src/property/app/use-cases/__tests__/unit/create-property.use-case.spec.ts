import {
  PropertyFakeBuilder,
  PropertyStatus,
  RepositoryFactory,
} from "#property/domain";
import { InMemoryRepositoryFactory } from "#property/infra";
import { Broker } from "#shared/infra";

import { CreatePropertyUseCase } from "../../create-property.use-case";

describe("CreatePropertyUseCase Unit Tests", () => {
  let useCase: CreatePropertyUseCase;
  let repositoryFactory: RepositoryFactory;
  let broker: Broker;

  beforeEach(() => {
    repositoryFactory = new InMemoryRepositoryFactory();
    broker = new Broker();
    useCase = new CreatePropertyUseCase(repositoryFactory, broker);
  });

  it("should create a property", async () => {
    const spyRepositoryInsert = jest.spyOn(
      useCase.propertyRepository,
      "insert",
    );

    const createPropertyProps = PropertyFakeBuilder.aProperty();
    const property = await useCase.execute(createPropertyProps);

    expect(property.id).toBeDefined();
    expect(property.status).toBe(PropertyStatus.PENDING);
    expect(property.created_at).toBeInstanceOf(Date);
    expect(property.updated_at).toBeInstanceOf(Date);
    expect(spyRepositoryInsert).toHaveBeenCalledTimes(1);
  });
});
