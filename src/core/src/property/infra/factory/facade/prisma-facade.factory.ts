import { PropertyFacade } from '../../../app/facade';
import { Broker } from '#shared/infra';
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
import { WinstonLogger } from '#shared/infra';
import { AwsS3Driver, InMemoryDriver } from '../../driver';

export class PrismaFacadeFactory {
  constructor(readonly req: any) {}
  create() {
    new WinstonLogger({
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
    );
    const getPropertyUseCase = new GetPropertyUseCase(
      repositoryFactory,
      broker,
    );
    const searchPropertyUseCase = new SearchPropertyUseCase(
      repositoryFactory,
      broker,
    );

    const getPropertyTypeUseCase = new GetPropertyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const searchPropertyTypeUseCase = new SearchPropertyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const createPropertyTypeUseCase = new CreatePropertyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const updatePropertyTypeUseCase = new UpdatePropertyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const deletePropertyTypeUseCase = new DeletePropertyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const getPropertyRelationshipUseCase = new GetPropertyRelationshipUseCase(
      repositoryFactory,
      broker,
    );
    const searchPropertyRelationshipUseCase =
      new SearchPropertyRelationshipUseCase(repositoryFactory, broker);
    const createPropertyRelationshipUseCase =
      new CreatePropertyRelationshipUseCase(repositoryFactory, broker);
    const updatePropertyRelationshipUseCase =
      new UpdatePropertyRelationshipUseCase(repositoryFactory, broker);
    const deletePropertyRelationshipUseCase =
      new DeletePropertyRelationshipUseCase(repositoryFactory, broker);
    const getPrivacyTypeUseCase = new GetPrivacyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const searchPrivacyTypeUseCase = new SearchPrivacyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const createPrivacyTypeUseCase = new CreatePrivacyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const updatePrivacyTypeUseCase = new UpdatePrivacyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const deletePrivacyTypeUseCase = new DeletePrivacyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const getPropertyDetailUseCase = new GetPropertyDetailUseCase(
      repositoryFactory,
      broker,
    );
    const searchPropertyDetailUseCase = new SearchPropertyDetailUseCase(
      repositoryFactory,
      broker,
    );
    const createPropertyDetailUseCase = new CreatePropertyDetailUseCase(
      repositoryFactory,
      broker,
    );
    const updatePropertyDetailUseCase = new UpdatePropertyDetailUseCase(
      repositoryFactory,
      broker,
    );
    const deletePropertyDetailUseCase = new DeletePropertyDetailUseCase(
      repositoryFactory,
      broker,
    );
    const getCondominiumDetailUseCase = new GetCondominiumDetailUseCase(
      repositoryFactory,
      broker,
    );
    const searchCondominiumDetailUseCase = new SearchCondominiumDetailUseCase(
      repositoryFactory,
      broker,
    );
    const createCondominiumDetailUseCase = new CreateCondominiumDetailUseCase(
      repositoryFactory,
      broker,
    );
    const updateCondominiumDetailUseCase = new UpdateCondominiumDetailUseCase(
      repositoryFactory,
      broker,
    );
    const deleteCondominiumDetailUseCase = new DeleteCondominiumDetailUseCase(
      repositoryFactory,
      broker,
    );
    const getRuleUseCase = new GetRuleUseCase(repositoryFactory, broker);
    const searchRuleUseCase = new SearchRuleUseCase(repositoryFactory, broker);
    const createRuleUseCase = new CreateRuleUseCase(repositoryFactory, broker);
    const updateRuleUseCase = new UpdateRuleUseCase(repositoryFactory, broker);
    const deleteRuleUseCase = new DeleteRuleUseCase(repositoryFactory, broker);

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
