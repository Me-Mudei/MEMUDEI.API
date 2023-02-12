import { Broker } from '#shared/infra';
import {
  CreatePropertyUseCase,
  GetPropertyUseCase,
  SearchPropertyUseCase,
} from '../use-cases';
import { PropertyFacade } from './property.facade';
import { InMemoryRepositoryFactory } from '../../infra';
import { RepositoryFactory } from '../../domain';
import { Driver } from '../../domain/driver/driver-contracts';
import { InMemoryDriver } from '../../infra/driver/in-memory.driver';
import { createReadStream, ReadStream } from 'fs';
import { nanoid } from 'nanoid';

describe('PropertyFacade Unit tests', () => {
  let useCase: CreatePropertyUseCase;
  let repositoryFactory: RepositoryFactory;
  let driver: Driver;
  let broker: Broker;
  let facade: PropertyFacade;

  beforeEach(() => {
    repositoryFactory = new InMemoryRepositoryFactory();
    driver = new InMemoryDriver();
    broker = new Broker();
    useCase = new CreatePropertyUseCase(repositoryFactory, driver, broker);
    const mockGetUseCase = new GetPropertyUseCase(repositoryFactory, broker);
    const mockSearchUseCase = new SearchPropertyUseCase(
      repositoryFactory,
      broker,
    );
    facade = new PropertyFacade({
      createProperty: useCase,
      getProperty: mockGetUseCase,
      searchProperty: mockSearchUseCase,
    } as any);
  });
  it('should create a property facade', async () => {
    const spyFacadeCreate = jest.spyOn(facade, 'createProperty');
    const spyUseCaseExecute = jest.spyOn(useCase, 'execute');
    const createPropertyProps = {
      title: 'Apartamento completo com churraqueira',
      description:
        'Imóvel mobiliado, com churrasqueira e piscina, próximo ao metrô e comércio local, com 2 vagas de garagem e 2 quartos com ar condicionado. O condomínio possui academia, salão de festas e portaria 24 horas. Agende sua visita!',
      address: {
        zip_code: '04571000',
        city: 'São Paulo',
        state: 'SP',
        street: 'Rua dos Pinheiros',
        district: 'Pinheiros',
      },
      property_type_id: nanoid(),
      property_relationship_id: nanoid(),
      privacy_type_id: nanoid(),
      floor_plans: [
        {
          id: nanoid(),
          value: 2,
        },
        {
          id: nanoid(),
          value: 2,
        },
        {
          id: nanoid(),
          value: 2,
        },
        {
          id: nanoid(),
          value: 100,
        },
      ],
      property_details: [
        {
          id: nanoid(),
          available: false,
        },
        {
          id: nanoid(),
          available: true,
        },
      ],
      condominium_details: [
        {
          id: nanoid(),
          available: false,
        },
        {
          id: nanoid(),
          available: true,
        },
      ],
      rules: [
        {
          id: nanoid(),
          allowed: false,
        },
        {
          id: nanoid(),
          allowed: true,
        },
      ],
      photos: [
        {
          filename: 'facade-upload-test.txt',
          mimetype: 'text/plain',
          encoding: '7bit',
          createReadStream: () =>
            createReadStream(`${__dirname}/facade-upload-test.txt`),
        },
      ],
      charges: [
        {
          id: nanoid(),
          amount: 1200,
        },
        {
          id: nanoid(),
          amount: 400,
        },
        {
          id: nanoid(),
          amount: 100,
        },
        {
          id: nanoid(),
          amount: 100,
        },
      ],
    };
    await facade.createProperty(createPropertyProps);
    expect(spyFacadeCreate).toHaveBeenCalledTimes(1);
    expect(spyUseCaseExecute).toHaveBeenCalledTimes(1);
  });
});
