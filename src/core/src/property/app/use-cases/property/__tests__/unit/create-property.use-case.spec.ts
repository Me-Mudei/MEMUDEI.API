import { CreatePropertyUseCase } from '../../create-property.use-case';
import {
  CondominiumDetailInMemoryRepository,
  InMemoryRepositoryFactory,
  PrivacyTypeInMemoryRepository,
  PropertyDetailInMemoryRepository,
  PropertyRelationshipInMemoryRepository,
  PropertyTypeInMemoryRepository,
  RuleInMemoryRepository,
} from '../../../../../infra';
import { Broker } from '#shared/infra';
import { UniqueEntityId } from '#shared/domain';
import {
  CondominiumDetail,
  PrivacyType,
  PropertyDetail,
  PropertyRelationship,
  PropertyType,
  RepositoryFactory,
  Rule,
} from '../../../../../domain';
import { InMemoryDriver } from '../../../../../infra/driver/in-memory.driver';
import { Driver } from '../../../../../domain/driver/driver-contracts';
import { createReadStream } from 'fs';

describe('CreatePropertyUseCase Unit Tests', () => {
  let useCase: CreatePropertyUseCase;
  let repositoryFactory: RepositoryFactory;
  let driver: Driver;
  let broker: Broker;

  beforeEach(() => {
    repositoryFactory = new InMemoryRepositoryFactory();
    driver = new InMemoryDriver();
    broker = new Broker();
    const propertyTypeRepository = new PropertyTypeInMemoryRepository();
    propertyTypeRepository.items = [
      new PropertyType({
        id: new UniqueEntityId('-qAJnuQ9yyjAixr3kA0qV'),
        name: 'Casa',
      }),
    ];
    const createPropertyTypeRepository = () => propertyTypeRepository;
    const privacyTypeRepository = new PrivacyTypeInMemoryRepository();
    privacyTypeRepository.items = [
      new PrivacyType({
        id: new UniqueEntityId('W6gVuFYhw9hdJjqZhfyR5'),
        name: 'Individual',
      }),
    ];
    const createPrivacyTypeRepository = () => privacyTypeRepository;
    const propertyRelationshipRepository =
      new PropertyRelationshipInMemoryRepository();
    propertyRelationshipRepository.items = [
      new PropertyRelationship({
        id: new UniqueEntityId('XVGl_wQH_qY-Ib12c4fdH'),
        name: 'Propietario',
      }),
    ];
    const createPropertyRelationshipRepository = () =>
      propertyRelationshipRepository;
    const propertyDetailRepository = new PropertyDetailInMemoryRepository();
    propertyDetailRepository.items = [
      new PropertyDetail({
        id: new UniqueEntityId('WzpOAqMrbs0B-wL2nldyi'),
        name: 'Cozinha americana',
      }),
      new PropertyDetail({
        id: new UniqueEntityId('bvS8JBf9S9310FSDaUfss'),
        name: 'Piscina',
      }),
    ];
    const createPropertyDetailRepository = () => propertyDetailRepository;
    const condominiumDetailRepository =
      new CondominiumDetailInMemoryRepository();
    condominiumDetailRepository.items = [
      new CondominiumDetail({
        id: new UniqueEntityId('ofPD2D4pPFJ2WNmdoeBrt'),
        name: 'Portaria 24h',
      }),
      new CondominiumDetail({
        id: new UniqueEntityId('NxSfKX56NoptjKXERlZ52'),
        name: 'Elevador',
      }),
    ];
    const createCondominiumDetailRepository = () => condominiumDetailRepository;
    const ruleRepository = new RuleInMemoryRepository();
    ruleRepository.items = [
      new Rule({
        id: new UniqueEntityId('CEiQmjH2zKOZ37yuzQHfA'),
        name: 'Permite animais',
      }),
      new Rule({
        id: new UniqueEntityId('QKhIxaf8BTzuZnsTOfVU4'),
        name: 'Permitido fumar',
      }),
    ];
    const createRuleRepository = () => ruleRepository;
    repositoryFactory.createPropertyTypeRepository =
      createPropertyTypeRepository;
    repositoryFactory.createPrivacyTypeRepository = createPrivacyTypeRepository;
    repositoryFactory.createPropertyRelationshipRepository =
      createPropertyRelationshipRepository;
    repositoryFactory.createPropertyDetailRepository =
      createPropertyDetailRepository;
    repositoryFactory.createCondominiumDetailRepository =
      createCondominiumDetailRepository;
    repositoryFactory.createRuleRepository = createRuleRepository;

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
      property_type_id: '-qAJnuQ9yyjAixr3kA0qV',
      property_relationship_id: 'XVGl_wQH_qY-Ib12c4fdH',
      privacy_type_id: 'W6gVuFYhw9hdJjqZhfyR5',
      floor_plans: [
        {
          name: 'Quarto',
          quantity: 2,
        },
        {
          name: 'Banheiro',
          quantity: 2,
        },
        {
          name: 'Vaga de garagem',
          quantity: 2,
        },
        {
          name: 'Metragem',
          quantity: 100,
        },
      ],
      property_details: [
        {
          id: 'WzpOAqMrbs0B-wL2nldyi',
          available: false,
        },
        {
          id: 'bvS8JBf9S9310FSDaUfss',
          available: true,
        },
      ],
      condominium_details: [
        {
          id: 'ofPD2D4pPFJ2WNmdoeBrt',
          available: false,
        },
        {
          id: 'NxSfKX56NoptjKXERlZ52',
          available: true,
        },
      ],
      rules: [
        {
          id: 'CEiQmjH2zKOZ37yuzQHfA',
          allowed: false,
        },
        {
          id: 'QKhIxaf8BTzuZnsTOfVU4',
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
          name: 'Aluguel',
          amount: 1200,
        },
        {
          name: 'Condomínio',
          amount: 400,
        },
        {
          name: 'IPTU',
          amount: 100,
        },
        {
          name: 'Seguro incêndio',
          amount: 100,
        },
      ],
    };
    const property = await useCase.execute(createPropertyProps);

    expect(property.address).toMatchObject(createPropertyProps.address);
    expect(property.title).toBe(createPropertyProps.title);
    expect(property.description).toBe(createPropertyProps.description);
    expect(property.property_type.id).toBe(
      createPropertyProps.property_type_id,
    );
    expect(property.property_relationship.id).toBe(
      createPropertyProps.property_relationship_id,
    );
    expect(property.privacy_type.id).toBe(createPropertyProps.privacy_type_id);
    expect(property.floor_plans).toMatchObject(createPropertyProps.floor_plans);
    expect(property.property_details).toMatchObject(
      createPropertyProps.property_details,
    );
    expect(property.condominium_details).toMatchObject(
      createPropertyProps.condominium_details,
    );
    expect(property.rules).toMatchObject(createPropertyProps.rules);
    expect(property.photos).toMatchObject(createPropertyProps.photos);
    expect(property.charges).toMatchObject(createPropertyProps.charges);

    expect(spyRepositoryInsert).toHaveBeenCalledTimes(1);
  });
});
