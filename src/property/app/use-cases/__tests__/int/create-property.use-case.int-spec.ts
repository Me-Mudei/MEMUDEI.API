import { CreatePropertyUseCase } from '../../create-property.use-case';
import { PrismaRepositoryFactory } from '#property/infra';
import { Broker } from '#shared/infra';
import { RepositoryFactory, PropertyStatus } from '#property/domain';
//import { AwsS3Driver } from '#property/infra';

import { Chance } from 'chance';
import { UniqueEntityId } from '#shared/domain';

describe('CreatePropertyUseCase Unit Tests', () => {
  let useCase: CreatePropertyUseCase;
  let repositoryFactory: RepositoryFactory;
  let broker: Broker;

  beforeEach(() => {
    repositoryFactory = new PrismaRepositoryFactory();
    broker = new Broker();
    useCase = new CreatePropertyUseCase(repositoryFactory, broker);
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
      ],
      condominium_details: [
        {
          key: chance.word({ length: 10 }),
          available: false,
        },
      ],
      rules: [
        {
          key: chance.word({ length: 10 }),
          allowed: false,
        },
      ],
      file_ids: [new UniqueEntityId().value],
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
  });
});
