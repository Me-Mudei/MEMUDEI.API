import { PropertyFacade } from '../../../app/facade';
import { Broker } from '../#shared/infra/broker';
import {
  CreatePropertyUseCase,
  GetPropertyUseCase,
  SearchPropertyUseCase,
  GetPropertyTypeUseCase,
  SearchPropertyTypeUseCase,
  CreatePropertyTypeUseCase,
  UpdatePropertyTypeUseCase,
  DeletePropertyTypeUseCase,
  GetPropertyRelationshipUseCase,
  SearchPropertyRelationshipUseCase,
  CreatePropertyRelationshipUseCase,
  UpdatePropertyRelationshipUseCase,
  DeletePropertyRelationshipUseCase,
  GetPrivacyTypeUseCase,
  SearchPrivacyTypeUseCase,
  CreatePrivacyTypeUseCase,
  UpdatePrivacyTypeUseCase,
  DeletePrivacyTypeUseCase,
  GetPropertyDetailUseCase,
  SearchPropertyDetailUseCase,
  CreatePropertyDetailUseCase,
  UpdatePropertyDetailUseCase,
  DeletePropertyDetailUseCase,
  GetCondominiumDetailUseCase,
  SearchCondominiumDetailUseCase,
  CreateCondominiumDetailUseCase,
  UpdateCondominiumDetailUseCase,
  DeleteCondominiumDetailUseCase,
  GetRuleUseCase,
  SearchRuleUseCase,
  CreateRuleUseCase,
  UpdateRuleUseCase,
  DeleteRuleUseCase,
} from '../../../app/use-cases';
import { PrismaRepositoryFactory } from '../repository';
import { WinstonLogger } from '#sharedogger/winston.logger';
import { AwsS3Driver, InMemoryDriver } from '../../driver';

export class PrismaFacadeFactory {
  constructor(readonly req: any) {}
  create() {
    const logger = new WinstonLogger({
      svc: 'testSvc',
      req: {
        req_id: this.req.req_id,
        req_path: this.req.req_path,
        req_method: this.req.req_method,
        req_ua: this.req.req_ua,
      },
    });
    const repositoryFactory = new PrismaRepositoryFactory();
    //const driver = new AwsS3Driver();
    const driver = new InMemoryDriver();
    const broker = new Broker();

    const createPropertyUseCase = new CreatePropertyUseCase(
      repositoryFactory,
      driver,
      broker,
      logger,
    );
    const getPropertyUseCase = new GetPropertyUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const searchPropertyUseCase = new SearchPropertyUseCase(
      repositoryFactory,
      broker,
      logger,
    );

    const getPropertyTypeUseCase = new GetPropertyTypeUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const searchPropertyTypeUseCase = new SearchPropertyTypeUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const createPropertyTypeUseCase = new CreatePropertyTypeUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const updatePropertyTypeUseCase = new UpdatePropertyTypeUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const deletePropertyTypeUseCase = new DeletePropertyTypeUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const getPropertyRelationshipUseCase = new GetPropertyRelationshipUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const searchPropertyRelationshipUseCase =
      new SearchPropertyRelationshipUseCase(repositoryFactory, broker, logger);
    const createPropertyRelationshipUseCase =
      new CreatePropertyRelationshipUseCase(repositoryFactory, broker, logger);
    const updatePropertyRelationshipUseCase =
      new UpdatePropertyRelationshipUseCase(repositoryFactory, broker, logger);
    const deletePropertyRelationshipUseCase =
      new DeletePropertyRelationshipUseCase(repositoryFactory, broker, logger);
    const getPrivacyTypeUseCase = new GetPrivacyTypeUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const searchPrivacyTypeUseCase = new SearchPrivacyTypeUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const createPrivacyTypeUseCase = new CreatePrivacyTypeUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const updatePrivacyTypeUseCase = new UpdatePrivacyTypeUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const deletePrivacyTypeUseCase = new DeletePrivacyTypeUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const getPropertyDetailUseCase = new GetPropertyDetailUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const searchPropertyDetailUseCase = new SearchPropertyDetailUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const createPropertyDetailUseCase = new CreatePropertyDetailUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const updatePropertyDetailUseCase = new UpdatePropertyDetailUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const deletePropertyDetailUseCase = new DeletePropertyDetailUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const getCondominiumDetailUseCase = new GetCondominiumDetailUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const searchCondominiumDetailUseCase = new SearchCondominiumDetailUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const createCondominiumDetailUseCase = new CreateCondominiumDetailUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const updateCondominiumDetailUseCase = new UpdateCondominiumDetailUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const deleteCondominiumDetailUseCase = new DeleteCondominiumDetailUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const getRuleUseCase = new GetRuleUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const searchRuleUseCase = new SearchRuleUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const createRuleUseCase = new CreateRuleUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const updateRuleUseCase = new UpdateRuleUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const deleteRuleUseCase = new DeleteRuleUseCase(
      repositoryFactory,
      broker,
      logger,
    );

    return new PropertyFacade({
      createProperty: createPropertyUseCase,
      getProperty: getPropertyUseCase,
      searchProperty: searchPropertyUseCase,
      getPropertyType: getPropertyTypeUseCase,
      searchPropertyType: searchPropertyTypeUseCase,
      createPropertyType: createPropertyTypeUseCase,
      updatePropertyType: updatePropertyTypeUseCase,
      deletePropertyType: deletePropertyTypeUseCase,
      getPropertyRelationship: getPropertyRelationshipUseCase,
      searchPropertyRelationship: searchPropertyRelationshipUseCase,
      createPropertyRelationship: createPropertyRelationshipUseCase,
      updatePropertyRelationship: updatePropertyRelationshipUseCase,
      deletePropertyRelationship: deletePropertyRelationshipUseCase,
      getPrivacyType: getPrivacyTypeUseCase,
      searchPrivacyType: searchPrivacyTypeUseCase,
      createPrivacyType: createPrivacyTypeUseCase,
      updatePrivacyType: updatePrivacyTypeUseCase,
      deletePrivacyType: deletePrivacyTypeUseCase,
      getPropertyDetail: getPropertyDetailUseCase,
      searchPropertyDetail: searchPropertyDetailUseCase,
      createPropertyDetail: createPropertyDetailUseCase,
      updatePropertyDetail: updatePropertyDetailUseCase,
      deletePropertyDetail: deletePropertyDetailUseCase,
      getCondominiumDetail: getCondominiumDetailUseCase,
      searchCondominiumDetail: searchCondominiumDetailUseCase,
      createCondominiumDetail: createCondominiumDetailUseCase,
      updateCondominiumDetail: updateCondominiumDetailUseCase,
      deleteCondominiumDetail: deleteCondominiumDetailUseCase,
      getRule: getRuleUseCase,
      searchRule: searchRuleUseCase,
      createRule: createRuleUseCase,
      updateRule: updateRuleUseCase,
      deleteRule: deleteRuleUseCase,
    });
  }
}
