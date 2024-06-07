import { Broker } from "#shared/infra";

import { PropertyFakeBuilder, RepositoryFactory } from "../../domain";
import { InMemoryRepositoryFactory } from "../../infra";
import {
  CreatePropertyUseCase,
  UpdatePropertyUseCase,
  GetPropertyUseCase,
  SearchPropertiesUseCase,
} from "../use-cases";

import { PropertyFacade } from "./property.facade";

describe("PropertyFacade Unit tests", () => {
  let useCase: CreatePropertyUseCase;
  let repositoryFactory: RepositoryFactory;
  let broker: Broker;
  let facade: PropertyFacade;

  beforeEach(() => {
    repositoryFactory = new InMemoryRepositoryFactory();
    broker = new Broker();
    useCase = new CreatePropertyUseCase(repositoryFactory, broker);
    const mockUpdateUseCase = new UpdatePropertyUseCase(
      repositoryFactory,
      broker,
    );
    const mockGetUseCase = new GetPropertyUseCase(repositoryFactory, broker);
    const mockSearchUseCase = new SearchPropertiesUseCase(
      repositoryFactory,
      broker,
    );
    facade = new PropertyFacade({
      createProperty: useCase,
      updateProperty: mockUpdateUseCase,
      getProperty: mockGetUseCase,
      searchProperties: mockSearchUseCase,
    } as any);
  });
  it("should create a property facade", async () => {
    const spyFacadeCreate = jest.spyOn(facade, "createProperty");
    const spyUseCaseExecute = jest.spyOn(useCase, "execute");

    const createPropertyProps = PropertyFakeBuilder.aProperty();
    await facade.createProperty(createPropertyProps);
    expect(spyFacadeCreate).toHaveBeenCalledTimes(1);
    expect(spyUseCaseExecute).toHaveBeenCalledTimes(1);
  });
});
