import { CreatePropertyUseCase } from '../../create-property.use-case';
import { InMemoryRepositoryFactory, InMemoryDriver } from '#property/infra';
import { Broker } from '#shared/infra';
import { PropertyStatus, RepositoryFactory } from '#property/domain';
import { Driver } from '#property/domain/driver/driver-contracts';
import { createReadStream } from 'fs';
import { nanoid } from 'nanoid';

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
          filename: 'unit-use-case-upload-test.txt',
          mimetype: 'text/plain',
          encoding: '7bit',
          createReadStream: () =>
            createReadStream(`${__dirname}/unit-use-case-upload-test.txt`),
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
