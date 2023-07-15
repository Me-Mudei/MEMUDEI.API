import { UniqueEntityId } from "#shared/domain";
import { Broker } from "#shared/infra";
import { Chance } from "chance";

import { RepositoryFactory } from "../../domain";
import { InMemoryRepositoryFactory } from "../../infra";
import {
  CreatePropertyUseCase,
  UpdatePropertyUseCase,
  GetPropertyUseCase,
  SearchPropertyUseCase
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
      broker
    );
    const mockGetUseCase = new GetPropertyUseCase(repositoryFactory, broker);
    const mockSearchUseCase = new SearchPropertyUseCase(
      repositoryFactory,
      broker
    );
    facade = new PropertyFacade({
      createProperty: useCase,
      updateProperty: mockUpdateUseCase,
      getProperty: mockGetUseCase,
      searchProperty: mockSearchUseCase
    } as any);
  });
  it("should create a property facade", async () => {
    const spyFacadeCreate = jest.spyOn(facade, "createProperty");
    const spyUseCaseExecute = jest.spyOn(useCase, "execute");

    const chance = Chance();

    const createPropertyProps = {
      title: "Apartamento completo com churraqueira",
      description:
        "Imóvel mobiliado, com churrasqueira e piscina, próximo ao metrô e comércio local, com 2 vagas de garagem e 2 quartos com ar condicionado. O condomínio possui academia, salão de festas e portaria 24 horas. Agende sua visita!",
      user_id: new UniqueEntityId().value,
      address: {
        zip_code: "04571000",
        city: "São Paulo",
        state: "SP",
        street: "Rua dos Pinheiros",
        district: "Pinheiros"
      },
      property_type: chance.word({ length: 10 }),
      property_relationship: chance.word({ length: 10 }),
      privacy_type: chance.word({ length: 10 }),
      floor_plans: [
        {
          key: chance.word({ length: 10 }),
          value: 2
        },
        {
          key: chance.word({ length: 10 }),
          value: 2
        },
        {
          key: chance.word({ length: 10 }),
          value: 2
        },
        {
          key: chance.word({ length: 10 }),
          value: 100
        }
      ],
      property_details: [
        {
          key: chance.word({ length: 10 }),
          available: false
        }
      ],
      condominium_details: [
        {
          key: chance.word({ length: 10 }),
          available: false
        }
      ],
      rules: [
        {
          key: chance.word({ length: 10 }),
          allowed: false
        }
      ],
      photos: [new UniqueEntityId().value],
      charges: [
        {
          key: chance.word({ length: 10 }),
          amount: 1200
        },
        {
          key: chance.word({ length: 10 }),
          amount: 400
        },
        {
          key: chance.word({ length: 10 }),
          amount: 100
        },
        {
          key: chance.word({ length: 10 }),
          amount: 100
        }
      ]
    };
    await facade.createProperty(createPropertyProps);
    expect(spyFacadeCreate).toHaveBeenCalledTimes(1);
    expect(spyUseCaseExecute).toHaveBeenCalledTimes(1);
  });
});
