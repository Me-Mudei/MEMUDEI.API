import { CreatePropertyUseCase } from '../../create-property.use-case';
import { PrismaRepositoryFactory } from '../../../../infra';
import {
  LoggerInterface,
  WinstonLogger,
  Broker,
} from '../../../../../shared/infra';
import { RepositoryFactory } from '../../../../domain';
import { Driver } from '../../../../domain/driver/driver-contracts';
import { AwsS3Driver } from '../../../../infra/driver/aws-s3.driver';
import { createReadStream, ReadStream } from 'fs';

describe('CreatePropertyUseCase Unit Tests', () => {
  let useCase: CreatePropertyUseCase;
  let repositoryFactory: RepositoryFactory;
  let driver: Driver;
  let broker: Broker;
  let logger: LoggerInterface;

  beforeEach(() => {
    repositoryFactory = new PrismaRepositoryFactory();
    driver = new AwsS3Driver();
    broker = new Broker();
    logger = new WinstonLogger({
      svc: 'CreateUserUseCase',
      req: {
        req_id: 'test',
        req_path: 'test',
        req_method: 'test',
        req_ua: 'test',
      },
    });
    useCase = new CreatePropertyUseCase(
      repositoryFactory,
      driver,
      broker,
      logger,
    );
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
      property_type_id: 'cboem1-PrEcw8tj_6P9Fg',
      property_relationship_id: 'PlbanfKdJxilsSyTzEaKS',
      privacy_type_id: 'ELhZHy9eDfTYAPY-b6PD3',
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
          id: 'PIpRG6rRuZFNIEtBsYdyT',
          available: false,
        },
      ],
      condominium_details: [
        {
          id: 'p9bw4jiqH7Weh84d19Dk1',
          available: false,
        },
      ],
      rules: [
        {
          id: 'MgxO159FtDCCYQYULEhBy',
          allowed: false,
        },
      ],
      photos: [
        {
          filename: 'int-use-case-upload-test.txt',
          mimetype: 'text/plain',
          encoding: '7bit',
          createReadStream: () =>
            createReadStream(`${__dirname}/int-use-case-upload-test.txt`),
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
