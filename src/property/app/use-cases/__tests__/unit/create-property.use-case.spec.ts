import { CreatePropertyUseCase } from '../../create-property.use-case';
import { InMemoryRepositoryFactory, InMemoryDriver } from '#property/infra';
import { Broker } from '#shared/infra';
import { PropertyStatus, RepositoryFactory } from '#property/domain';
import { Driver } from '#property/domain/driver/driver-contracts';
import { createReadStream } from 'fs';
import { Chance } from 'chance';
import { UniqueEntityId } from '#shared/domain';

describe('CreatePropertyUseCase Unit Tests', () => {
  let useCase: CreatePropertyUseCase;
  let repositoryFactory: RepositoryFactory;
  let driver: Driver;
  let broker: Broker;

  beforeEach(() => {
    repositoryFactory = new InMemoryRepositoryFactory();
    driver = new InMemoryDriver();
    broker = new Broker();
    useCase = new CreatePropertyUseCase(repositoryFactory, driver, broker);
  });

  it('should create a property', async () => {
    const spyRepositoryInsert = jest.spyOn(
      useCase.propertyRepository,
      'insert',
    );

    const chance = Chance();

    const createPropertyProps = {
      title: 'Apartamento completo com churraqueira',
      description:
        'Imóvel mobiliado, com churrasqueira e piscina, próximo ao metrô e comércio local, com 2 vagas de garagem e 2 quartos com ar condicionado. O condomínio possui academia, salão de festas e portaria 24 horas. Agende sua visita!',
      user_id: new UniqueEntityId().value,
      address: {
        zip_code: '04571000',
        city: 'São Paulo',
        state: 'SP',
        street: 'Rua dos Pinheiros',
        district: 'Pinheiros',
      },
      property_type: chance.word({ length: 10 }),
      property_relationship: chance.word({ length: 10 }),
      privacy_type: chance.word({ length: 10 }),
      floor_plans: [
        {
          key: chance.word({ length: 10 }),
          value: 2,
        },
        {
          key: chance.word({ length: 10 }),
          value: 2,
        },
        {
          key: chance.word({ length: 10 }),
          value: 2,
        },
        {
          key: chance.word({ length: 10 }),
          value: 100,
        },
      ],
      property_details: [
        {
          key: chance.word({ length: 10 }),
          available: false,
        },
        {
          key: chance.word({ length: 10 }),
          available: true,
        },
      ],
      condominium_details: [
        {
          key: chance.word({ length: 10 }),
          available: false,
        },
        {
          key: chance.word({ length: 10 }),
          available: true,
        },
      ],
      rules: [
        {
          key: chance.word({ length: 10 }),
          allowed: false,
        },
        {
          key: chance.word({ length: 10 }),
          allowed: true,
        },
      ],
      photos: [
        {
          filename: 'unit-use-case-upload-test.txt',
          mimetype: 'text/plain',
          encoding: '7bit',
          createReadStream: () =>
            createReadStream(`${__dirname}/unit-use-case-upload-test.txt`),
        },
      ],
      charges: [
        {
          key: chance.word({ length: 10 }),
          amount: 1200,
        },
        {
          key: chance.word({ length: 10 }),
          amount: 400,
        },
        {
          key: chance.word({ length: 10 }),
          amount: 100,
        },
        {
          key: chance.word({ length: 10 }),
          amount: 100,
        },
      ],
    };
    const property = await useCase.execute(createPropertyProps);

    expect(property.id).toBeDefined();
    expect(property.status).toBe(PropertyStatus.PENDING);
    expect(property.created_at).toBeInstanceOf(Date);
    expect(property.updated_at).toBeInstanceOf(Date);
    expect(spyRepositoryInsert).toHaveBeenCalledTimes(1);
    createPropertyProps.photos.map((photo) =>
      driver.delete(photo.filename, property.id),
    );
  });
});
